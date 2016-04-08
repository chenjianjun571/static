/**
 * Created by chenjianjun on 16/3/29.
 */
import Koa from 'koa'
import ejsEngine from 'koa-ejs'
import Path from 'path'
import Favicon from 'koa-favicon'
import Logger from 'koa-logger'
import StaticFile from 'koa-static'
import bodyParser from 'koa-bodyparser'
import thunkify from 'thunkify-wrap'
import Boom from 'boom'
import _ from 'lodash'

import { busRouter } from './routes'

const Server = Koa()

/**
 初始化模板引擎 使用ejs作为页面引擎
 可以在中间件中用this.render('templateName',jsonData)
 来生成页面
 api请查看 [http://www.embeddedjs.com/]
 **/
ejsEngine(Server, {
  root: Path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: true,
  debug: true
})
// 只有在NODE_ENV为development才加载日志
process.env.NODE_ENV === 'development' && Server.use(Logger())
// favico
Server.use(Favicon(__dirname + '/assets/images/favicon.png'))
// 其他静态资源：js/images/css
Server.use(StaticFile('./assets',{'maxage':3*60*1000}))
Server.use(bodyParser());

// 业务路由
Server.use(busRouter.routes())

/**服务器异常处理**/
if (process.env.NODE_ENV === 'test') {
  module.exports = Server.callback();
} else {
  Server.listen(8000);
  console.log('open http://localhost:8000')
}

Server.on('error', function (err) {
  console.log(err.stack)
})
