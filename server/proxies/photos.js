/* eslint-env node */
'use strict';

// eslint-disable-next-line node/no-extraneous-require
const httpProxy = require('http-proxy');

const proxyPath = '/photos';

module.exports = function (app) {
    // For options, see:
    // https://github.com/nodejitsu/node-http-proxy
    const proxy = httpProxy.createProxyServer({});
    let proxyPort = 3042;

    const customProxyPortIdx = process.argv.indexOf('--proxyPort');
    if (customProxyPortIdx > -1) {
        proxyPort = process.argv[customProxyPortIdx+1];
    }

    proxy.on('error', function (err, req) {
        console.error(err, req.url);
    });

    app.use(proxyPath, function (req, res/*, next*/) {
        proxy.web(req, res, { target: 'http://localhost:' + proxyPort });
    });
};
