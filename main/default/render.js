"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderReport = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = _interopRequireWildcard(require("./index"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var renderReport = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(report) {
    var _ref2,
        _ref2$recipe,
        recipe,
        _ref2$user_filters,
        user_filters,
        _ref2$user_session,
        user_session,
        _ref2$query,
        query,
        htmlContent,
        scriptContent,
        helperContent,
        objectConfig,
        reportConfig,
        data,
        jsreport,
        resp,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref2$recipe = _ref2.recipe, recipe = _ref2$recipe === void 0 ? "text" : _ref2$recipe, _ref2$user_filters = _ref2.user_filters, user_filters = _ref2$user_filters === void 0 ? [] : _ref2$user_filters, _ref2$user_session = _ref2.user_session, user_session = _ref2$user_session === void 0 ? {} : _ref2$user_session, _ref2$query = _ref2.query, query = _ref2$query === void 0 ? {} : _ref2$query;
            htmlContent = report.getHtmlContent();
            scriptContent = report.getScriptContent();
            helperContent = report.getHelperContent();
            objectConfig = report.getObjectConfig();
            reportConfig = report.toConfig();
            _context.next = 8;
            return report.getData(user_filters, user_session);

          case 8:
            data = _context.sent;
            _context.next = 11;
            return (0, _index.getJsreport)();

          case 11:
            jsreport = _context.sent;
            _context.next = 14;
            return jsreport.render({
              template: {
                content: htmlContent,
                scripts: [{
                  content: scriptContent
                }],
                helpers: helperContent,
                engine: 'handlebars',
                recipe: recipe
              },
              data: {
                data: data,
                user_filters: user_filters.length ? user_filters : report.filters,
                user_session: user_session,
                env: process.env,
                settings: _index["default"].settings,
                report_config: reportConfig,
                object_config: objectConfig,
                query: query
              }
            });

          case 14:
            resp = _context.sent;
            return _context.abrupt("return", resp);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderReport(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderReport = renderReport;