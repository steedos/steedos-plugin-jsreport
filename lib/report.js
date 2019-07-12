"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SteedosReport = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var SteedosReport =
/*#__PURE__*/
function () {
  function SteedosReport(config) {
    (0, _classCallCheck2["default"])(this, SteedosReport);
    this._id = config._id;
    this.name = config.name;
    this.object_name = config.object_name;
    this.fields = config.fields;
    this.filters = config.filters;
    this.description = config.description;
    this.html_file = config.html_file;
    this.graphql = config.graphql;
  }

  (0, _createClass2["default"])(SteedosReport, [{
    key: "toConfig",
    value: function toConfig() {
      var config = {};
      config._id = this._id;
      config.name = this.name;
      config.object_name = this.object_name;
      config.fields = this.fields;
      config.filters = this.filters;
      config.description = this.description;
      config.html_file = this.html_file;
      config.graphql = this.graphql;
      return config;
    }
  }]);
  return SteedosReport;
}();

exports.SteedosReport = SteedosReport;