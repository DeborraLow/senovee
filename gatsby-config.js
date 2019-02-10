module.exports = {
  siteMetadata: {
    title: `senovee`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `text`,
        path: `${__dirname}/text`,
      },
    },
  ],
};
