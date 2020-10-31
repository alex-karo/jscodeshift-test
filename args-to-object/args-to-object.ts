import { Transform } from 'jscodeshift';

// Эта функция будет применена на каждом из файлоы
const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift;
  const { path: filePath, source } = file; // строки пути и исходников
  const root = j(source); // Collection
  root
    .find(j.Identifier, { name: 'data' }) // Type
    .forEach(path => console.log(path)) // Path's
    .replaceWith(j.identifier('nato')); // Builder
  return root.toSource(); // В строку
}

export const parser = 'tsx';
export default transform;
