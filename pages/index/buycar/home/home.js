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
    first_pay:'',//首付
    month_pay:'',//月付
    detail:{
      gt_first:'',
      lt_first:'',
      gt_month:'',
      lt_month:'',
      brand:'',
      keywords:'',
      label:'',
      gt_guide:'',
      lt_guide:'',
      car_type:'不限',
    },
    detaillist:'',
  },
  page: {
    pages: 1,
  },
  onLoad() {
    this.getdata();
    this.getcarList();
  },
  urllink(e){
    wx.navigateTo({
      url: '/pages/index/buycar/list/list'
    })
  },
  cardetils(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/buycar/details/details?id='+ id,
    })
  },
  first_pay(e){
    var gt_first = e.currentTarget.dataset.gt_first;
    var lt_first = e.currentTarget.dataset.lt_first;
    this.setData({
      ['detail.gt_first']: gt_first,
      ['detail.lt_first']: lt_first,
    })
    this.getcarList();
  },
  month_pay(e){
    var gt_month = e.currentTarget.dataset.gt_month;
    var lt_month = e.currentTarget.dataset.lt_month;
    this.setData({
      ['detail.gt_month']: gt_month,
      ['detail.lt_month']: lt_month,
    })
    this.getcarList();
  },
  brand(e){
    var brand = e.currentTarget.dataset.brand;
    this.setData({
      ['detail.brand']: brand,
    })
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
        gt_guide: that.data.detail.gt_guide,
        lt_guide: that.data.detail.lt_guide,
        car_type: that.data.detail.car_type,
        pages: that.page.pages,
      },
      method: 'POST',
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            detaillist: res.data.data,
          })
          wx.hideToast();
        }else if( res.data.code == 400 ) {
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 1000,
            mask: true
          })
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
            first_pay: res.data.data.first_pay,
            month_pay: res.data.data.month_pay,
          })
          wx.hideToast();
        }
      }
    })
  }
})