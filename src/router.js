import express from 'express';
import bodyParser from 'body-parser';
import { getReportsConfig, getReport, getJsreport, SteedosReport } from './index';
import { getObject } from './utils';

const routes = express();
const rootUrl = "/plugins/jsreport";

routes.use(bodyParser.json());

// 报表查看列表界面
routes.get(`${rootUrl}/web`, async (req, res) => {
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

// 报表查看详细界面
routes.get(`${rootUrl}/web/viewer/:report_id`, async (req, res) => {
  let report_id = req.params.report_id;
  let report = getReport(report_id);
  if (!report){
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let resp = await report.render();
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(resp.content);
  res.end();
});

// 报表查看详细界面
routes.get(`${rootUrl}/web/viewer_db/:report_id`, async (req, res) => {
  let report_id = req.params.report_id;
  let reportObject = getObject("reports");
  let reportConfig = await reportObject.findOne(report_id);
  if (!reportConfig) {
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let report = new SteedosReport(reportConfig)
  let resp = await report.render();
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(resp.content);
  res.end();
});

// 报表PDF详细界面
routes.get(`${rootUrl}/web/pdf/:report_id`, async (req, res) => {
  let report_id = req.params.report_id;
  let report = getReport(report_id);
  if (!report) {
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let htmlContent = report.getHtmlContent();
  let scriptContent = report.getScriptContent();
  let helperContent = report.getHelperContent();
  let data = await report.getData();
  let jsreport = await getJsreport();
  let resp = await jsreport.render({
    template: {
      content: htmlContent,
      scripts: [{
        content: scriptContent
      }],
      helpers: helperContent,
      engine: 'handlebars',
      recipe: 'chrome-pdf'
    },
    data: data
  });
  res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
  res.send(resp.content);
  res.end();
});

// 报表excel详细界面
routes.get(`${rootUrl}/web/excel/:report_id`, async (req, res) => {
  let report_id = req.params.report_id;
  let report = getReport(report_id);
  if (!report) {
    res.status(404).send(`<b style="color:red">未找到报表:${report_id}</b>`);
    res.end();
    return;
  }
  let resp = await report.render('html-to-xlsx');
  res.setHeader('Content-Type', 'application/vnd.ms-excel; charset=utf-8');
  res.send(resp.content);
  res.end();
});

export default routes;
