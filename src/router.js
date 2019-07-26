import express from 'express';
import bodyParser from 'body-parser';
import { getReportsConfig, getReport, getJsreport, SteedosReport } from './index';
import { getObject } from './utils';
import path from 'path';
import { getSession } from '@steedos/auth';
import Cookies from 'cookies';

const router = express.Router();
const rootUrl = "/plugins/jsreport";

router.use(bodyParser.json());

async function auth(request, response) {
  let cookies = new Cookies(request, response);
  let authToken = request.headers['x-auth-token'] || cookies.get("X-Auth-Token");
  if(!authToken && request.headers.authorization && request.headers.authorization.split(' ')[0] == 'Bearer') {
    authToken = request.headers.authorization.split(' ')[1]
  }
  let spaceId = (request.params ? request.params.spaceId : null) || request.headers['x-space-id'];
  let user = await getSession(authToken, spaceId);
  return user;
}

router.use([`${rootUrl}/web`, `${rootUrl}/api`], function(req, res, next) {
  auth(req, res).then(function (result) {
    if (result) {
      req.user = result;
      next();
    } else {
      res.status(401).send({ status: 'error', message: 'You must be logged in to do this.' });
    }
  });
});

// 报表查看列表界面
router.get(`${rootUrl}/web`, async (req, res) => {
  let reports = getReportsConfig();
  let jsreport = await getJsreport()
  let resp = await jsreport.render({
    template: {
      content: `
        {{#each reports}}
          <div className="report-list-item">
            <a href='{{../rootUrl}}/web/viewer/{{_id}}'>{{name}}</a>
          </div>
        {{/each}}
      `,
      engine: 'handlebars',
      recipe: 'text'
    },
    data: {
      reports: reports,
      rootUrl: rootUrl
    }
  });
  res.send(resp.content.toString());
  res.end();
});

// 查看yml配置中的报表详细
router.get(`${rootUrl}/web/viewer/:report_id`, async (req, res) => {
  let user_filters = req.query.user_filters;
  if (user_filters) {
    user_filters = JSON.parse(decodeURI(user_filters));
  }
  let report_id = req.params.report_id;
  let report = getReport(report_id);
  if (!report){
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let resp = await report.render({ user_filters });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(resp.content);
  res.end();
});

// 查看db中的报表详细
router.get(`${rootUrl}/web/viewer_db/:report_id`, async (req, res) => {
  let user_filters = req.query.user_filters;
  if (user_filters) {
    user_filters = JSON.parse(decodeURI(user_filters));
  }
  let report_id = req.params.report_id;
  let reportObject = getObject("reports");
  let reportConfig = await reportObject.findOne(report_id);
  if (!reportConfig) {
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let report = new SteedosReport(reportConfig)
  let resp = await report.render({ user_filters });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(resp.content);
  res.end();
});

// 导出yml配置中的报表为PDF
router.get(`${rootUrl}/api/report/:report_id/pdf`, async (req, res) => {
  let user_filters = req.query.user_filters;
  if (user_filters) {
    user_filters = JSON.parse(decodeURI(user_filters));
  }
  let report_id = req.params.report_id;
  let report = getReport(report_id);
  if (!report) {
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let resp = await report.render({ recipe: 'chrome-pdf', user_filters });
  res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
  res.send(resp.content);
  res.end();
});

// 导出db中的报表为PDF
router.get(`${rootUrl}/api/report_db/:report_id/pdf`, async (req, res) => {
  let user_filters = req.query.user_filters;
  if (user_filters) {
    user_filters = JSON.parse(decodeURI(user_filters));
  }
  let report_id = req.params.report_id;
  let reportObject = getObject("reports");
  let reportConfig = await reportObject.findOne(report_id);
  if (!reportConfig) {
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let report = new SteedosReport(reportConfig)
  let resp = await report.render({ recipe: 'chrome-pdf', user_filters });
  res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
  res.send(resp.content);
  res.end();
});

// 导出yml配置中的报表为Excel
router.get(`${rootUrl}/api/report/:report_id/excel`, async (req, res) => {
  let user_filters = req.query.user_filters;
  if (user_filters) {
    user_filters = JSON.parse(decodeURI(user_filters));
  }
  let report_id = req.params.report_id;
  let report = getReport(report_id);
  if (!report) {
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let resp = await report.render({ recipe: 'html-to-xlsx', user_filters });
  res.setHeader('Content-Type', 'application/vnd.ms-excel; charset=utf-8');
  res.send(resp.content);
  res.end();
});

// 导出db中的报表为Excel
router.get(`${rootUrl}/api/report_db/:report_id/excel`, async (req, res) => {
  let user_filters = req.query.user_filters;
  if (user_filters) {
    user_filters = JSON.parse(decodeURI(user_filters));
  }
  let report_id = req.params.report_id;
  let reportObject = getObject("reports");
  let reportConfig = await reportObject.findOne(report_id);
  if (!reportConfig) {
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let report = new SteedosReport(reportConfig)
  let resp = await report.render({ recipe: 'html-to-xlsx', user_filters });
  res.setHeader('Content-Type', 'application/vnd.ms-excel; charset=utf-8');
  res.send(resp.content);
  res.end();
});

router.use(rootUrl, express.static(path.resolve(__dirname, "static")));

export default router;
