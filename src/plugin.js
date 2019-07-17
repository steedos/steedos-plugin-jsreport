import _ from 'underscore';
import path from 'path';
import { loadReports } from './utils';
import { SteedosReport } from './report';
import appRoot from 'app-root-path';
import { initHtmls } from './html';
import { initScripts } from './script';
import { initHelpers } from './helper';
import { default as routes } from './router';
import jsreportCore from 'jsreport-core';


export default class SteedosPlugin { 
    _reports = {}
    _jsreport = null;

    constructor(config) {
        if (config && config.reportFiles){
            this.useReportFiles(config.reportFiles);
        }
    }

    init(app) {
        let reportsDir = appRoot.resolve('/src');
        this.useReportFiles([reportsDir]);
        initHtmls(this.getReports());
        initScripts(this.getReports());
        initHelpers(this.getReports());

        app.use(routes);
    }

    async getJsreport() {
        if (this._jsreport){
            return this._jsreport;
        }
        this._jsreport = jsreportCore({
            loadConfig: true
        });
        await this._jsreport.init().catch((e) => {
            this._jsreport = null;
            console.error(e)
        });
        return this._jsreport;
    }

    get reports() {
        return this._reports;
    }

    getReports(){
        return this._reports;
    }

    getReportsConfig() {
        let reportsConfig = {}
        _.each(this._reports, (report, _id) => {
            reportsConfig[_id] = report.toConfig()
        })
        return reportsConfig
    }

    getReport(id) {
        return this._reports[id];
    }

    useReportFiles(reportFiles) {
        reportFiles.forEach((reportFile)=>{
            this.useReportFile(reportFile)
        });
    }

    useReportFile(filePath) {
        let reportJsons = loadReports(filePath)
        _.each(reportJsons, (json) => {
            if (json.report_type === "jsreport") {
                json.html_file = path.join(filePath, `${json._id}.report.html`)
                json.script_file = path.join(filePath, `${json._id}.report.script.js`)
                json.helper_file = path.join(filePath, `${json._id}.report.helper.js`)
                this.addReport(json._id, json)
            }
        })
    }

    addReport(report_id, config) {
        config._id = report_id
        this._reports[config._id] = new SteedosReport(config)
    }
}

