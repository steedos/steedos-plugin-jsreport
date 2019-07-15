"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _underscore = _interopRequireDefault(require("underscore"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("./utils");

var _report = require("./report");

var _jsreportCore = _interopRequireDefault(require("jsreport-core"));

var SteedosPlugin =
/*#__PURE__*/
function () {
  function SteedosPlugin(config) {
    (0, _classCallCheck2["default"])(this, SteedosPlugin);
    (0, _defineProperty2["default"])(this, "_reports", {});
    (0, _defineProperty2["default"])(this, "_jsreport", null);

    if (config && config.reportFiles) {
      this.useReportFiles(config.reportFiles);
    }
  }

  (0, _createClass2["default"])(SteedosPlugin, [{
    key: "getJsreport",
    value: function () {
      var _getJsreport = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var _this = this;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._jsreport) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", this._jsreport);

              case 2:
                this._jsreport = (0, _jsreportCore["default"])();
                _context.next = 5;
                return this._jsreport.init()["catch"](function (e) {
                  _this._jsreport = null;
                  console.error(e);
                });

              case 5:
                return _context.abrupt("return", this._jsreport);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getJsreport() {
        return _getJsreport.apply(this, arguments);
      }

      return getJsreport;
    }()
  }, {
    key: "getReports",
    value: function getReports() {
      return this._reports;
    }
  }, {
    key: "getReportsConfig",
    value: function getReportsConfig() {
      var reportsConfig = {};

      _underscore["default"].each(this._reports, function (report, _id) {
        reportsConfig[_id] = report.toConfig();
      });

      return reportsConfig;
    }
  }, {
    key: "getReport",
    value: function getReport(id) {
      return this._reports[id];
    }
  }, {
    key: "useReportFiles",
    value: function useReportFiles(reportFiles) {
      var _this2 = this;

      reportFiles.forEach(function (reportFile) {
        _this2.useReportFile(reportFile);
      });
    }
  }, {
    key: "useReportFile",
    value: function useReportFile(filePath) {
      var _this3 = this;

      var reportJsons = (0, _utils.loadReports)(filePath);

      _underscore["default"].each(reportJsons, function (json) {
        json.html_file = _path["default"].join(filePath, "".concat(json._id, ".report.html"));

        _this3.addReport(json._id, json);
      });
    }
  }, {
    key: "addReport",
    value: function addReport(report_id, config) {
      config._id = report_id;
      this._reports[config._id] = new _report.SteedosReport(config);
    }
  }, {
    key: "reports",
    get: function get() {
      return this._reports;
    }
  }]);
  return SteedosPlugin;
}();

exports["default"] = SteedosPlugin;