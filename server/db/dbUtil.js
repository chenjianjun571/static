/**
 * Created by chenjianjun on 15/12/8.
 */
var http = require('http');
var qs = require('querystring');
var _ = require('lodash')

var Config = require("../config.js");
var NavConf = require("../nav-config.js");
var Conf = require("./module/conf.js");

var dbTool = null;

//查询工具类
function DBUtil() {};


DBUtil.prototype.update = function() {
  // 读取一次资源到数据库
  Conf.delete().run().then(function(rel) {
    Conf.save(NavConf).then(function(result, error) {
    });
  });
};

exports.Instance = function() {

  if (dbTool == null) {
    dbTool = new DBUtil();
    // 读取一次资源到数据库
    Conf.delete().run().then(function(rel) {
      Conf.save(NavConf).then(function(result, error) {
      });
    });
  }

  return dbTool;
};
