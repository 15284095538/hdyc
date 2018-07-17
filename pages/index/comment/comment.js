var url = getApp().globalData.publicUrl;

Page({
  data: {
    Topnum: 1,
    goods_id: '',
    allpinglun: [],
    xhpinlun: [],
  },
  page: {
    pages: 1,
  },
  onLoad: function (e) {
    console.log( e )
    this.setData({ goods_id: e.goods_id, })
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
    var list = this.data.allpinglun.list;
    var data = [];
    if (num == 1) {
      data = this.data.allpinglun.list
    } else if (num == 2) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].images.length !== 0) {
          data.push(list[i])
        }
      }
    } else if (num == 3) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].level == 3) {
          data.push(list[i])
        }
      }
    } else if (num == 4) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].level == 2) {
          data.push(list[i])
        }
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        if (list[i].level == 1) {
          data.push(list[i])
        }
      }
    }
    this.setData({
      Topnum: num,
      xhpinlun: data,
    });
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
        store_id: '',
        type: this.page.pages * 10,
        goods_id: this.data.goods_id,
        status: '',
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
        } else {
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