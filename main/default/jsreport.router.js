"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = require("./index");

var _utils = require("./utils");

var _path = _interopRequireDefault(require("path"));

var _auth = require("@steedos/auth");

var _excluded = ["user_filters"],
    _excluded2 = ["user_filters"],
    _excluded3 = ["user_filters"],
    _excluded4 = ["user_filters"],
    _excluded5 = ["user_filters"],
    _excluded6 = ["user_filters"];

var router = _express["default"].Router();

var rootUrl = "/plugins/jsreport";
router.use(_bodyParser["default"].json());
router.use(["".concat(rootUrl, "/web"), "".concat(rootUrl, "/api")], _auth.setRequestUser);
router.use(["".concat(rootUrl, "/web"), "".concat(rootUrl, "/api")], function (req, res, next) {
  if (req.user) {
    if (!req.user.spaceId) {
      res.status(401).send({
        status: 'error',
        message: 'You must pass the params space_id.'
      });
      return;
    }

    next();
  } else {
    res.status(401).send({
      status: 'error',
      message: 'You must be logged in to do this.'
    });
  }
}); // 报表查看列表界面

router.get("".concat(rootUrl, "/web"), /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var reports, jsreport, resp;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reports = (0, _index.getReportsConfig)();
            _context.next = 3;
            return (0, _index.getJsreport)();

          case 3:
            jsreport = _context.sent;
            _context.next = 6;
            return jsreport.render({
              template: {
                content: "\n        {{#each reports}}\n          <div className=\"report-list-item\">\n            <a href= '{{../rootUrl}}/web/viewer/{{_id}}?space_id={{../spaceId}}'>{{name}}</a>\n          </div>\n        {{/each}}\n      ",
                engine: 'handlebars',
                recipe: 'text'
              },
              data: {
                reports: reports,
                rootUrl: rootUrl,
                spaceId: req.user.spaceId
              }
            });

          case 6:
            resp = _context.sent;
            res.send(resp.content.toString());
            res.end();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // 查看yml配置中的报表详细

router.get("".concat(rootUrl, "/web/viewer/:report_id"), /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$query, user_filters, query, report_id, report, missingRequiredFilters, resp;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$query = req.query, user_filters = _req$query.user_filters, query = (0, _objectWithoutProperties2["default"])(_req$query, _excluded);

            if (user_filters) {
              user_filters = JSON.parse(decodeURI(user_filters));
            }

            report_id = req.params.report_id;
            report = (0, _index.getReport)(report_id);

            if (report) {
              _context2.next = 8;
              break;
            }

            res.status(404).send("<b style=\"color:red\">\u672A\u627E\u5230\u62A5\u8868:".concat(report_id, "</b>"));
            res.end();
            return _context2.abrupt("return");

          case 8:
            missingRequiredFilters = report.getMissingRequiredFilters(user_filters);

            if (!(missingRequiredFilters && missingRequiredFilters.length)) {
              _context2.next = 13;
              break;
            }

            res.status(500).send("<b style=\"color:red\">\u7F3A\u5C11\u8FC7\u6EE4\u6761\u4EF6\uFF1A".concat(JSON.stringify(missingRequiredFilters), "</b>"));
            res.end();
            return _context2.abrupt("return");

          case 13:
            _context2.next = 15;
            return report.render({
              user_filters: user_filters,
              user_session: req.user,
              query: query
            });

          case 15:
            resp = _context2.sent;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(resp.content);
            res.end();

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // 查看db中的报表详细

router.get("".concat(rootUrl, "/web/viewer_db/:report_id"), /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$query2, user_filters, query, report_id, reportObject, reportConfig, report, missingRequiredFilters, resp;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$query2 = req.query, user_filters = _req$query2.user_filters, query = (0, _objectWithoutProperties2["default"])(_req$query2, _excluded2);

            if (user_filters) {
              user_filters = JSON.parse(decodeURI(user_filters));
            }

            report_id = req.params.report_id;
            reportObject = (0, _utils.getObject)("reports");
            _context3.next = 6;
            return reportObject.findOne(report_id);

          case 6:
            reportConfig = _context3.sent;

            if (reportConfig) {
              _context3.next = 11;
              break;
            }

            res.status(404).send("<b style=\"color:red\">\u672A\u627E\u5230\u62A5\u8868:".concat(report_id, "</b>"));
            res.end();
            return _context3.abrupt("return");

          case 11:
            report = new _index.SteedosReport(reportConfig);
            missingRequiredFilters = report.getMissingRequiredFilters(user_filters);

            if (!(missingRequiredFilters && missingRequiredFilters.length)) {
              _context3.next = 17;
              break;
            }

            res.status(500).send("<b style=\"color:red\">\u7F3A\u5C11\u8FC7\u6EE4\u6761\u4EF6\uFF1A".concat(JSON.stringify(missingRequiredFilters), "</b>"));
            res.end();
            return _context3.abrupt("return");

          case 17:
            _context3.next = 19;
            return report.render({
              user_filters: user_filters,
              user_session: req.user,
              query: query
            });

          case 19:
            resp = _context3.sent;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(resp.content);
            res.end();

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // 导出yml配置中的报表为PDF

router.get("".concat(rootUrl, "/api/report/:report_id/pdf"), /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$query3, user_filters, query, report_id, report, missingRequiredFilters, resp;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$query3 = req.query, user_filters = _req$query3.user_filters, query = (0, _objectWithoutProperties2["default"])(_req$query3, _excluded3);

            if (user_filters) {
              user_filters = JSON.parse(decodeURI(user_filters));
            }

            report_id = req.params.report_id;
            report = (0, _index.getReport)(report_id);

            if (report) {
              _context4.next = 8;
              break;
            }

            res.status(404).send("<b style=\"color:red\">\u672A\u627E\u5230\u62A5\u8868:".concat(report_id, "</b>"));
            res.end();
            return _context4.abrupt("return");

          case 8:
            missingRequiredFilters = report.getMissingRequiredFilters(user_filters);

            if (!(missingRequiredFilters && missingRequiredFilters.length)) {
              _context4.next = 13;
              break;
            }

            res.status(500).send("<b style=\"color:red\">\u7F3A\u5C11\u8FC7\u6EE4\u6761\u4EF6\uFF1A".concat(JSON.stringify(missingRequiredFilters), "</b>"));
            res.end();
            return _context4.abrupt("return");

          case 13:
            _context4.next = 15;
            return report.render({
              recipe: 'chrome-pdf',
              user_filters: user_filters,
              user_session: req.user,
              query: query
            });

          case 15:
            resp = _context4.sent;
            res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
            res.send(resp.content);
            res.end();

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); // 导出db中的报表为PDF

router.get("".concat(rootUrl, "/api/report_db/:report_id/pdf"), /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$query4, user_filters, query, report_id, reportObject, reportConfig, report, missingRequiredFilters, resp;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$query4 = req.query, user_filters = _req$query4.user_filters, query = (0, _objectWithoutProperties2["default"])(_req$query4, _excluded4);

            if (user_filters) {
              user_filters = JSON.parse(decodeURI(user_filters));
            }

            report_id = req.params.report_id;
            reportObject = (0, _utils.getObject)("reports");
            _context5.next = 6;
            return reportObject.findOne(report_id);

          case 6:
            reportConfig = _context5.sent;

            if (reportConfig) {
              _context5.next = 11;
              break;
            }

            res.status(404).send("<b style=\"color:red\">\u672A\u627E\u5230\u62A5\u8868:".concat(report_id, "</b>"));
            res.end();
            return _context5.abrupt("return");

          case 11:
            report = new _index.SteedosReport(reportConfig);
            missingRequiredFilters = report.getMissingRequiredFilters(user_filters);

            if (!(missingRequiredFilters && missingRequiredFilters.length)) {
              _context5.next = 17;
              break;
            }

            res.status(500).send("<b style=\"color:red\">\u7F3A\u5C11\u8FC7\u6EE4\u6761\u4EF6\uFF1A".concat(JSON.stringify(missingRequiredFilters), "</b>"));
            res.end();
            return _context5.abrupt("return");

          case 17:
            _context5.next = 19;
            return report.render({
              recipe: 'chrome-pdf',
              user_filters: user_filters,
              user_session: req.user,
              query: query
            });

          case 19:
            resp = _context5.sent;
            res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
            res.send(resp.content);
            res.end();

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); // 导出yml配置中的报表为Excel

router.get("".concat(rootUrl, "/api/report/:report_id/excel"), /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$query5, user_filters, query, report_id, report, missingRequiredFilters, resp;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$query5 = req.query, user_filters = _req$query5.user_filters, query = (0, _objectWithoutProperties2["default"])(_req$query5, _excluded5);

            if (user_filters) {
              user_filters = JSON.parse(decodeURI(user_filters));
            }

            report_id = req.params.report_id;
            report = (0, _index.getReport)(report_id);

            if (report) {
              _context6.next = 8;
              break;
            }

            res.status(404).send("<b style=\"color:red\">\u672A\u627E\u5230\u62A5\u8868:".concat(report_id, "</b>"));
            res.end();
            return _context6.abrupt("return");

          case 8:
            missingRequiredFilters = report.getMissingRequiredFilters(user_filters);

            if (!(missingRequiredFilters && missingRequiredFilters.length)) {
              _context6.next = 13;
              break;
            }

            res.status(500).send("<b style=\"color:red\">\u7F3A\u5C11\u8FC7\u6EE4\u6761\u4EF6\uFF1A".concat(JSON.stringify(missingRequiredFilters), "</b>"));
            res.end();
            return _context6.abrupt("return");

          case 13:
            _context6.next = 15;
            return report.render({
              recipe: 'html-to-xlsx',
              user_filters: user_filters,
              user_session: req.user,
              query: query
            });

          case 15:
            resp = _context6.sent;
            res.setHeader('Content-Type', 'application/vnd.ms-excel; charset=utf-8');
            res.send(resp.content);
            res.end();

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()); // 导出db中的报表为Excel

router.get("".concat(rootUrl, "/api/report_db/:report_id/excel"), /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var _req$query6, user_filters, query, report_id, reportObject, reportConfig, report, missingRequiredFilters, resp;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$query6 = req.query, user_filters = _req$query6.user_filters, query = (0, _objectWithoutProperties2["default"])(_req$query6, _excluded6);

            if (user_filters) {
              user_filters = JSON.parse(decodeURI(user_filters));
            }

            report_id = req.params.report_id;
            reportObject = (0, _utils.getObject)("reports");
            _context7.next = 6;
            return reportObject.findOne(report_id);

          case 6:
            reportConfig = _context7.sent;

            if (reportConfig) {
              _context7.next = 11;
              break;
            }

            res.status(404).send("<b style=\"color:red\">\u672A\u627E\u5230\u62A5\u8868:".concat(report_id, "</b>"));
            res.end();
            return _context7.abrupt("return");

          case 11:
            report = new _index.SteedosReport(reportConfig);
            missingRequiredFilters = report.getMissingRequiredFilters(user_filters);

            if (!(missingRequiredFilters && missingRequiredFilters.length)) {
              _context7.next = 17;
              break;
            }

            res.status(500).send("<b style=\"color:red\">\u7F3A\u5C11\u8FC7\u6EE4\u6761\u4EF6\uFF1A".concat(JSON.stringify(missingRequiredFilters), "</b>"));
            res.end();
            return _context7.abrupt("return");

          case 17:
            _context7.next = 19;
            return report.render({
              recipe: 'html-to-xlsx',
              user_filters: user_filters,
              user_session: req.user,
              query: query
            });

          case 19:
            resp = _context7.sent;
            res.setHeader('Content-Type', 'application/vnd.ms-excel; charset=utf-8');
            res.send(resp.content);
            res.end();

          case 23:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
router.use(rootUrl, _express["default"]["static"](_path["default"].resolve(__dirname, "static")));
var _default = router;
exports["default"] = _default;