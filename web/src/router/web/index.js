import React, { Component } from 'react';
import {Route,IndexRoute,IndexRedirect} from 'react-router';
import {isPC} from '../../common.js';

import Web from '../../components/web/web.js';
import Index from '../../components/web/index.js';
import BlogerIndex from '../../components/web/blogerIndex.js';

export default (
    <Route path='/web' component={Web} onEnter= {
	    //检测是否是移动端，如果是，就需要跳转到移动端首页
	    ({params}, replace) => {
	       if(!isPC()) {
	         replace('/mobile'+sessionStorage.pathname);
	       }
	    }
	  }>
      <IndexRoute component={Index}/>
      <IndexRedirect to="/web/index" />
      <Route path='index' component={Index} name="PC端首页"></Route>
	  <Route path='blogerIndex' component={BlogerIndex} name="博主首页"></Route>

    </Route>
)
