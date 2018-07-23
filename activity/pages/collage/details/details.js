var url = getApp().globalData.publicUrl;


Page({
  data: {
    time: {
      day: '',
      hour: '',
      minute: '',
      second: '',
    },
    date:[],
    pid:0,
    group_id:'',
    openid:'',
  },
  onLoad: function (options) {
    var pid, openid;
    if (options.pid == ''){
      pid = 0
    }else{
      pid = options.pid
    }
    if ( !wx.getStorageSync('userinfo').openid){
      openid = ''
    }else{
      openid = wx.getStorageSync('userinfo').openid
    }

    this.setData({ group_id: options.id, pid: pid, openid: openid });
    this.getdata();
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
  onShareAppMessage(e){
    var path = '/activity/pages/collage/details/details?pid=' + this.data.pid + '&group_id=' + this.data.group_id
    console.log(path)
    return {
      title: this.data.date.total_money + '元现金' + this.data.date.peoples + '人瓜分',
      imageUrl: this.data.date.img,
      path: '/activity/pages/collage/details/details?pid=' + this.data.pid + '&id=' + this.data.group_id
    }
  },
  onGotUserInfo(e){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']){
          wx.login({
            success: res => {
              var code = res.code;
              wx.getUserInfo({
                success: function (res) {
                  wx.request({
                    url: url + 'user/myInfo',
                    method: 'post',
                    data: {
                      encryptedData: res.encryptedData,
                      iv: res.iv,
                      code: code
                    },
                    success: function (data) {
                      wx.setStorageSync('userinfo', data.data.data)
                      that.join();
                    }
                  })
                }
              })
            }
          })
        }else{
          that.join();
        }
      }
    })
  },
  join(e){
    var that = this;
    wx.request({//获取分类
      url: url + 'Activity/set_act',
      data: {
        group_id: this.data.group_id,
        pid: this.data.pid,
        openid: this.data.openid,
        end_time: this.data.date.end_time
      },
      method: 'POST',
      success: function (res) {
        if( res.data.code == 200 ){
          wx.showToast({
            title: '开团成功',
            icon: 'success',
            duration: 500,
            mask: true
          })
          that.setData({ pid: res.data.data.pid })
          that.getdata();
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 500,
            mask: true
          })
        }
        
        
      }
    })
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
      url: url + 'Activity/act_invite',
      data: {
        group_id: this.data.group_id,
        pid: this.data.pid,
        openid: this.data.openid,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            date: res.data.data
          })
          wx.hideToast();
          wx.hideShareMenu();//取消分享显示
          that.countDown(res.data.data.end_time - res.data.data.start_time);
        }
      }
    })
  }
})