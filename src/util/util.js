export const flat = (array) => array.reduce((acc, v) => acc.concat(v), []);
export const flatMap = (array, f) =>
  array.reduce((acc, v) => [...acc, ...f(v)], []);

export const MAX_DIR_LEVEL = 2;

export const makeTree = (nodes) => {
  const root = {
    isDir: true,
    level: 0,
    name: '',
    relativePath: '',
    relativeDirectory: '',
    fields: {
      slug: '',
      title: '',
    },
    children: {},
  };

  nodes.forEach(({ node }) => {
    const dirs = node.relativeDirectory.split('/');
    let current = root.children;

    if (node.relativeDirectory !== '') {
      dirs.forEach((dir, i) => {
        if (!current[dir]) {
          current[dir] = {
            isDir: true,
            level: i + 1,
            name: dir,
            relativePath: node.relativeDirectory,
            relativeDirectory: dirs.slice(0, i).join('/'),
            fields: {
              slug: dirs.slice(0, i + 1).join('/'),
              title: dir.slice(dir.indexOf('_') + 1),
            },
            children: {},
          };
        }
        current = current[dir].children;
      });
    }
    current[node.name] = {
      isDir: false,
      level: (node.relativeDirectory ? dirs.length : 0) + 1,
      ...node,
    };
  });

  return root;
};
