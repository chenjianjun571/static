/**
 * Created by chenjianjun on 16/3/29.
 */
import Router from 'koa-router'
import React, { PropTypes } from 'react'
import _ from 'lodash'
import { renderToString } from 'react-dom/server'

import { Home } from './components/home.jsx'

const busRouter = new Router()
busRouter.get('/', function *(next) {
  yield this.render('modules/default', { 'reactMarkup': renderToString(<Home />), 'main': 'home'})
});

export { busRouter }
