const path = require(`path`);

const onCreateNodeHandlers = [
  {
    name: '',
    description: '',
    targetType: [],
    handler: ({ node, actions }) => {

      actions.createNodeField({
        node,
        name: '',
        value,
      });
    },
  },
];

exports.onCreateNode = (context) => {
  onCreateNodeHandlers.forEach(({ targetType, handler }) => {
    if (targetType.includes(context.node.internal.type)) {
      handler(context);
    }
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
    }
  `).then((result) => {

  });
};
