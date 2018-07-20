var url = getApp().globalData.publicUrl;

Page({
  data: {
    id:'',
  },
  page: {
    pages: 1,
  },
  onLoad(e) {
    this.setData({ id: e.id })
    this.getdata();
  },
  onReachBottom: function () {//下拉加载更多
    this.page.pages++;
    this.getdata();
  },
  onPullDownRefresh: function () {//上拉刷新
    wx.showNavigationBarLoading();
    this.page.pages = 1;
    this.getdata();
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
      url: url + 'goods/integralList',
      method: 'POST',
      data: {
        class_id: this.data.id,
        page: this.page.pages * 10,
      },
      success: function (res) {
        wx.hideToast();
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
        if( res.data.code == 200 ){
          that.setData({
            data: res.data.data
          })
        }else{
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 500,
            mask: true
          })
        }
        
      }
    })
  }
})