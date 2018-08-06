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
    timestamp:'',
    bgCOolo:'none',
    Userinfo: true,
    getuserinfo: true,
    yqo: true,
  },
  onLoad: function (options) {
    var openid;
    if ( !wx.getStorageSync('userinfo').openid){
      openid = ''
    }else{
      openid = wx.getStorageSync('userinfo').openid
    }
    this.setData({ group_id: options.id, pid: options.pid, openid: openid, timestamp: Date.parse(new Date()) / 1000 });
    this.getdata();
    this.onGoUserinfoSetting();
    if( options.pid == 0 ){
      this.setData({ yqo: false })
    }
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
    return {
      title: this.data.date.total_money + '元现金' + this.data.date.peoples + '人瓜分',
      imageUrl: this.data.date.img,
      path: '/pages/collage/details/details?pid=' + this.data.pid + '&id=' + this.data.group_id
    }
  },
  onGotUserInfo(e) {//用户授权
    var that = this;
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
                that.setData({
                  Userinfo: false,
                  openid: data.data.data.openid
                })
                that.onLoad();
              }
            })
          }
        })
      }
    })
  },
  indexClick(e){
    wx.switchTab({
      url: '/pages/index/home/index'
    })
  },
  onGoUserinfoSetting(e) {//授权判断
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            Userinfo: false
          })
        }
      }
    })
  },
  join(e){
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
      mask: true
    })
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
            title: '成功',
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
        if (that.data.pid != 0) {
          that.setData({ yqo: true })
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
        }
        if ( res.data.data.status == '拼团成功' ){
          that.setData({ bgCOolo: 'block', yqo: false, getuserinfo: false })
        }
        if (that.data.timestamp > that.data.date.end_time ){
          wx.hideShareMenu();
          wx.showToast({
            title: '活动结束',
            icon: 'success',
            duration: 1000,
            mask: true
          })
          that.setData({ yqo: false, getuserinfo:false })
        }else{
          that.countDown(res.data.data.end_time - that.data.timestamp);
        }
      }
    })
  }
})