import path from 'path';
import express from 'express';
import reporter from './reporter';
import { getHtmlContent, saveReportToHtmlFile } from './html';
import bodyParser from 'body-parser';
import { getReportsConfig, getReport } from './index';
import jsreportCore from 'jsreport-core';

const jsreport = jsreportCore();
const routes = express();
const rootUrl = "/plugins/jsreport";
const apiUrl = `${rootUrl}/api`;

routes.use(bodyParser.json());

// 获取报表模板
routes.get(`${apiUrl}/html/:report_id`, async (req, res) => {
  let report_id = req.params.report_id;
  let report = getReport(report_id);
  let htmlContent = getHtmlContent(report);
  res.send(htmlContent);
});

// 报表html模板保存
routes.post(`${apiUrl}/html/:report_id`, async (req, res) => {
  let report_id = req.params.report_id;
  let report = getReport(report_id).toConfig();
  saveReportToHtmlFile(report.html_file, req.body);
  res.send({});
});

// 获取报表数据
routes.get(`${apiUrl}/data/:report_id`, async (req, res) => {
  let report_id = req.params.report_id;
  let report = getReport(report_id);
  let data = await reporter.getData(report);
  res.send(data);
});

// 获取报表列表
routes.get(`${apiUrl}/reports`, async (req, res) => {
  let reports = getReportsConfig();
  res.send(reports);
});

// 报表查看WEB界面重定向到相关静态html界面
routes.get(`${rootUrl}/web/viewer/:report_id`, async (req, res) => {
  // let report_id = req.params.report_id;
  // res.redirect(301, `${rootUrl}/assets/viewer.html?reportUrl=${rootUrl}/api/mrt/${report_id}`);
  await jsreport.init().catch((e) => {
    console.error(e)
  });

  let resp = jsreport.render({
    template: {
      content: '<h1>Hello {{foo}}</h1>',
      engine: 'handlebars',
      recipe: 'text'
    },
    data: {
      foo: "world"
    }
  });
  console.log(resp.content.toString());
  res.send(resp.content.toString());
  res.end();
});

// routes.use(rootUrl, requestHandler);

// routes.use(rootUrl, express.static(path.resolve(__dirname, "../build")));

export default routes;
