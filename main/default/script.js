"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initScripts = exports.getScriptContent = exports.getBlankScriptContent = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _underscore = _interopRequireDefault(require("underscore"));

var saveReportToScriptFile = function saveReportToScriptFile(filePath, content) {
  _fs["default"].writeFileSync(filePath, content);
};

var getBlankScriptContent = function getBlankScriptContent(report) {
  return "/**\nDefine global functions beforeRender or (and) afterRender in script and use parameters req and res to reach your needs. \nscript functions expect parameters to be req, res, done or req, res.\nSee https://jsreport.net/learn/scripts to learn more.\n\nasync function beforeRender(req, res) {\n  // merge in some values for later use in engine\n  // and preserve other values which are already in\n  req.data = Object.assign({}, req.data, {foo: \"foo\"})\n  req.data.computedValue = await someAsyncComputation()\n}\n\nor\n\nfunction beforeRender(req, res, done) {\n  // merge in some values for later use in engine\n  // and preserve other values which are already in\n  req.data = Object.assign({}, req.data, {foo: \"foo\"})\n  done()\n}\n\n//you can also specify the template content directly\nfunction beforeRender(req, res, done) { \n  req.template.content='hello'; \n  done(); \n}\n\n//send the pdf report by mail\nfunction afterRender(req, res, done) {\n  var SendGrid = require('sendgrid');\n  var sendgrid = new SendGrid('username', 'password');\n  sendgrid.send({ to: '',  from: '', subject: '',\n    html: 'This is your report',\n    files: [ {filename: 'Report.pdf', content: new Buffer(res.content) }]\n  }, function(success, message) {\n    done(success);\n  });\n}\n */";
};

exports.getBlankScriptContent = getBlankScriptContent;

var initScripts = function initScripts(reports) {
  _underscore["default"].each(reports, function (report) {
    var scriptContent = getScriptContent(report);

    if (scriptContent) {} else {
      scriptContent = getBlankScriptContent(report);
      saveReportToScriptFile(report.script_file, scriptContent);
    }
  });
};

exports.initScripts = initScripts;

var getScriptContent = function getScriptContent(report) {
  if (report && report.script_file) {
    var filePath = report.script_file;
    var script = '';

    try {
      var extname = _path["default"].extname(filePath);

      if (extname.toLocaleLowerCase() === '.js' && /.report.script.js$/.test(filePath)) {
        if (_fs["default"].existsSync(filePath)) {
          script = _fs["default"].readFileSync(filePath, 'utf8');
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error('loadFile error', filePath, error);
    }

    return script;
  }
};

exports.getScriptContent = getScriptContent;