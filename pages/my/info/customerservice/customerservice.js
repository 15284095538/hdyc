var url = getApp().globalData.publicUrl;

Component({
  properties: {

  },
  data: {
    selectid:0,
    data:[],
    top:[
      '二维码',
      '客服电话'
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(e){
      this.getdata();
    },
    phoneClick(e) {
      var tel = e.currentTarget.dataset.tel;
      wx.makePhoneCall({
        phoneNumber: tel
      })
    },
    topClick(e) {
      var index = e.currentTarget.dataset.index;
      this.setData({ selectid: index })
    },
    getdata(e) {//获取数据
      var that = this;
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 55000,
        mask: true
      })
      wx.request({//获取个人信息
        url: url + 'Webset/set',
        data: {
          openid: wx.getStorageSync('userinfo').openid  
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            data:res.data.data
          }) 
          wx.hideToast();
        }
      })
  },
  
  }
})
