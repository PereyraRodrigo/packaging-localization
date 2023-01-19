const awsServerlessExpress = require('aws-serverless-express');
const server = require('./dist/waypoint/server/main');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

var s = server.app();
s.use(awsServerlessExpressMiddleware.eventContext());

const binary_mime_types = [
    'image/*',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/x-icon',
    'font/woff',
    'font/woff2'
  ];

const serverProxy = awsServerlessExpress.createServer(s, null, binary_mime_types);
module.exports.ssrserverless = (event, context) => awsServerlessExpress.proxy(serverProxy, event, context);