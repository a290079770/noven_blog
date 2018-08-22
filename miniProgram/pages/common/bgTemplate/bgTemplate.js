  function headerClick(e) {
    let _id = e.target.id;

    console.log(getCurrentPages());

    if(_id == 'headerBtnLeftCont' || _id == 'headerBtnLeft') {
      wx.navigateBack({
        delta: 1
      })
    }else if(_id == 'headerBtnRightCont' || _id == 'headerBtnRight') {
      app.goTo(app,{
        path:"/pages/index/index",
      });
    }
  }