var WxParse = require('../../../lib/wxParse/wxParse.js');
var app = getApp();

Page({
  data: {
    article:'',
    hasView: wx.getStorageSync('hasView'),   // 0 - 否    1 - 是
    sysType:48
  },
  onLoad: function () {
    //获取用户是否第一次进入这个页面
    WxParse.wxParse('article', 'html', `<p>当代男人不容易，除了买房带娃养媳妇，还得每个月定时供着家里的那台车。买车容易养车难，不管你开车与否，它都会每个月要吃掉你不少心血，无论是加油还是维护零件老化。所以在用车后期，一辆车的维护成本问题也事关重要。<br></p><p>由此，一家美国媒体YourMechanic根据大量用户数据得出了使用十年的情况下，评出了在美维护成本最低的10款车，其中就有六款目前在国内也在；两款曾经有销售但已停产。一起来看看。</p><p><strong>第十名：起亚 Optima</strong></p><p><strong>10年维护成本：6400美元</strong></p><p><img class="" src="http://img.dadashunfengche.com/carowner/2018/08/21/3591f995eba7d95ae6686dfbff1d469c2d910820.jpeg"></p><p>起亚Optima即国内的东风悦达起亚K5，自2016、2017款更新后目前暂无大的动作。但这款B级车凭借着其运动时尚的韩系风在美国市场却极受欢迎，热度甚至远高于国内的K5。不过，此Optima非彼K5，虽然基因相同，但是起亚对待美国市场的态度显然不同于中国，Optima在美的质量和做工都十分优秀。在去年公布的J.D.Power北美新车质量调查上，起亚就以83分的成绩（分数越小质量越好）成功夺冠。</p><p><strong>第九名：Scion xB</strong></p><p><strong>10年维护成本：6300美元</strong></p><p><img class="img_loading" src="http://img.dadashunfengche.com/carowner/2018/08/21/8e9f8ba699e859ebe1adfc9790dc7c79269b6b2b.jpeg"></p><p>Scion xB是丰田为北美市场打造的一款K-car，在国内暂不发售。它继承了丰田一贯求质求稳的风格，价格实惠空间表现也不错，更重要的是它省油耐造，维修保养成本也够低。只不过丰田还是高估了北美对于K-car文化的喜爱程度，虽然欧洲较多地区钟爱小车，但K-car仍然不太讨喜，Scion xB也于2016年走向了停产。</p><p><strong>第八名：丰田 雅力士</strong></p><p><strong>10年维护成本：6100美元</strong></p><p><img class="img_loading" src="http://img.dadashunfengche.com/carowner/2018/08/21/a48392179af1e9de266735701de432bdf959956a.jpeg"></p><p>丰田雅力士如果放到国内，应该就是致炫和威驰的姊妹车型，类似的平台，类似的技术，不同的是美国市场减配没有那么严重罢了。而肩负着丰田家族销量走量的小型轿车，雅力士的低维护成本完全来源于其轻量化的设计和成熟的老技术，且随着TNGA计划的扩张，未来的雅士力（包括国内致炫、威驰）在这方面将会更具优势。</p><p><strong>第七名：日产 Versa</strong></p><p><strong>10年维护成本：5900美元</strong></p><p><img class="img_loading" src="http://img.dadashunfengche.com/carowner/2018/08/21/24e4fb44e9dfa2cedb6c8672621e7a472a7062d4.jpeg"></p><p>日产Versa即国内的东风日产阳光，这款车无论是在国内市场，还是在北美市场都有一定的地位，且同样的尿性——迟迟未更新。不过这个调查是以10年养护成本为基准的，所以老旧的阳光在以前的优势还是很明显的。不过近年来，随着新骐达和新轩逸的“新陈代谢”，老阳光的压力开始与日俱增，再无大的变化，即便再省也难以坐吃老本。</p><p><strong>第六名：丰田塔科马</strong></p><p><strong>10年维护成本：5800美元</strong></p><p><img class="img_loading" src="http://img.dadashunfengche.com/carowner/2018/08/21/52e313b13874ed90caa705f8d6703864c627c4c8.jpeg"></p><p>丰田塔科马是榜上唯一的一款皮卡车型。对于皮卡文化尤为钟爱的美国，塔科马也是颇受欢迎，它比美国常见的F-150要小一些，且作风就跟铃木吉姆尼一样，不到十年以上坚决不换代！而又凭借着比常规皮卡更低廉的维护成本，让老美对它又爱又恨。</p><p><strong>第五名：丰田 凯美瑞</strong></p><p><strong>10年维护成本：5700美元</strong></p><p><img class="img_loading" src="http://img.dadashunfengche.com/carowner/2018/08/21/9357c972b69df8b2352942dc188dd77f806c31a4.jpeg"></p><p>凯美瑞作为丰田最引以为傲走量B级车之一，它的维护成本之低以及口碑之高早已不是一两天的事了，换代后的凯美瑞作为首批TNGA架构的产物，内外颜值上有了革新的变化。且在更新更精尖的平台和技术加持下，新凯美瑞未来的维护成本还有可能还会再往下降。</p><p><strong>第四名：本田 飞度</strong></p><p><strong>10年维护成本：5500美元</strong></p><p><img class="img_loading" src="http://img.dadashunfengche.com/carowner/2018/08/21/3f75cdafac8ff904fc0897124238b63ecdd00da0.jpeg"></p><p>无论是国内还是国外，小飞度始终都是最受年轻一代喜爱的一款平民小车之一。国内以及其本国人喜欢它，是喜欢它那动力相对强劲的“地球”发动机与“魔术”车座椅，以及酷炫的外观和巨大的改装潜质。而北美消费者喜欢它，就只是单纯的因为，它省。</p><p><strong>第三名：丰田卡罗拉</strong></p><p><strong>10年维护成本：5200美元</strong></p><p><img class="img_loading" src="http://img.dadashunfengche.com/carowner/2018/08/21/4dac3c690563a11775c7d67ebe9e255e7cd10de7.jpeg"></p><p>卡罗拉作为全球销最畅销的车型，每年的销量就已经证明了它的实力与品质。其实卡罗拉也没有什么特殊的地方，唯一的优势就是省心省事，耐用耐造小毛病还少，且双擎版的混动车型价位也没有过于激高，出门一趟甚至比坐公交还省。</p><p>不过，建议喜欢卡罗拉的老铁可以等等，新款卡罗拉改款在即，颜值和做工都颇有改观，一款小“凯美瑞”即将到达~</p><p><strong>第二名：起亚 秀尔</strong></p><p><strong>10年维护成本：4700美元</strong></p><p><img class="img_loading" src="http://img.dadashunfengche.com/carowner/2018/08/21/7de7f8a27d805f53f151851aad7419e70ee9a0ea.jpeg"></p><p>起亚秀尔可以看做是起亚对于日本K-car文化追崇出来的产物，在国内市场也曾经销售过一段时间，但显然这样的“小盒子”文化不适合中国，没到两年就在国内草草了事（停产）了。而在北美市场，这样的K-car风格同样不讨喜，不过秀尔算是比较另类的，且空间够大、维修保养还便宜，所以销量还是十分可观的。</p><p><strong>第一名：丰田 普锐斯</strong></p><p><strong>10年维护成本：4300美元</strong></p><p><img class="img_loading" src="http://img.dadashunfengche.com/carowner/2018/08/21/1da2deebe752b09f52b9931ab18af8158555825e.jpeg"></p><p>作为开启混动时代的首款车，普锐斯成功的拿下了维护成本最低的冠军宝座，在北美市场经常供不应求；而反观国内，普锐斯来的时间似乎不太对，新能源车刚刚起步，人们接受的程度不高，且定价过高在当时又无太多的补贴政策支持，导致销量十分惨淡，很快便在中国销声匿迹了。</p><p><span style="font-size: 14px; color: rgb(191, 191, 191);">本文来源于网络</span></p>`, this,5);
    this.setData({
      sysType:app.globalData.sysType
    })
  },


  headerClick(e) {
    let _id = e.target.id;

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



})
