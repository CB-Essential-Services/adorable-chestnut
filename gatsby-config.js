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
        projectId: process.env.SANITY_PROJECT_ID,
				dataset: process.env.SANITY_DATASET,
				...(process.env.SANITY_READ_TOKEN && { token: process.env.SANITY_READ_TOKEN }),
				...(process.env.SANITY_WATCH_MODE && process.env.SANITY_READ_TOKEN && { watchMode: process.env.SANITY_WATCH_MODE }),
				...(process.env.SANITY_OVERLAY_DRAFTS && process.env.SANITY_READ_TOKEN && { overlayDrafts: process.env.SANITY_OVERLAY_DRAFTS }),
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