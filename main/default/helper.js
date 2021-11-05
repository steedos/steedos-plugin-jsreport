"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initHelpers = exports.getHelperContent = exports.getBlankHelperContent = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _underscore = _interopRequireDefault(require("underscore"));

var saveReportToHelperFile = function saveReportToHelperFile(filePath, content) {
  _fs["default"].writeFileSync(filePath, content);
};

var getBlankHelperContent = function getBlankHelperContent(report) {
  return "/**\nDefine global helper functions for the handlebars file that named xxx.report.html.\nSee https://jsreport.net/learn/handlebars to learn more.\n\nFor example you want to have an upper case helper function. You can register a global function inside a helpers field with the following code:\n\nfunction toUpperCase(str) {\n    return str.toUpperCase();\n}\n\nAnd then you can call function in handlebars using:\n\nsay hello world loudly: {{{toUpperCase \"hello world\"}}}\n */";
};

exports.getBlankHelperContent = getBlankHelperContent;

var initHelpers = function initHelpers(reports) {
  _underscore["default"].each(reports, function (report) {
    var helperContent = getHelperContent(report);

    if (helperContent) {} else {
      helperContent = getBlankHelperContent(report);
      saveReportToHelperFile(report.helper_file, helperContent);
    }
  });
};

exports.initHelpers = initHelpers;

var getHelperContent = function getHelperContent(report) {
  if (report && report.helper_file) {
    var filePath = report.helper_file;
    var helper = '';

    try {
      var extname = _path["default"].extname(filePath);

      if (extname.toLocaleLowerCase() === '.js' && /.report.helper.js$/.test(filePath)) {
        if (_fs["default"].existsSync(filePath)) {
          helper = _fs["default"].readFileSync(filePath, 'utf8');
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error('loadFile error', filePath, error);
    }

    return helper;
  }
};

exports.getHelperContent = getHelperContent;