module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description:
                'Enforce multiline arguments for useMemo/useCallback',
        },
        fixable: 'whitespace',
        schema: [],
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        const INDENT = '  ';

        const HOOKS = new Set(['useMemo', 'useCallback']);

        function isSingleLine(node) {
            const first = node.arguments[0];
            const last = node.arguments[node.arguments.length - 1];
            return (
                first.loc.start.line === last.loc.end.line
            );
        }

        return {
            CallExpression(node) {
                if (
                    node.callee.type !== 'Identifier' ||
                    !HOOKS.has(node.callee.name)
                ) {
                    return;
                }

                if (node.arguments.length < 2) return;
                if (!isSingleLine(node)) return;

                context.report({
                    node,
                    message:
                        '{{hook}} arguments must be multiline',
                    data: {
                        hook: node.callee.name,
                    },

                    fix(fixer) {
                        const openParen = sourceCode.getTokenAfter(
                            node.callee,
                            token => token.value === '('
                        );
                        const closeParen =
                            sourceCode.getLastToken(node);

                        const args = node.arguments.map(arg =>
                            sourceCode.getText(arg)
                        );

                        const multiline =
                            '\n' +
                            args
                                .map(arg => INDENT + arg)
                                .join(',\n') +
                            '\n';

                        return fixer.replaceTextRange(
                            [openParen.range[1], closeParen.range[0]],
                            multiline
                        );
                    },
                });
            },
        };
    },
};
