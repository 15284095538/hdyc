var url = getApp().globalData.publicUrl;

Page({

  data: {
    time: {
      day: '',
      hour: '',
      minute: '',
      second: '',
    },
    data:[],
    timestamp:'',
    openid:'',
  },
  onLoad: function (options) {
    this.setData({
      timestamp: Date.parse(new Date())/1000,
      openid: options.openid,
    })
    this.getdata();
  },
  onShow(e){
    this.onLoad();
  },
  countDown(times) {//倒计时
    var that = this;
    var timer = null;
    timer = setInterval(function () {
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;//时间默认值
      if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      }
      if (day <= 9) day = '0' + day;
      if (hour <= 9) hour = '0' + hour;
      if (minute <= 9) minute = '0' + minute;
      if (second <= 9) second = '0' + second;
      that.setData({
        ['time.day']: day,
        ['time.hour']: hour,
        ['time.minute']: minute,
        ['time.second']: second,
      });
      times--;
    }, 1000);
    if (times <= 0) {
      clearInterval(timer);
    }
  },
  detClick(e){
    var id = e.currentTarget.dataset.id;
    var pid = e.currentTarget.dataset.pid;
    var status = e.currentTarget.dataset.status;
    if (this.data.data.end_time < this.data.timestamp ){
      wx.showToast({
        title: '活动结束',
        icon: 'success',
        duration: 1000,
        mask: true
      })
    } else if ( status == "无法参加" ){
      wx.showToast({
        title: '无法参加',
        icon: 'success',
        duration: 1000,
        mask: true
      })
    }else{
      wx.navigateTo({
        url: '/pages/collage/details/details?id=' + id + '&pid=' + pid,
      })
    }
  },
  getdata(e) {//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
      mask: true
    })
    wx.request({//获取分类
      url: url + 'Activity/get_list',
      data: {
        openid: this.data.openid,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            data: res.data.data
          })
          wx.hideToast();
          if (that.data.data.end_time < that.data.timestamp) {
            wx.showToast({
              title: '活动结束',
              icon: 'success',
              duration: 1000,
              mask: true
            })
          }else{
            that.countDown(Number(that.data.data.end_time) - Number(that.data.timestamp) );
          }
        }
      }
    })
  }
})