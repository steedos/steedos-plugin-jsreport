"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SteedosReport = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _html = require("./html");

var _utils = require("./utils");

var _graphql = require("graphql");

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
  }, {
    key: "getHtmlContent",
    value: function getHtmlContent() {
      return (0, _html.getHtmlContent)(this.toConfig());
    }
  }, {
    key: "getData",
    value: function () {
      var _getData = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var config, schema, dataResult, object, _dataResult, result;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = this.toConfig();

                if (!config.graphql) {
                  _context.next = 10;
                  break;
                }

                schema = (0, _utils.getGraphQLSchema)();
                _context.next = 5;
                return (0, _graphql.graphql)(schema, config.graphql);

              case 5:
                dataResult = _context.sent;
                dataResult = dataResult['data'];
                /**
                    返回结果{
                    "object_name": [{
                        "_id": "R9HquKmR5fHbDqdWq",
                        "name": "测试1",
                        "organization": {
                            "_id": "P7XMJMjKoSz4yaK49",
                            "name": "组织A"
                        }
                    }]
                    }
                    **/

                return _context.abrupt("return", dataResult);

              case 10:
                object = (0, _utils.getObject)(config.object_name);
                _context.next = 13;
                return object.find({
                  fields: config.fields,
                  filters: config.filters
                });

              case 13:
                _dataResult = _context.sent;
                result = {};
                result["".concat(config.object_name)] = _dataResult;
                return _context.abrupt("return", result);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData() {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }]);
  return SteedosReport;
}();

exports.SteedosReport = SteedosReport;