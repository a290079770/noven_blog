import React, { Component } from 'react';
import {Route,IndexRoute,IndexRedirect} from 'react-router';
import {isPC} from '../../common.js';

import Mobile from '../../components/mobile/mobile.js';
import Index from '../../components/mobile/index.js';
import BlogerIndex from '../../components/web/blogerIndex.js';

export default (
    <Route path='/mobile' component={Mobile} onEnter= {
	    //检测是否是PC端，如果是，就需要跳转到PC端首页
	    ({params}, replace) => {
	       if(isPC()) {
	         replace('/web'+sessionStorage.pathname);
	       }
	    }
	  }>
      <IndexRoute component={Index}/>
      <IndexRedirect to="/mobile/index" />
      <Route path='index' component={Index} name="移动端首页"></Route>
	  <Route path='blogerIndex' component={BlogerIndex} name="博主首页"></Route>
    </Route>
)
