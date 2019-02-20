const path = require(`path`);
const fs = require('fs');

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
            relativeDirectory
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
    const createdDirs = {};

    data.allFile.edges.forEach(({ node }) => {
      const dirs = node.relativeDirectory.split('/');
      dirs.forEach((dir, i) => {
        const sectionDir = dirs.slice(0, i + 1).join('/');
        if (!createdDirs[sectionDir]) {
          createdDirs[sectionDir] = true;

          createPage({
            path: `/view/${sectionDir}`,
            component: path.resolve(`./src/template/view.js`),
            context: {
              regex: `/^${sectionDir}.*$/`,
            },
          });
        }
      });
      createPage({
        path: `/view/${node.fields.slug}`,
        component: path.resolve(`./src/template/view.js`),
        context: {
          regex: `/^${node.fields.slug}.*$/`,
        },
      });
    });
  });
};
