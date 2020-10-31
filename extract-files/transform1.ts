import { Transform } from 'jscodeshift';

export const parser = 'tsx';

function changePath(currentPath: string, importedPath: string): string {

}

const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift;

  const { path: filePath, source } = file;
  const root = j(source);

  const lodashFunctions: string[] = [];

  debugger;

  root.find(j.MemberExpression, {
    object: {
      name: '_'
    },
  }).forEach((path) => {
    if (j.Identifier.check(path.value.property)) {
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
      const specifiers = lodashFunctions.map(name => j.importSpecifier(j.identifier(name)));
      j(path).replaceWith(
        j.importDeclaration(specifiers, j.literal(`lodash`)),
      );
    });
  return root.toSource();
}


export default transform;
