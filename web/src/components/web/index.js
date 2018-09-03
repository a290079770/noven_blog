import React from 'react';
import {Button} from 'antd';

export default class Index extends React.Component {
   render() {
     return (
       <section>
          <div className="web-header">
            1111<Button type="primary">Button</Button>
          </div>
          <div id="particleContainer"></div>
          
          <div className="web-page-cont">
            {this.props.children}
          </div>
       </section>
     )   	
   }
}
