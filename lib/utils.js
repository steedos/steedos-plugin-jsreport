"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadReports = exports.getGraphQLSchema = exports.getObjectConfig = exports.getObject = void 0;

var _underscore = _interopRequireDefault(require("underscore"));

var _path = _interopRequireDefault(require("path"));

var globby = require("globby");

var objectql = require('@steedos/objectql');

var loadFile = objectql.loadFile;

var getObject = function getObject(object_name) {
  return objectql.getSteedosSchema().getObject(object_name);
};

exports.getObject = getObject;

var getObjectConfig = function getObjectConfig(object_name) {
  var object = getObject(object_name);
  return object ? object.toConfig() : null;
};

exports.getObjectConfig = getObjectConfig;

var loadReports = function loadReports(filePath) {
  var results = [];
  var filePatten = [_path["default"].join(filePath, "*.report.yml"), _path["default"].join(filePath, "*.report.json"), _path["default"].join(filePath, "*.report.js")];
  var matchedPaths = globby.sync(filePatten);

  _underscore["default"].each(matchedPaths, function (matchedPath) {
    var json = loadFile(matchedPath);
    results.push(json);
  });

  return results;
};

exports.loadReports = loadReports;

var getGraphQLSchema = function getGraphQLSchema() {
  return objectql.getSteedosSchema().getDataSource().getGraphQLSchema();
};

exports.getGraphQLSchema = getGraphQLSchema;