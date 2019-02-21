module.exports = {
  siteMetadata: {
    title: `senovee`,
  },
  plugins: [
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `text`,
        path: `${__dirname}/text`,
      },
    },
  ],
};
