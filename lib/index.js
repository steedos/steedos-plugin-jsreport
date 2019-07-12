"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  initPlugin: true,
  getReports: true,
  getReportsConfig: true,
  getReport: true,
  routes: true
};
exports.initPlugin = initPlugin;
exports.getReports = getReports;
exports.getReportsConfig = getReportsConfig;
exports.getReport = getReport;
Object.defineProperty(exports, "routes", {
  enumerable: true,
  get: function get() {
    return _router["default"];
  }
});
exports["default"] = void 0;

var _underscore = _interopRequireDefault(require("underscore"));

var _router = _interopRequireDefault(require("./router"));

var _html = require("./html");

Object.keys(_html).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _html[key];
    }
  });
});

var _plugin = _interopRequireDefault(require("./plugin"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

var plugin = new _plugin["default"]();

function initPlugin(app) {
  var reportsDir = _appRootPath["default"].resolve('/src');

  plugin.useReportFiles([reportsDir]);
  (0, _html.initHtmls)(plugin.getReports());
  app.use(_router["default"]);
}

function getReports() {
  return plugin.getReports();
}

function getReportsConfig() {
  return plugin.getReportsConfig();
}

function getReport(id) {
  return plugin.getReport(id);
}

var _default = plugin;
exports["default"] = _default;