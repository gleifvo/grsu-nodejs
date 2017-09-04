const serve = require('serve');
var config = require('./config');

const server = serve('./src/client', {
    port: config.get('port'),
    ignore: ['node_modules']
});