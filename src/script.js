import fs from 'fs';
import path from 'path';
import _ from 'underscore';

const saveReportToScriptFile = (filePath, content) => {
    fs.writeFileSync(filePath, content);
}

const getBlankScriptContent = (report) => {
    return `/**
Define global functions beforeRender or (and) afterRender in script and use parameters req and res to reach your needs. 
script functions expect parameters to be req, res, done or req, res.
See https://jsreport.net/learn/scripts to learn more.

async function beforeRender(req, res) {
  // merge in some values for later use in engine
  // and preserve other values which are already in
  req.data = Object.assign({}, req.data, {foo: "foo"})
  req.data.computedValue = await someAsyncComputation()
}

or

function beforeRender(req, res, done) {
  // merge in some values for later use in engine
  // and preserve other values which are already in
  req.data = Object.assign({}, req.data, {foo: "foo"})
  done()
}

//you can also specify the template content directly
function beforeRender(req, res, done) { 
  req.template.content='hello'; 
  done(); 
}

//send the pdf report by mail
function afterRender(req, res, done) {
  var SendGrid = require('sendgrid');
  var sendgrid = new SendGrid('username', 'password');
  sendgrid.send({ to: '',  from: '', subject: '',
    html: 'This is your report',
    files: [ {filename: 'Report.pdf', content: new Buffer(res.content) }]
  }, function(success, message) {
    done(success);
  });
}
 */`;
}

const initScripts = (reports) => {
    _.each(reports, (report) => {
        let scriptContent = getScriptContent(report);
        if (scriptContent){
        }
        else{
            scriptContent = getBlankScriptContent(report);
        }
        saveReportToScriptFile(report.script_file, scriptContent);
    });
}

const getScriptContent = (report) => {
    if (report && report.script_file){
        let filePath = report.script_file;
        let script = '';
        try { 
            let extname = path.extname(filePath);
            if (extname.toLocaleLowerCase() === '.js' && /.report.js$/.test(filePath)){
                if (fs.existsSync(filePath)){
                    script = fs.readFileSync(filePath, 'utf8');
                }
                else{
                    return null;
                }
            }
        } catch (error) {
            console.error('loadFile error', filePath, error);
        }
        return script;
    }
}

export { initScripts, getBlankScriptContent, getScriptContent };


