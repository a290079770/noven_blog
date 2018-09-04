import React from 'react';
import {Button,Carousel} from 'antd';

export default class Index extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       dataList:[
         {
           url:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
         },
         {
           url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
         },
         {
           url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
         },
       ],
       winHeight:window.innerHeight,
       isHeaderShow:false,
       leftArrowOpacity:0.3,
       rightArrowOpacity:0.3,
     }
   }
   
   /**
    * [onChange 轮播图change事件]
    * @Author   罗文
    * @DateTime 2018-09-04
    * @param    {[Number]}   index [切换后当前页的索引]
    * @return   {[type]}     [description]
    */
   onChange(index) {
     console.log(index)
   }

   /**
    * [changeSwiper 手动修改轮播图]
    * @Author   罗文
    * @DateTime 2018-09-04
    * @param    {[Number]}   type [-1 前一张 1 - 后一张]
    */
   changeSwiper(type) {
      if(type == -1) {
        this.refs.bSwiper.prev();
        this.refs.mSwiper.prev();
      }else if(type == 1) {
        this.refs.bSwiper.next();
        this.refs.mSwiper.next();
      }
   }

   render() {
     return (
       <div className="web-index">
          {/*<button onClick={()=>this.refs.bSwiper.next()}>click</button>*/}

          <div className="web-header" style={{display: this.state.isHeaderShow ? 'block':'none'}}></div>
          {/*大轮播图*/}
          <div className="web-index-swiper" style={{height:this.state.winHeight + 'px'}}>
            <div className="web-index-swiper-bg">
              <Carousel ref="bSwiper" dots={false} afterChange={(index) => this.onChange(index)}>
                {
                  this.state.dataList.map((item,index)=>{
                     return (
                       <div key={'wi-swiper'+index}>
                         <div className="web-index-swiper-item" style={{background:`url(${item.url})`}}>
                           <div className="web-index-swiper-modal">
                             
                           </div>
                         </div>
                       </div>
                     )
                  })
                }
              </Carousel>
            </div>
           
            {/*小轮播图*/}
            <div 
            className="web-index-swiper-main" 
                  >
               <Carousel ref="mSwiper" afterChange={(index) => this.onChange(index)}>
                  {
                    this.state.dataList.map((item,index)=>{
                       return (
                         <div key={'wm-swiper'+index}>
                           <div className="web-index-swiper-item" style={{background:`url(${item.url})`}}>
                           </div>
                         </div>
                       )
                    })
                  }
                </Carousel>

                <div 
                className="web-index-m-swiper-arrows m-swiper-arrows-left"
                onClick={() => this.changeSwiper(-1)}
                >
                  <img src="/images/leftarrow.svg" />
                </div>
                <div 
                className="web-index-m-swiper-arrows m-swiper-arrows-right"
                onClick={() => this.changeSwiper(1)}
                >
                  <img src="/images/rightarrow.svg" />
                </div>
            </div>


            <div className="web-index-bottom-gradient"></div>
          </div>

          <div className="web-body web-index-body"></div>
       </div>
     )   	
   }
}
