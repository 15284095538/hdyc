Page({
  data: {
    display:'none',
    menuIndex:0,
    menu: [//导航
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath":"/images/xiala_hl@2x.png",
        "text": "成都市",
        "key":0
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "全车打蜡",
        "key": 0
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "默认排序",
        "key": 0
      }
    ],
    menulist:[
      //导航列表
    ],
    city:[//城市列表
      {
        "text":"成都市"
      },
      {
        "text": "德阳"
      },
      {
        "text": "青羊"
      }
    ],
    listtype:[//类型
      {
        "text":'全车打蜡'
      },
      {
        "text": '内饰清洗'
      },
      {
        "text": '全车贴膜'
      },
      {
        "text": '全车镀晶'
      }
    ],
    sort:[//排序
      {
        "text":"默认排序"
      },
      {
        "text": "附近优先"
      },
      {
        "text": "评分最高"
      }
    ]
  },
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    })
  },
  onLoad() {

  },
  listTopclick(e){//头部点击切换样式
    var that = this;
    var menuid = e.currentTarget.dataset.id;
    var selectkey = e.currentTarget.dataset.key;
    that.setData({
      menuid: menuid,
      display:'block',
      menuIndex: menuid,
    });
    if (menuid == 0 ){
      that.setData({ menulist: that.data.city });
    } else if (menuid == 1 ){
      that.setData({ menulist: that.data.listtype });
    }else{
      that.setData({ menulist: that.data.sort });
    }
    that.setData({ layerid: selectkey});
  },
  listToplayerclick(e){//点击背景隐藏
    var that = this;
    that.setData({ display: 'none', menuid:'99' });
  },
  listToplayerLiclick(e){//点击替换文字
    var that = this;
    var text = e.currentTarget.dataset.text;
    var key = e.currentTarget.dataset.id;
    var menu = that.data.menu;//获取数组
    menu[that.data.menuIndex].text = text;//改变值
    menu[that.data.menuIndex].key = key;//改变值
    that.setData({ menu });
  }
})
