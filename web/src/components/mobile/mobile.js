import React from 'react';

export default class Index extends React.Component {
   componentWillReceiveProps(nextProps) {
   	 //根路由，监听路由的变化，保存下来，防止切换PC端和移动端使用
   	 let nextPath = nextProps.location.pathname;
   	 sessionStorage.setItem('pathname', nextPath.slice(nextPath.lastIndexOf('/')));
   }
   render() {

     return (
       <section>
          {this.props.children}
       </section>
     )   	
   }
}
