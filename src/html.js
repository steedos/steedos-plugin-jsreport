import fs from 'fs';
import path from 'path';
import _ from 'underscore';

const saveReportToHtmlFile = (filePath, content) => {
    fs.writeFileSync(filePath, content);
}

const getBlankHtmlContent = (report) => {
    return `<html>
    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    </head>
    <body>
    </body>
</html>`;
}

const initHtmls = (reports) => {
    _.each(reports, (report) => {
        let htmlContent = getHtmlContent(report);
        if (htmlContent){
        }
        else{
            htmlContent = getBlankHtmlContent(report);
            saveReportToHtmlFile(report.html_file, htmlContent);
        }
    });
}

const getHtmlContent = (report) => {
    if (report && report.html_file){
        let filePath = report.html_file;
        let html = '';
        try { 
            let extname = path.extname(filePath);
            if (extname.toLocaleLowerCase() === '.html' && /.report.html$/.test(filePath)){
                if (fs.existsSync(filePath)){
                    html = fs.readFileSync(filePath, 'utf8');
                }
                else{
                    return null;
                }
            }
        } catch (error) {
            console.error('loadFile error', filePath, error);
        }
        return html;
    }
}

export { saveReportToHtmlFile, initHtmls, getBlankHtmlContent, getHtmlContent };


