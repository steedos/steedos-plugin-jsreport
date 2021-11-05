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

var _script = require("./script");

var _helper = require("./helper");

var _utils = require("./utils");

var _render2 = require("./render");

var _graphql = require("graphql");

/**
 * 检查filters中是否配置了key字段值，且值不为空
 * @param {*} filters 要检查的过滤条件
 * @param {*} key 要确认是否包含的字段名
 * @returns 
 */
var check = function check(filters, key) {
  if (filters instanceof Array) {
    if (filters[0] === key && filters.length === 3) {
      return filters[2] !== undefined && filters[2] !== null;
    } else {
      return !!filters.find(function (item) {
        return check(item, key);
      });
    }
  }
};

var SteedosReport = /*#__PURE__*/function () {
  function SteedosReport(config) {
    (0, _classCallCheck2["default"])(this, SteedosReport);

    if (config) {
      this._id = config._id;
      this.name = config.name;
      this.object_name = config.object_name;
      this.data_source = config.data_source;
      this.fields = config.fields;
      this.filters = config.filters;
      this.description = config.description;
      this.graphql = config.graphql;
      this.html = config.html;
      this.script = config.script;
      this.helper = config.helper;
      this.html_file = config.html_file;
      this.script_file = config.script_file;
      this.helper_file = config.helper_file;
    }
  }

  (0, _createClass2["default"])(SteedosReport, [{
    key: "toConfig",
    value: function toConfig() {
      var config = {};
      config._id = this._id;
      config.name = this.name;
      config.object_name = this.object_name;
      config.data_source = this.data_source;
      config.fields = this.fields;
      config.filters = this.filters;
      config.description = this.description;
      config.graphql = this.graphql;
      config.html = this.html;
      config.script = this.script;
      config.helper = this.helper;
      config.html_file = this.html_file;
      config.script_file = this.script_file;
      config.helper_file = this.helper_file;
      return config;
    }
  }, {
    key: "getHtmlContent",
    value: function getHtmlContent() {
      return this.html ? this.html : (0, _html.getHtmlContent)(this.toConfig());
    }
  }, {
    key: "getScriptContent",
    value: function getScriptContent() {
      return this.script ? this.script : (0, _script.getScriptContent)(this.toConfig());
    }
  }, {
    key: "getHelperContent",
    value: function getHelperContent() {
      return this.helper ? this.helper : (0, _helper.getHelperContent)(this.toConfig());
    }
  }, {
    key: "getObjectConfig",
    value: function getObjectConfig() {
      return (0, _utils.getObject)(this.object_name).toConfig();
    }
  }, {
    key: "getRequiredFilters",
    value: function getRequiredFilters() {
      // 找到过滤条件中必填且值未设置的选项
      if (this.filters && this.filters.length) {
        return this.filters.filter(function (item) {
          return item.is_required && (item.value === undefined || item.value === null);
        });
      } else {
        return [];
      }
    }
  }, {
    key: "getMissingRequiredFilters",
    value: function getMissingRequiredFilters(user_filters) {
      // 检查user_filters中是否有缺失的必要过滤条件
      var requiredFilters = this.getRequiredFilters();

      if (requiredFilters.length) {
        if (user_filters && user_filters.length) {
          if (typeof user_filters[0] === "string") {
            // 如果只有一层，即user_filters值格式为：["HPK_PAYBILL","=","1001B21000000002ETKD"]
            user_filters = [user_filters];
          }

          return requiredFilters.filter(function (item) {
            return !user_filters.find(function (userFilter) {
              if (userFilter.field) {
                // 非数组格式
                return userFilter.field === item.field && userFilter.value !== undefined && userFilter.value !== null;
              } else {
                // 数组格式
                return check(userFilter, item.field);
              }
            });
          });
        } else {
          return requiredFilters;
        }
      } else {
        return [];
      }
    }
  }, {
    key: "getData",
    value: function () {
      var _getData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user_filters, user_session) {
        var schema, dataResult, filters, object, _dataResult, result;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.data_source === "graphql" && this.graphql)) {
                  _context.next = 9;
                  break;
                }

                schema = (0, _utils.getGraphQLSchema)();
                _context.next = 4;
                return (0, _graphql.graphql)(schema, this.graphql);

              case 4:
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

              case 9:
                if (!(this.data_source === "odata")) {
                  _context.next = 22;
                  break;
                }

                filters = [];

                if (this.filters) {
                  filters = this.filters;
                }

                if (user_filters && user_filters.length) {
                  if (filters.length) {
                    filters = [filters, "and", user_filters];
                  } else {
                    filters = user_filters;
                  }
                }

                object = (0, _utils.getObject)(this.object_name);
                _context.next = 16;
                return object.find({
                  fields: this.fields,
                  filters: filters
                }, user_session.spaceId ? user_session : null);

              case 16:
                _dataResult = _context.sent;
                result = {};
                result["".concat(this.object_name)] = _dataResult;
                return _context.abrupt("return", result);

              case 22:
                console.warn("The property data_source is required to fetch data.");
                return _context.abrupt("return", {});

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData(_x, _x2) {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }, {
    key: "render",
    value: function () {
      var _render = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _ref,
            _ref$recipe,
            recipe,
            _ref$user_filters,
            user_filters,
            _ref$user_session,
            user_session,
            _ref$query,
            query,
            _args2 = arguments;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, _ref$recipe = _ref.recipe, recipe = _ref$recipe === void 0 ? "text" : _ref$recipe, _ref$user_filters = _ref.user_filters, user_filters = _ref$user_filters === void 0 ? [] : _ref$user_filters, _ref$user_session = _ref.user_session, user_session = _ref$user_session === void 0 ? {} : _ref$user_session, _ref$query = _ref.query, query = _ref$query === void 0 ? {} : _ref$query;
                _context2.next = 3;
                return (0, _render2.renderReport)(this, {
                  recipe: recipe,
                  user_filters: user_filters,
                  user_session: user_session,
                  query: query
                });

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function render() {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }]);
  return SteedosReport;
}();

exports.SteedosReport = SteedosReport;