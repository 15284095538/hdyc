var url = getApp().globalData.publicUrl;

Page({
  data: {
    swiper: {//banner图
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      indicatorcolor: '#d5d5d5',
      indicatoractivecolor: "#0084ff",
    },
    goods_id: '',
    lastX: 0,     //滑动开始x轴位置
    lastY: 0,     //滑动开始y轴位置
    currentGesture: 0, //标识手势
    isScroll: false,
    bot: false,
    details: [],
    pinglun: [],
    pingluntj: [],
    classify: '',
    selectid: 0
  },
  onLoad(options) {
    var that = this;
    var goods_id = options.goods_id;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({ openid: res.data.openid })
        console.log(res.data.openid);
        console.log(goods_id);
        
        that.request(true, 'lists/getShow', {
          openid: res.data.openid,
          gid: goods_id,
          type:'',
          level:'',
          to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
        },
          'POST', res => {
            console.log(res);
            var list = res.data.details;
            var g_details = list[0].g_details;
            var a = g_details.split('"');
            var g_detail = a[1];
            var longitude = Number(list[0].longitude);
            var latitude = Number(list[0].latitude);
            that.setData({
              list,
              g_detail,
              longitude,
              latitude
            })
        });
      }
    })
  },
  selectidCLick(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    this.setData({ selectid: id });
  },
  onReachBottom: function () {
    this.setData({ bot: true })
  },
  phoneClick(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.details.phone
    })
  },
  
  ToPage() {
    wx.navigateTo({
      url: '/pages/index/comment/comment?goods_id=' + this.data.goods_id
    })
  },
  Navigation(e) {
    console.log(Number(wx.getStorageSync('longitude')));
    var longitude = this.data.longitude;
    var latitude = this.data.latitude;
    wx.openLocation({
      latitude,
      longitude,
      name: this.data.list[0].s_address,
      scale: 28
    })
  },
  //滑动移动事件
  handletouchmove: function (event) {
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    var tx = currentX - this.data.lastX
    var ty = currentY - this.data.lastY
    var isScroll = this.data.isScroll
    var text = ""
    //左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0)
        text = "向左滑动"
      else if (tx > 0)
        text = "向右滑动"
    }
    //上下方向滑动
    else {
      if (ty < 0)
        text = "向上滑动", this.setData({ isScroll: true })
      else if (ty > 0)
        text = "向下滑动", this.setData({ isScroll: false, bot: false })
    }
    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
  },
  //滑动开始事件
  handletouchtart: function (event) {
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  //滑动结束事件
  handletouchend: function (event) {
    this.data.currentGesture = 0;
    if (this.data.isScroll && this.data.bot) {
      wx.navigateTo({
        url: '/pages/index/yhpic/yhpic?goods_id=' + this.data.goods_id
      })
      this.setData({ isScroll: false, })
    }
  },
  
  // getdata(e) {//获取数据
  //   var that = this;
  //   wx.showToast({
  //     title: '加载中',
  //     icon: 'loading',
  //     duration: 55000,
  //     mask: true
  //   })
  //   wx.request({//获取分类
  //     url: url + 'goods/goods_details',
  //     data: {
  //       goods_id: 72,
  //       level: wx.getStorageSync('userinfo').level,
  //     },
  //     method: 'POST',
  //     success: function (res) {
  //       if (res.data.code == 200) {
  //         that.setData({
  //           details: res.data.data.details[0],
  //           pinglun: res.data.data.eval,
  //           store_id: res.data.data.details[0].store_id,
  //           value_id: res.data.data.details[0].value_id
  //         })
  //         wx.hideToast();
  //       }
  //     }
  //   })
  //   wx.request({//评论统计
  //     url: url + 'Store/store_eval',
  //     data: {
  //       goods_id: this.data.goods_id,
  //       type: 2,
  //       status: '',
  //       store_id: ''
  //     },
  //     method: 'POST',
  //     success: function (res) {
  //       if (res.data.code == 200) {
  //         that.setData({
  //           pingluntj: res.data.data
  //         })
  //         wx.hideToast();
  //       }
  //     }
  //   })
  // },
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
