"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveReportToHtmlFile = exports.initHtmls = exports.getHtmlContent = exports.getBlankHtmlContent = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _underscore = _interopRequireDefault(require("underscore"));

var saveReportToHtmlFile = function saveReportToHtmlFile(filePath, content) {
  _fs["default"].writeFileSync(filePath, content);
};

exports.saveReportToHtmlFile = saveReportToHtmlFile;

var getBlankHtmlContent = function getBlankHtmlContent(report) {
  return "<html>\n    <head>\n        <meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-Type\">\n    </head>\n    <body>\n    </body>\n</html>";
};

exports.getBlankHtmlContent = getBlankHtmlContent;

var initHtmls = function initHtmls(reports) {
  _underscore["default"].each(reports, function (report) {
    var htmlContent = getHtmlContent(report);

    if (htmlContent) {} else {
      htmlContent = getBlankHtmlContent(report);
      saveReportToHtmlFile(report.html_file, htmlContent);
    }
  });
};

exports.initHtmls = initHtmls;

var getHtmlContent = function getHtmlContent(report) {
  if (report && report.html_file) {
    var filePath = report.html_file;
    var html = '';

    try {
      var extname = _path["default"].extname(filePath);

      if (extname.toLocaleLowerCase() === '.html' && /.report.html$/.test(filePath)) {
        if (_fs["default"].existsSync(filePath)) {
          html = _fs["default"].readFileSync(filePath, 'utf8');
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error('loadFile error', filePath, error);
    }

    return html;
  }
};

exports.getHtmlContent = getHtmlContent;