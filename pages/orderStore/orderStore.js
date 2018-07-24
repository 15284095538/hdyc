var url = getApp().globalData.publicUrl;

Page({
  data: {
    // display: 'none',
    // menuIndex: 0,
    // sorttext: 1,
    // cityHeight: '',
    // areaId: '',
    // menulist: [],
    // menu: [//导航
    //   {
    //     "path": "/images/xiala_normal@2x.png",
    //     "selectpath": "/images/xiala_hl@2x.png",
    //     "text": "成都市",
    //     "key": 0
    //   },
    //   {
    //     "path": "/images/xiala_normal@2x.png",
    //     "selectpath": "/images/xiala_hl@2x.png",
    //     "text": "默认排序",
    //     "key": 0
    //   }
    // ],
    // city: [],//城市列表
    // sort: [],//排序
    list: [],
    classify:'',
    goods_id: '',
    goods_type: '',
    store_id: '',
    value_id: '',
    num:'',

    store_id:'',
    count_board:'',
    count_price:'',
    class_id:'',
    price:'',
    text:'',
    phone: '',
    name: '',
  },
  page: {
    pages: 1,
    pagebuler: true
  },
  onReachBottom: function () {//下拉加载更多
    if (this.page.pagebuler) {
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
  onLoad(e) {
    if (e.goods_type == 1 ){
      this.setData({
        goods_id: e.goods_id,
        goods_type: e.goods_type,
        store_id: e.store_id,
        value_id: e.value_id,
        classify: e.classify,
        num: e.num,
        phone: e.phone,
        name: e.name,
      })
      this.getdata();
    }else{
      this.setData({ 
        classify: e.class_id,
        store_id: e.store_id,
        count_board: e.count_board,
        count_price: e.count_price,
        price: e.price,
        text: e.text,
        phone: e.phone,
        name: e.name,
      })
      this.getdata();
    }
    
  },
  detLink(e) {
    var store_id = e.currentTarget.dataset.store_id;
    wx.navigateBack();
    if (this.data.goods_type == 1 ){
      wx.redirectTo({
        url: '/pages/orderPay/orderPay?goods_id=' + this.data.goods_id + '&goods_type=' + this.data.goods_type + '&store_id=' + store_id + '&value_id=' + this.data.value_id + '&classify=' + this.data.classify + '&num=' + this.data.num + '&name=' + this.data.name + '&phone=' + this.data.phone
      })
    }else{
      wx.redirectTo({
        url: '/pages/index/spraypaint/pay/pay?store_id=' + store_id + '&&count_board=' + this.data.count_board + '&&count_price=' + this.data.count_price + '&&class_id=' + this.data.classify + '&&price=' + this.data.price + '&&text=' + this.data.text + '&name=' + this.data.name + '&phone=' + this.data.phone
      })
    }
  },
  getdata(e) {//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取分类
      url: url + 'order/selectStore',
      data: {
        to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
        class_id: this.data.classify,
        page: this.page.pages * 10,
      },
      method: 'POST',
      success: function (res) {
       
        if( res.data.code == 200 ){
          that.setData({
            list: res.data.data
          })
        }else{
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 500,
            mask: true
          })
        }
        wx.hideToast();
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      }
    })
  },
   // listTopclick(e) {//头部点击切换样式
  //   var that = this;
  //   var menuid = e.currentTarget.dataset.id;
  //   var selectkey = e.currentTarget.dataset.key;
  //   var menulist;
  //   if (menuid == 0) {
  //     menulist = that.data.city
  //   } else{
  //     menulist = that.data.sort
  //   }
  //   that.setData({
  //     menuid: menuid,
  //     display: 'block',
  //     menuIndex: menuid,
  //     layerid: selectkey,
  //     menulist: menulist,
  //   });
  // },
  // listToplayerclick(e) {//点击背景隐藏
  //   var that = this;
  //   that.setData({ display: 'none', menuid: '99' });
  // },
  // listToplayerLiclick(e) {//点击替换文字
  //   var that = this;
  //   var text = e.currentTarget.dataset.text;
  //   var key = e.currentTarget.dataset.id;
  //   var menu = that.data.menu;//获取数组
  //   menu[that.data.menuIndex].text = text;//改变值
  //   menu[that.data.menuIndex].key = key;//改变值
  //   var cityid = this.data.areaId;
  //   var sorttext = this.data.sorttext;
  //   if (that.data.menuIndex == 0) {
  //     cityid = e.currentTarget.dataset.areaid;
  //   } else{
  //     sorttext = e.currentTarget.dataset.areaid;
  //   }
  //   that.setData({ menu: menu, sorttext: sorttext, areaId: cityid, });
  //   this.getdata();
  // },
})
