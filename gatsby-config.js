require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const {createProxyMiddleware} = require('http-proxy-middleware'); //v1.x.x

module.exports = {
  pathPrefix: '/',
  siteMetadata: require('./site-metadata.json'),
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    );
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-source-data`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-stackbit-static-sass`,
      options: {
        inputFile: `${__dirname}/src/sass/main.scss`,
        outputFile: `${__dirname}/public/assets/css/main.css`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-component`],
      },
    },
    {
      resolve: `gatsby-remark-page-creator`,
      options: {},
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '14ro5hmo',
        dataset: 'production',
        token: process.env.SANITY_READ_TOKEN,
        watchMode: true,
        overlayDrafts: true,
    },
  },
    {
      resolve: `@stackbit/gatsby-plugin-menus`,
      options: {
        sourceUrlPath: `fields.url`,
        pageContextProperty: `menus`,
        menus: require('./src/data/menus.json'),
      },
    },
  ],
};