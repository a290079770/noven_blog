import React, { Component } from 'react';
import {Router,Route,hashHistory} from 'react-router';
import {isPC} from '../common.js';


//移动端所有组件
import Mobile from './mobile/index.js';

//PC端所有组件
import Web from './web/index.js';

export default class App extends Component {
  render() {
    return (
        <Router history={hashHistory}>
          <Route path='/' onEnter= {
            //检测是否是PC端，如果是，就需要跳转到PC端首页
            ({params}, replace) => {
               if(isPC()) {
                 replace('/web/index');
               }else {
                 replace('/mobile/index');
               }
            }
          }>
          </Route>
         {
          Mobile
         }

         {
          Web
         }

         <Route path="*" onEnter= { (nextState, replace) => {
            //进入这里面的，都是没有匹配到路由的，需要重定向
            if(isPC()) {
               replace('/web/index');
             }else {
               replace('/mobile/index');
             }
         }}>
         </Route>
        </Router>
    );
  }
}