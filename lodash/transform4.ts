import { API, ASTPath, CallExpression, File, FileInfo, ImportDeclaration, JSCodeshift } from 'jscodeshift/src/core';
import { Collection } from 'jscodeshift/src/Collection';
import { lodashNotChainableMethods } from './lodashNotChainableMethods';

export const parser = 'tsx';

function removeDuplicateImports(root: Collection<File>, j: JSCodeshift) {
  const importsSet = new Set();
  root
    .find(j.ImportDeclaration)
    .filter(path => path.value?.source?.value.toString().includes('lodash'))
    .forEach(path => {
      if (importsSet.has(path.value.source.value)) {
        j(path).remove();
      } else {
        importsSet.add(path.value.source.value);
      }
    });
}

function addMixinMethodsForChaining(root: Collection<File>, j: JSCodeshift, methodNames: Set<string>) {
  if (methodNames.size === 0) {
    return;
  }

  const prototypeMethods = new Set(['commit', 'next', 'plant', 'value']);
  const notChainableMethods = new Set(lodashNotChainableMethods);

  const mixinCall = j.callExpression(j.identifier('mixin'), [
    j.identifier('_'),
    j.objectExpression([...methodNames]
      .filter(name => !prototypeMethods.has(name) && !notChainableMethods.has(name))
      .map(name => j.property('init', j.identifier(name), j.identifier(name))),
    )
  ]);
  const mixinNotChainableCall = notChainableMethods ? j.callExpression(j.identifier('mixin'), [
    j.identifier('_'),
    j.objectExpression(
      [...methodNames]
        .filter(name => !prototypeMethods.has(name) && notChainableMethods.has(name))
        .map(name => j.property('init', j.identifier(name), j.identifier(name))),
    ),
    j.objectExpression([j.property('init', j.identifier('chain'), j.booleanLiteral(false))]),
  ]) : j.emptyStatement();
  const prototypesSetCall = [...methodNames]
    .filter(name => prototypeMethods.has(name))
    .map(name => j.expressionStatement(
      j.assignmentExpression(
        '=',
        j.memberExpression(j.memberExpression(j.identifier('_'), j.identifier('prototype')), j.identifier(name)),
        j.identifier(name),
      )));
  root.find(j.ImportDeclaration)
    .at(-1)
    .insertAfter(j([mixinCall, mixinNotChainableCall, ...prototypesSetCall]).toSource());
}

function getChainingFunctions(root: Collection<File>, j: JSCodeshift): Set<string> {
  const lodashChainingFunctions = new Set<string>();
  const chainingCalls = root.find(j.CallExpression, { callee: { name: '_' } });

  function findAllChainingCalls(path: ASTPath<CallExpression>, acc: string[] = []) {
    if (j.MemberExpression.check(path.parentPath.value) && j.CallExpression.check(path.parentPath?.parentPath.value)) {
      return findAllChainingCalls(path.parentPath.parentPath, [...acc, path.parentPath.value.property.name]);
    } else {
      return acc;
    }
  }

  chainingCalls.forEach((path) => {
    const functions = findAllChainingCalls(path);
    functions.forEach(name => lodashChainingFunctions.add(name));
  });
  return lodashChainingFunctions;
}


function replaceImports(root: Collection<File>, j: JSCodeshift, methodNames: string[], addMixinImport = false) {

  const methods = methodNames.slice();

  function lodashFunctionToFlatImports(functions: string[]): ImportDeclaration[] {
    return functions.map(name => j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier(name))],
      j.literal(`lodash/${name}`),
    ));
  }

  root
    .find(j.ImportDeclaration, {
      source: {
        value: 'lodash'
      }
    })
    .forEach(path => {
      path.value.specifiers.forEach(specifier => {
        if (j.ImportSpecifier.check(specifier)) {
          methods.push(specifier.imported.name);
          if (specifier.imported.name !== specifier.local.name) {
            root
              .find(j.Identifier, {
                name: specifier.local.name,
              })
              .replaceWith(j.identifier(specifier.imported.name))
          }
        }
      });
      const lodashImports = lodashFunctionToFlatImports(methods);
      if (addMixinImport) {
        lodashImports.push(j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier('_'))],
          j.literal(`lodash/wrapperLodash`),
        ));
        lodashImports.push(j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier('mixin'))],
          j.literal(`lodash/mixin`),
        ));
      }
      j(path).replaceWith(lodashImports);
    });
}

export default function transformer(file: FileInfo, api: API): string | null {
  const j = api.jscodeshift;
  const root = j(file.source);

  const lodashFunctions = new Set<string>();
  root.find(j.MemberExpression, {
    object: {
      name: '_'
    },
  }).forEach((path) => {
    if (j.Identifier.check(path.value.property)) {
      lodashFunctions.add(path.value.property.name);
      j(path).replaceWith(j.identifier(path.value.property.name));
    }
  });

  const lodashChainingFunctions = getChainingFunctions(root, j);
  replaceImports(root, j, [...lodashFunctions, ...lodashChainingFunctions], lodashChainingFunctions.size > 0);
  removeDuplicateImports(root, j);
  addMixinMethodsForChaining(root, j, lodashChainingFunctions);

  return root.toSource();
}
