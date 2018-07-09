var url = getApp().globalData.publicUrl;

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
    menulist: [],//城市列表
  },
  onLoad(e) {
    console.log( e )
    //this.getdata();
  },
  listTopclick(e){
    var menuid = e.currentTarget.dataset.id;
    this.setData({ display: 'block', menuid: 0 })
  },
  listToplayerLiclick(e){
    this.setData({ display: 'none', menuid: 2 })
  },
  getdata(e) {
    var that = this;
    wx.request({//获取内容
      url: url + 'car/store',
      data:{
        id:'',
        to: '' + ',' + '',
        address:'',
        areaId:'',
      },
      method: 'POST',
      success: res => {
        //console.log( res )
        if (res.data.code == 200) {
          
        }
      }
    })
  },
})
