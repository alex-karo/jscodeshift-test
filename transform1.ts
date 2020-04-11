import { API, FileInfo } from 'jscodeshift/src/core';

export const parser = 'tsx';

export default function transformer(file: FileInfo, api: API): string | null {
  const j = api.jscodeshift;


  const root = j(file.source);

  const lodashFunctions: string[] = [];

  root.find(j.MemberExpression, {
    object: {
      name: '_'
    },
  }).forEach((path) => {
    if (j.Identifier.assert(path.value.property)) {
      lodashFunctions.push(path.value.property.name);
      j(path).replaceWith(j.identifier(path.value.property.name));
    }
  });


  root
    .find(j.ImportDeclaration, {
      source: {
        value: 'lodash'
      }
    })
    .forEach(path => {
      j(path).replaceWith(
        lodashFunctions.map(name => j.importDeclaration([j.importDefaultSpecifier(j.identifier(name))], j.literal(`lodash/${name}`)))
      );
    });
  return root.toSource();
}
