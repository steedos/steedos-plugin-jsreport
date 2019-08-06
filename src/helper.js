import fs from 'fs';
import path from 'path';
import _ from 'underscore';

const saveReportToHelperFile = (filePath, content) => {
    fs.writeFileSync(filePath, content);
}

const getBlankHelperContent = (report) => {
    return `/**
Define global helper functions for the handlebars file that named xxx.report.html.
See https://jsreport.net/learn/handlebars to learn more.

For example you want to have an upper case helper function. You can register a global function inside a helpers field with the following code:

function toUpperCase(str) {
    return str.toUpperCase();
}

And then you can call function in handlebars using:

say hello world loudly: {{{toUpperCase "hello world"}}}
 */`;
}

const initHelpers = (reports) => {
    _.each(reports, (report) => {
        let helperContent = getHelperContent(report);
        if (helperContent){
        }
        else{
            helperContent = getBlankHelperContent(report);
            saveReportToHelperFile(report.helper_file, helperContent);
        }
    });
}

const getHelperContent = (report) => {
    if (report && report.helper_file){
        let filePath = report.helper_file;
        let helper = '';
        try { 
            let extname = path.extname(filePath);
            if (extname.toLocaleLowerCase() === '.js' && /.report.helper.js$/.test(filePath)){
                if (fs.existsSync(filePath)){
                    helper = fs.readFileSync(filePath, 'utf8');
                }
                else{
                    return null;
                }
            }
        } catch (error) {
            console.error('loadFile error', filePath, error);
        }
        return helper;
    }
}

export { initHelpers, getBlankHelperContent, getHelperContent };


