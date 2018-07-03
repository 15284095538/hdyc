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
      imgUrl: '',
    },
    hotecar:'',//热销
    bkcar:'',//爆款
    brand:'',//品牌
    detail:{
      gt_first:'',
      lt_first:'',
      gt_month:'',
      lt_month:'',
      brand:'',
      keywords:'',
      label:'',
    },
    detaillist:'',
  },
  onLoad() {
    this.getdata();
    this.getcarList();
  },
  getcarList(e) {//car
    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({
      url: url + 'car/detail',
      data:{
        gt_first: that.data.detail.gt_first,
        lt_first: that.data.detail.lt_first,
        gt_month: that.data.detail.gt_month,
        lt_month: that.data.detail.lt_month,
        brand: that.data.detail.brand,
        brand: that.data.detail.brand,
        keywords: that.data.detail.keywords,
        label: that.data.detail.label,
      },
      method: 'POST',
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            detaillist: res.data.data,
          })
          wx.hideToast();
        }
      }
    })
  },
  getdata(e){//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取轮播图
      url: url + 'home/lb',
      data: {
        'cate': '2'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['swiper.imgUrl']: res.data.data
        })
      }
    })
    wx.request({//获取内容
      url: url + 'car/recommend',
      method:'POST',
      success: res => {
        if( res.data.code == 200 ){
          that.setData({
            hotecar: res.data.data.rx,
            bkcar: res.data.data.bk,
            brand: res.data.data.brand,
          })
          wx.hideToast();
        }
      }
    })
  }
})