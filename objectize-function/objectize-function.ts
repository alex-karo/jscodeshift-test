import { Transform } from 'jscodeshift';
import j from 'jscodeshift/src/core';

const transform: Transform = (file, api, options) => {
  const funcArgs = options.args.split(',');
  const { path: filePath, source } = file;
  const root = j(source);
  root
    .find(j.CallExpression, { callee: {name: 'format'} })
    .forEach((path) => {
      const args = path.value.arguments;
      const objectArgProperties = funcArgs
        .map((argName, i) =>
          j.objectProperty(
            j.identifier(argName),
            args[i] as any || j.nullLiteral(),
          ));
      j(path).replaceWith(j.callExpression(path.value.callee, [j.objectExpression(objectArgProperties)]))
    });
  return root.toSource();
}

export default transform;
