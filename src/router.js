import express from 'express';
import { getHtmlContent, saveReportToHtmlFile } from './html';
import bodyParser from 'body-parser';
import { getReportsConfig, getReport, getJsreport } from './index';

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
  let data = await report.getData();
  res.send(data);
});

// 获取报表列表
routes.get(`${apiUrl}/reports`, async (req, res) => {
  let reports = getReportsConfig();
  res.send(reports);
});

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
  let htmlContent = report.getHtmlContent();
  let data = await report.getData();
  let jsreport = await getJsreport()
  let resp = await jsreport.render({
    template: {
      content: htmlContent,
      engine: 'handlebars',
      recipe: 'text'
    },
    data: {
      report: report.toConfig(),
      data: data
    }
  });
  res.send(resp.content.toString());
  res.end();
});

// routes.use(rootUrl, requestHandler);

// routes.use(rootUrl, express.static(path.resolve(__dirname, "../build")));

export default routes;
