import { Transform } from 'jscodeshift';

const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift;
  const { path: filePath, source } = file;
  const root = j(source);
  root
    .find(j.Identifier, { name: 'e' })
    .filter((path) => {
      const catchPath = j(path).closest(j.CatchClause).paths()[0];
      if (!catchPath) {
        return false;
      }
      const catchNode = catchPath.value;
      return j.Identifier.check(catchNode.param) && catchNode.param.name === 'e';
    })
    .replaceWith(j.identifier('err'));
  root
    .find(j.Identifier, { name: 'e' })
    .replaceWith(j.identifier('evt'));
  return root.toSource();
}

export default transform;
