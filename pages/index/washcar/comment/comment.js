var url = getApp().globalData.publicUrl;

Page({
  data: {
    Topnum:1,
    store_id:'',
    allpinglun: [],
    xhpinlun:[],
    status:'',
  }, 
  page: {
    pages: 1,
  },
  onLoad: function (e) {
    this.setData({ store_id: e.store_id, goods_id: e.goods_id })
    this.getstoreeval();
  },
  onReachBottom: function () {//下拉加载更多
    this.page.pages++;
    this.getstoreeval();
  },
  onPullDownRefresh: function () {//上拉刷新
    wx.showNavigationBarLoading();
    this.page.pages = 1;
    this.getstoreeval();
  },
  click: function (e) {
    var num = e.target.dataset.num;
    var status;
    if ( num == 1 ){
      status = ''
    }else if( num == 2 ){
      status = 4
    }else if( num == 3 ){
      status = 3
    }else if( num == 4 ){
      status = 2
    }else{
      status = 1
    }
    this.setData({
      Topnum: num,
      status: status,
      type: 10
    });
    this.getstoreeval();
  },
  getstoreeval(e) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取内容
      url: url + 'Store/store_eval',
      data: {
        store_id: this.data.store_id,
        type: this.page.pages * 10,
        goods_id: this.data.goods_id,
        status: this.data.status,
      },
      method: 'POST',
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            allpinglun: res.data.data,
            xhpinlun: res.data.data.list
          });
          wx.hideToast();
        }else{
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 500,
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