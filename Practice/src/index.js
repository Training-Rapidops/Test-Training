const config = require('./config');
const logger = require('utilities').Logger;
global.logger = logger(config['loggingOptions']);
const RestService = require('./rest-service').RestService;
const rapidHttpServer = require('http-server').makeHttpServer(RestService, global.logger, null);
rapidHttpServer.initWorker();
