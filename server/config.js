/**
 * Created by chenjianjun on 16/3/5.
 */
const DBConfig = {
  cache_flg: true, // DB数据库缓存开关 true开启 false关闭
  cache_time_check: 60000*30, // 缓存清理时间,30分钟
  rethink:{
    db:'static',
    host:'127.0.0.1',
    port:'28015'
  }
};

const Thinky = require('thinky')(DBConfig.rethink);

module.exports = {
  'DBConfig':DBConfig,
  'Thinky':Thinky
};
