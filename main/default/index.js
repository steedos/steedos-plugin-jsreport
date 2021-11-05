"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  init: true,
  getReports: true,
  getReportsConfig: true,
  getReport: true,
  getJsreport: true,
  SteedosReport: true
};
Object.defineProperty(exports, "SteedosReport", {
  enumerable: true,
  get: function get() {
    return _report.SteedosReport;
  }
});
exports["default"] = void 0;
exports.getJsreport = getJsreport;
exports.getReport = getReport;
exports.getReports = getReports;
exports.getReportsConfig = getReportsConfig;
exports.init = init;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _underscore = _interopRequireDefault(require("underscore"));

var _plugin = _interopRequireDefault(require("./plugin"));

var _report = require("./report");

var _html = require("./html");

Object.keys(_html).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _html[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _html[key];
    }
  });
});
var plugin = new _plugin["default"]();

function init(context) {
  return plugin.init(context);
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

function getJsreport() {
  return _getJsreport.apply(this, arguments);
}

function _getJsreport() {
  _getJsreport = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return plugin.getJsreport();

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getJsreport.apply(this, arguments);
}

var _default = plugin;
exports["default"] = _default;