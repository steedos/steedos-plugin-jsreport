// import jsreportCore from 'jsreport-core';
// const jsreport = jsreportCore();

// jsreport.init().then(() => {
//     return jsreport.render({
//         template: {
//             content: '<h1>Hello {{foo}}</h1>',
//             engine: 'handlebars',
//             recipe: 'text'
//         },
//         data: {
//             foo: "world"
//         }
//     }).then((resp) => {
//         // prints pdf with headline Hello world
//         console.log(resp.content.toString())
//     });
// }).catch((e) => {
//     console.error(e)
// })

import path from 'path';
import express from 'express';
import _ from 'underscore';
import { initPlugin } from './lib/index';
// import objectql from '@steedos/objectql';
const objectql = require("@steedos/objectql");

let objectsDir = path.resolve('./objects')
objectql.getSteedosSchema().addDataSource('default', {
    driver: 'mongo',
    // url: 'mongodb://192.168.0.77/qhd-beta',
    url: 'mongodb://192.168.0.21/fssh20190329',
    objectFiles: [objectsDir]
});

let app = express();

app.use(function (req, res, next) {
    //TODO 处理userId
    next();
});

const port = 3600;
process.env.PORT = port;
process.env.ROOT_URL = "http://localhost:3600";

initPlugin(app);

app.listen(process.env.PORT || 3000, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> Listening on port %s. Open up http://localhost:%s/plugins/jsreport/web in your browser.', port, port)
    }
});




