Page({
  data: {
    display: 'none',
    layerid:0,
    menu: [//导航
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "区域选择",
        "key": 0
      }
    ],
    menulist: [//城市列表
      {
        "text": "成都市"
      },
      {
        "text": "德阳"
      },
      {
        "text": "青羊"
      }
    ],
  },
  onReady: function () {
    
  },
  onLoad() {

  },
  listTopclick(e){
    var menuid = e.currentTarget.dataset.id;
    this.setData({ display: 'block', menuid: 0 })
  },
  listToplayerLiclick(e){
    this.setData({ display: 'none', menuid: 2 })
  }
})
