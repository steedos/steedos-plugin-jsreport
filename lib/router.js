"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _html = require("./html");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = require("./index");

var routes = (0, _express["default"])();
var rootUrl = "/plugins/jsreport";
var apiUrl = "".concat(rootUrl, "/api");
routes.use(_bodyParser["default"].json()); // 获取报表模板

routes.get("".concat(apiUrl, "/html/:report_id"),
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var report_id, report, htmlContent;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            report_id = req.params.report_id;
            report = (0, _index.getReport)(report_id);
            htmlContent = (0, _html.getHtmlContent)(report);
            res.send(htmlContent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // 报表html模板保存

routes.post("".concat(apiUrl, "/html/:report_id"),
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var report_id, report;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            report_id = req.params.report_id;
            report = (0, _index.getReport)(report_id).toConfig();
            (0, _html.saveReportToHtmlFile)(report.html_file, req.body);
            res.send({});

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // 获取报表数据

routes.get("".concat(apiUrl, "/data/:report_id"),
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var report_id, report, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            report_id = req.params.report_id;
            report = (0, _index.getReport)(report_id);
            _context3.next = 4;
            return report.getData();

          case 4:
            data = _context3.sent;
            res.send(data);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // 获取报表列表

routes.get("".concat(apiUrl, "/reports"),
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var reports;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            reports = (0, _index.getReportsConfig)();
            res.send(reports);

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); // 报表查看列表界面

routes.get("".concat(rootUrl, "/web"),
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var reports, jsreport, resp;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            reports = (0, _index.getReportsConfig)();
            _context5.next = 3;
            return (0, _index.getJsreport)();

          case 3:
            jsreport = _context5.sent;
            _context5.next = 6;
            return jsreport.render({
              template: {
                content: "\n        {{#each reports}}\n          <div className=\"report-list-item\">\n            <a href='{{../rootUrl}}/web/viewer/{{_id}}'>{{name}}</a>\n          </div>\n        {{/each}}\n      ",
                engine: 'handlebars',
                recipe: 'text'
              },
              data: {
                reports: reports,
                rootUrl: rootUrl
              }
            });

          case 6:
            resp = _context5.sent;
            res.send(resp.content.toString());
            res.end();

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); // 报表查看详细界面

routes.get("".concat(rootUrl, "/web/viewer/:report_id"),
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    var report_id, report, htmlContent, data, jsreport, resp;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            report_id = req.params.report_id;
            report = (0, _index.getReport)(report_id);
            htmlContent = report.getHtmlContent();
            _context6.next = 5;
            return report.getData();

          case 5:
            data = _context6.sent;
            console.log("====================data====JSON.stringify=============");
            console.log(JSON.stringify(data));
            _context6.next = 10;
            return (0, _index.getJsreport)();

          case 10:
            jsreport = _context6.sent;
            _context6.next = 13;
            return jsreport.render({
              template: {
                content: htmlContent,
                engine: 'handlebars',
                recipe: 'text'
              },
              data: {
                report: report.toConfig(),
                data: data
              }
            });

          case 13:
            resp = _context6.sent;
            console.log("====================resp.content=================");
            console.log(resp.content);
            res.send(resp.content.toString());
            res.end();

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()); // routes.use(rootUrl, requestHandler);
// routes.use(rootUrl, express.static(path.resolve(__dirname, "../build")));

var _default = routes;
exports["default"] = _default;