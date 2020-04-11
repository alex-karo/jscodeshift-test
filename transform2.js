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
        path.value.specifiers.forEach(specifier => {
            if (j.ImportSpecifier.check(specifier)) {
                lodashFunctions.push(specifier.imported.name);
            }
        });
        j(path).replaceWith(lodashFunctions.map(name => j.importDeclaration([j.importDefaultSpecifier(j.identifier(name))], j.literal(`lodash/${name}`))));
    });
    const importsSet = new Set();
    root
        .find(j.ImportDeclaration)
        .filter(path => path.value?.source?.value.toString().includes('lodash'))
        .forEach(path => {
        if (importsSet.has(path.value.source.value)) {
            j(path).remove();
        }
        else {
            importsSet.add(path.value.source.value);
        }
    });
    return root.toSource();
}
exports.default = transformer;
//# sourceMappingURL=transform2.js.map