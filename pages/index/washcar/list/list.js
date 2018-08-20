var url = getApp().globalData.publicUrl;

Page({
  data: {
    display: 'none',
    waschcarid:'',
    layerid:0,
    areaId:'',
    windowHeight:'',
    menu: [//导航
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "区域选择",
        "key": 0
      }
    ],
    menulist: [],//城市列表
    washlist:[],
    IMgFalse: false,
  },
  page: {
    pages: 1,
    pagebuler: true
  },
  onLoad(e) {
    this.setData({ waschcarid: e.id })
    this.getdata();
  },
  onReachBottom: function () {//下拉加载更多
    if (this.page.pagebuler ){
      this.page.pages++;
      this.getdata();
    }
  },
  onPullDownRefresh: function () {//上拉刷新
    wx.showNavigationBarLoading();
    this.page.pages = 1;
    this.page.pagebuler = true
    this.getdata();
  },
  listTopclick(e){
    var menuid = e.currentTarget.dataset.id;
    if (this.data.display == 'block' ){
      this.setData({ display: 'none', menuid: 2 })
    }else{
      this.setData({ display: 'block', menuid: 0 })
    }
  },
  listToplayerLiclick(e) {
    var layerid = e.currentTarget.dataset.id;
    var areaId = e.currentTarget.dataset.areaid;
    var areaname = e.currentTarget.dataset.areaname;
    var menu = this.data.menu;
    menu[0].text = areaname;
    this.page.pages = 1;
    this.setData({ display: 'none', menuid: 2, layerid: layerid, areaId: areaId, menu: menu, })
    this.getdata();
  },
  washdetClick(e){//列表点击
    var store_id = e.currentTarget.dataset.store_id;
    var class_id = e.currentTarget.dataset.class_id;
    wx.navigateTo({
      url: '/pages/index/washcar/details/details?store_id=' + store_id + '&class_id=' + class_id,
    })
  },
  getdata(e) {
    var that = this;
    var height,address;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取内容
      url: url + 'car/store',
      data:{
        id: this.data.waschcarid,
        to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
        address: wx.getStorageSync('address_component').city,
        areaId: this.data.areaId ,
        type:1,
        sort:'2',
        page: this.page.pages*10,
        openid: wx.getStorageSync('userinfo').openid
      },
      method: 'POST',
      success: res => {
        if (res.data.code == 200 ) {
          if (res.data.data.address.length * 100 >= wx.getSystemInfoSync().windowHeight) {//计算高度
            height = wx.getSystemInfoSync().windowHeight
          } else {
            height = res.data.data.address.length * 100
          }
          address = res.data.data.address
          wx.hideToast();
          
          
          that.setData({
            menulist: address,
            windowHeight: height,
            washlist: res.data.data.store,
            IMgFalse:false
          });

          if (res.data.data.store == '') {
            if (that.page.pages == 1) {
              that.setData({ IMgFalse: true })
            }
          }

        }else{
          that.page.pagebuler = false
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 1000,
            mask: true
          })
          
          
        }
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
        
      }
    })
  },
})
