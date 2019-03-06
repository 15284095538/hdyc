var url = getApp().globalData.publicUrl;
Page({
  data: {
  },
  onLoad(options) {
    var that = this;
    var id = options.id;
    var sta = options.sta;
    var classid = options.classid;
    that.setData({
      id,
      sta,
      classid
    })
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.request(true, 'Upkeep/changeData', {
          openid: res.data.openid,
          g_category: id
        },
          'POST', res => {
            console.log(res);
            that.setData({
              list:res.data
            })
          });

      }
    })

  },
  choose: function (e) {
    var that = this;
    var classid = this.data.classid;
    if (this.data.sta) {
      var id = e.currentTarget.dataset.id;
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        newid: id,
        classid: classid,
        sta:that.data.sta
      });
        wx.navigateBack({
          delta: 1
        })
    }
  },
  request: function (loading, reurl, params, method, callBack) {
    if (loading == true) {
      wx.showToast({
        title: '加载中...',
        icon: 'loading'
      })
    }
    wx.request({
      url: url + reurl,
      data: params,
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      method: method,
      success: function (res) {
        if (loading == true) {
          wx.hideToast();
        }
        callBack(res.data);
      },
      complete: function () {
        if (loading == true) {
          wx.hideToast();
        }
      }
    })
  }
})