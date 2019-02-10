const path = require(`path`);
const fs = require('fs');

const onCreateNodeHandlers = [
  {
    name: '',
    description: '',
    targetType: [],
    handler: ({ node, actions }) => {
      actions.createNodeField({
        node,
        name: '',
        value: '',
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
      allFile {
        edges {
          node {
            ext
            relativePath
            absolutePath
          }
        }
      }
    }
  `).then(({ data }) => {
    data.allFile.edges.forEach(({ node }) => {
      createPage({
        path: `/view/${node.relativePath
          .replace(/\//g, '_')
          .slice(0, -node.ext.length)}`,
        component: path.resolve(`./src/pages/view.js`),
        context: {
          raw: fs.readFileSync(node.absolutePath, 'utf-8'),
        },
      });
    });
  });
};
