import path from 'path';
import express from 'express';
import _ from 'underscore';
import plugin from './lib/index';
// import objectql from '@steedos/objectql';
const objectql = require("@steedos/objectql");

let objectsDir = path.resolve('./objects')
objectql.getSteedosSchema().addDataSource('default', {
    driver: 'mongo',
    url: 'mongodb://192.168.0.21/fssh20190329',
    objectFiles: [objectsDir]
});

let app = express();

app.use(function (req, res, next) {
    //TODO 处理userId
    next();
});

const port = 5000;
process.env.PORT = port;
process.env.ROOT_URL = "http://127.0.0.1:5000";

plugin.init({ app: app });

app.listen(process.env.PORT || 3000, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> Listening on port %s. Open up http://127.0.0.1:%s/plugins/jsreport/web in your browser.', port, port)
    }
});




