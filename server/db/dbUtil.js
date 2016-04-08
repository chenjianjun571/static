/**
 * Created by chenjianjun on 15/12/8.
 */
var http = require('http');
var qs = require('querystring');
var _ = require('lodash')

var Config = require("../config.js");
var Conf = require("./module/conf.js");

var dbTool = null;

//查询工具类
function DBUtil() {};

function push() {
  let path = require('path');
  let pwd = path.resolve();
  pwd += '/server/nav-config.js';
  console.log(pwd);
  delete require.cache[pwd];

  let NavConf = require("../nav-config.js");
  // 读取一次资源到数据库
  Conf.delete().run().then(function(rel) {
    Conf.save(NavConf).then(function(result, error) {
    });
  });
};

DBUtil.prototype.update = function() {
  push();
};

exports.Instance = function() {

  if (dbTool == null) {
    dbTool = new DBUtil();
    push();
  }

  return dbTool;
};
