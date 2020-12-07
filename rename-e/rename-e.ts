import { Transform, CatchClause } from 'jscodeshift';
import { ASTPath } from 'jscodeshift/src/core';

function getCatchClause(path: ASTPath): CatchClause | null {
  if (CatchClause.check(path.node)) {
    return path.value as CatchClause;
  }
  if (path.parentPath === null) {
    return null;
  }
  return getCatchClause(path.parentPath);
}

const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift;
  const { path: filePath, source } = file;
  const root = j(source);
  root
    .find(j.Identifier, { name: 'e' })
    .filter((path) => {
      const catchNode = getCatchClause(path);
      if (!catchNode) {
        return false;
      }
      return j.Identifier.check(catchNode.param) && catchNode.param.name === 'e';
    })
    .replaceWith(j.identifier('err'));
  root
    .find(j.Identifier, { name: 'e' })
    .replaceWith(j.identifier('evt'));
  return root.toSource();
}

export default transform;
