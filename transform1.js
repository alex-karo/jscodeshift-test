"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = 'tsx';
function transformer(file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);
    const lodashFunctions = [];
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
        j(path).replaceWith(lodashFunctions.map(name => j.importDeclaration([j.importDefaultSpecifier(j.identifier(name))], j.literal(`lodash/${name}`))));
    });
    return root.toSource();
}
exports.default = transformer;
//# sourceMappingURL=transform1.js.map