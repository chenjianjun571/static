/**
 * Created by chenjianjun on 16/3/29.
 */
import Router from 'koa-router'
import React, { PropTypes } from 'react'
import _ from 'lodash'
import { renderToString } from 'react-dom/server'

import { Home } from './components/home.jsx'

import db from './server/db/dbUtil'
const DBUtil = db.Instance()
import conf from './server/db/module/conf.js'

const busRouter = new Router()
busRouter.get('/', function *(next) {
  yield this.render('modules/default', { 'reactMarkup': renderToString(<Home />), 'main': 'home'})
});

busRouter.get('/api/list',  function *(next) {
  let resData = {
    success: true,
    message: "",
    data: [],
    code: 200
  }

  try {
    let cf  = yield conf.run()
    resData.data[0] = cf[0].NavConfig
    resData.code = 200
    resData.success = true
  } catch (err) {
    resData.data = yield conf.run()
    resData.code = 404
    resData.success = false
  }
  this.body = resData
});

busRouter.get('/update',  function *(next) {
  DBUtil.update();
  this.body = 'ok'
});

export { busRouter }
