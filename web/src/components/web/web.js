import React from 'react';

export default class Index extends React.Component {
   componentDidMount() {
      window.particlesJS.load('particleContainer', '/js/particles.json', function() {
        console.log('callback - particles.js config loaded');
      });
   }

   componentWillReceiveProps(nextProps) {
   	 //根路由，监听路由的变化，保存下来，切换PC端和移动端使用
   	 let nextPath = nextProps.location.pathname;
   	 sessionStorage.setItem('pathname', nextPath.slice(nextPath.lastIndexOf('/')));
   }	
   render() {
     return (
       <div className="web-container">
          <div id="particleContainer"></div>
          
          <div className="web-page-cont">
            {this.props.children}
          </div>
       </div>
     )   	
   }
}
