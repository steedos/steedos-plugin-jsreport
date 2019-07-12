"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _underscore = _interopRequireDefault(require("underscore"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("./utils");

var _report = require("./report");

var SteedosPlugin =
/*#__PURE__*/
function () {
  function SteedosPlugin(config) {
    (0, _classCallCheck2["default"])(this, SteedosPlugin);
    (0, _defineProperty2["default"])(this, "_reports", {});

    if (config && config.reportFiles) {
      this.useReportFiles(config.reportFiles);
    }
  }

  (0, _createClass2["default"])(SteedosPlugin, [{
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
      var _this = this;

      reportFiles.forEach(function (reportFile) {
        _this.useReportFile(reportFile);
      });
    }
  }, {
    key: "useReportFile",
    value: function useReportFile(filePath) {
      var _this2 = this;

      var reportJsons = (0, _utils.loadReports)(filePath);

      _underscore["default"].each(reportJsons, function (json) {
        json.html_file = _path["default"].join(filePath, "".concat(json._id, ".report.html"));

        _this2.addReport(json._id, json);
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