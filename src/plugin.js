import _ from 'underscore';
import path from 'path';
const globby = require("globby");
import { getBaseDirectory } from "@steedos/objectql";
import { loadReports } from './utils';
import { SteedosReport } from './report';
import { initHtmls } from './html';
import { initScripts } from './script';
import { initHelpers } from './helper';
// import { default as routes } from './router';
import jsreportCore from 'jsreport-core';


export default class SteedosPlugin { 
    _reports = {}
    _jsreport = null
    _settings = {}

    constructor(config) {
        if (config && config.reportFiles){
            this.useReportFiles(config.reportFiles);
        }
    }

    init() {
        // let reportsDir = "./src/**";
        // this.useReportFiles([reportsDir]);
        // initHtmls(this.getReports());
        // initScripts(this.getReports());
        // initHelpers(this.getReports());

        // app.use(routes);
        // if (settings){
        //     this._settings = settings;
        // }
    }

    get settings() {
        return this._settings;
    }

    async getJsreport() {
        if (this._jsreport){
            return this._jsreport;
        }
        this._jsreport = jsreportCore({
            loadConfig: true
        },{
            "allowLocalFilesAccess": true,
            "chrome": {
                "launchOptions": {
                "args": ["--no-sandbox"]
                },
                "timeout": 40000
            }    
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
        if (!path.isAbsolute(filePath)) {
            filePath = path.resolve(getBaseDirectory(), filePath);
        }
        let reportJsons = loadReports(filePath);
        _.each(reportJsons, (json) => {
            if (json.report_type === "jsreport") {
                this.addReport(json._id, json)
            }
        })
    }

    addReport(report_id, config) {
        config._id = report_id
        this._reports[config._id] = new SteedosReport(config)
    }
}

