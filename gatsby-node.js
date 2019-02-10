const path = require(`path`);
const fs = require('fs');

const onCreateNodeHandlers = [
  {
    name: 'addFileSlug',
    targetType: ['File'],
    handler: ({ node, actions }) => {
      actions.createNodeField({
        node,
        name: 'slug',
        value: node.relativePath.replace(/\//g, '_').slice(0, -node.ext.length),
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
            fields {
              slug
            }
            absolutePath
          }
        }
      }
    }
  `).then(({ data }) => {
    data.allFile.edges.forEach(({ node }) => {
      createPage({
        path: `/view/${node.fields.slug}`,
        component: path.resolve(`./src/pages/view.js`),
        context: {
          raw: fs.readFileSync(node.absolutePath, 'utf-8'),
        },
      });
    });
  });
};
