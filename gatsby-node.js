const path = require(`path`);
const fs = require('fs');
const senoveeAst = require('senovee-ast');

const onCreateNodeHandlers = [
  {
    name: 'addNovelSlug',
    targetType: ['File'],
    handler: ({ node, actions }) => {
      actions.createNodeField({
        node,
        name: 'slug',
        value: node.relativePath.slice(0, -node.ext.length),
      });
    },
  },
  {
    name: 'addNovelBody',
    targetType: ['File'],
    handler: ({ node, actions }) => {
      actions.createNodeField({
        node,
        name: 'body',
        value: fs.readFileSync(node.absolutePath, 'utf-8'),
      });
    },
  },
  {
    name: 'addNovelTitle',
    targetType: ['File'],
    handler: ({ node, actions }) => {
      actions.createNodeField({
        node,
        name: 'title',
        value: node.name.slice(node.name.indexOf('_') + 1),
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
              body
              title
            }
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
          src: node.fields.body,
        },
      });
    });
  });
};
