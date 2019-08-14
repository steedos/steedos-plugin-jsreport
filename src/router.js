import express from 'express';
import bodyParser from 'body-parser';
import { getReportsConfig, getReport, getJsreport, SteedosReport } from './index';
import { getObject } from './utils';
import path from 'path';
import { setRequestUser } from '@steedos/auth';

const router = express.Router();
const rootUrl = "/plugins/jsreport";

router.use(bodyParser.json());

router.use([`${rootUrl}/web`, `${rootUrl}/api`], setRequestUser);

router.use([`${rootUrl}/web`, `${rootUrl}/api`], function (req, res, next) {
  if (req.user) {
    if (!req.user.spaceId) {
      res.status(401).send({ status: 'error', message: 'You must pass the params space_id.' });
      return;
    }
    next();
  } else {
    res.status(401).send({ status: 'error', message: 'You must be logged in to do this.' });
  }
});

// 报表查看列表界面
router.get(`${rootUrl}/web`, async (req, res) => {
  let reports = getReportsConfig();
  let jsreport = await getJsreport();
  let resp = await jsreport.render({
    template: {
      content: `
        {{#each reports}}
          <div className="report-list-item">
            <a href= '{{../rootUrl}}/web/viewer/{{_id}}?space_id={{../spaceId}}'>{{name}}</a>
          </div>
        {{/each}}
      `,
      engine: 'handlebars',
      recipe: 'text'
    },
    data: {
      reports: reports,
      rootUrl: rootUrl,
      spaceId: req.user.spaceId
    }
  });
  res.send(resp.content.toString());
  res.end();
});

// 查看yml配置中的报表详细
router.get(`${rootUrl}/web/viewer/:report_id`, async (req, res) => {
  let user_filters = req.query.user_filters;
  if (user_filters) {
    user_filters = eval(decodeURI(user_filters));
  }
  let report_id = req.params.report_id;
  let report = getReport(report_id);
  if (!report) {
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let resp = await report.render({ user_filters, user_session: req.user });
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
  let resp = await report.render({ user_filters, user_session: req.user });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(resp.content);
  res.end();
});

// 导出yml配置中的报表为PDF
router.get(`${rootUrl}/api/report/:report_id/pdf`, async (req, res) => {
  let user_filters = req.query.user_filters;
  if (user_filters) {
    user_filters = eval(decodeURI(user_filters));
  }
  let report_id = req.params.report_id;
  let report = getReport(report_id);
  if (!report) {
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let resp = await report.render({ recipe: 'chrome-pdf', user_filters, user_session: req.user });
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
  let resp = await report.render({ recipe: 'chrome-pdf', user_filters, user_session: req.user });
  res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
  res.send(resp.content);
  res.end();
});

// 导出yml配置中的报表为Excel
router.get(`${rootUrl}/api/report/:report_id/excel`, async (req, res) => {
  let user_filters = req.query.user_filters;
  if (user_filters) {
    user_filters = eval(decodeURI(user_filters));
  }
  let report_id = req.params.report_id;
  let report = getReport(report_id);
  if (!report) {
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let resp = await report.render({ recipe: 'html-to-xlsx', user_filters, user_session: req.user });
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
  let resp = await report.render({ recipe: 'html-to-xlsx', user_filters, user_session: req.user });
  res.setHeader('Content-Type', 'application/vnd.ms-excel; charset=utf-8');
  res.send(resp.content);
  res.end();
});

router.use(rootUrl, express.static(path.resolve(__dirname, "static")));

export default router;
