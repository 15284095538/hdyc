var url = getApp().globalData.publicUrl;

Page({
  data: {
    display: 'none',
    winHeight:'',
    menuid: 99,
    levelid:0,
    menu: [ //导航
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "品牌"
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "价格"
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "级别"
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "更多"
      }
    ],
    menulist: [
      //导航列表
    ],
    detail: {
      gt_first: '',
      lt_first: '',
      gt_month: '',
      lt_month: '',
      brand: '',
      keywords: '',
      label: '',
      gt_guide: '',
      lt_guide: '',
      car_type: '不限',
    },
    brand: '', //品牌,
    price: { //价格
      first_pay: '',
      month_pay: '',
      guide_price: ''
    },
    priceindex:{
      first_payindex:99,
      month_payindex:99,
      guide_priceindex:99,
    },
    level: [], //级别
    more: [], //更多
    listCon:[]
  },
  onLoad() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
    this.getdata();
    this.getlist();
  },
  page: {
    pages: 1,
  },
  onReachBottom: function () {//下拉加载更多
    this.page.pages++;
    this.getlist();
  },
  onPullDownRefresh: function () {//上拉刷新
    wx.showNavigationBarLoading();
    this.page.pages = 1;
    this.getlist();
  },
  first_payclick(e){
    var gt_first = e.currentTarget.dataset.gt_first;
    var lt_first = e.currentTarget.dataset.lt_first;
    var first_payindex = e.currentTarget.dataset.index;
    this.setData({
      ["detail.gt_first"]: gt_first,
      ["detail.lt_first"]: lt_first,
      ["priceindex.first_payindex"]: first_payindex,
    })
  },
  month_payclick(e){
    var gt_month = e.currentTarget.dataset.gt_month;
    var lt_month = e.currentTarget.dataset.lt_month;
    var month_payindex = e.currentTarget.dataset.index;
    this.setData({
      ["detail.gt_month"]: gt_month,
      ["detail.lt_month"]: lt_month,
      ["priceindex.month_payindex"]: month_payindex,
    })
  },
  guide_priceclick(e){
    var gt_guide = e.currentTarget.dataset.gt_guide;
    var lt_guide = e.currentTarget.dataset.lt_guide;
    var guide_priceindex = e.currentTarget.dataset.index;
    this.setData({
      ["detail.gt_guide"]: gt_guide,
      ["detail.lt_guide"]: lt_guide,
      ["priceindex.guide_priceindex"]: guide_priceindex,
    })
  },
  pricereset(e){
    this.setData({
      ["detail.gt_first"]: '',
      ["detail.lt_first"]: '',
      ["priceindex.first_payindex"]: 99,
      ["detail.gt_month"]: '',
      ["detail.lt_month"]: '',
      ["priceindex.month_payindex"]: 99,
      ["detail.gt_guide"]: '',
      ["detail.lt_guide"]: '',
      ["priceindex.guide_priceindex"]: 99,
    })
  },
  listTopclick(e) { //头部点击切换样式
    var that = this;
    var menuid = e.currentTarget.dataset.id;
    var menulist;
    if (menuid == 0) {
      menulist = that.data.brand
    } else if (menuid == 1) {
      menulist = that.data.price
    } else if( menuid == 2 ) {
      menulist = that.data.level
    }else{
      menulist = that.data.more
    }
    that.setData({
      menuid: menuid,
      display: 'block',
      menulist: menulist
    });
  },
  layerNone(e) {//点击背景隐藏
    var that = this;
    that.setData({ display: 'none' });
  },
  brandclick(e){ //品牌点击
    var brandid = e.currentTarget.dataset.brandid;
    this.setData({ ["detail.brand"]: brandid, });
    this.page.pages = 1;
    this.getlist();
    this.layerNone();
  },
  levelclick(e){ // 级别点击
    var index = e.currentTarget.dataset.index;
    var title = e.currentTarget.dataset.title;
    this.setData({ levelid: index, ["detail.car_type"]: title, });
    this.getlist();
    this.page.pages = 1;
    this.layerNone();
  },
  screenclick(e){//筛选
    var that = this;
    var id = e.currentTarget.dataset.id;
    var menulist = e.currentTarget.dataset.menulist;
    var label = e.currentTarget.dataset.label;
    var data = that.data.more;
    var arry = data[menulist].children;
    var array = new Array();
    for (let i = 0; i < arry.length; i++) {
      if (id == i) {
        arry[i].key = !arry[i].key
      }
    }
    for (let i = 0; i < data.length; i++) {
      for (let x = 0; x < data[i].children.length; x++) {
        if ( data[i].children[x].key ){
          array.push(data[i].children[x].id)
        }
      }
    }
    var label = array.join(",");//转化为字符串
    that.setData({ menulist: data, ["detail.label"]: label, })
  },
  morereset(e){ //重置
    var that = this;
    var data = that.data.more;
    for (let i = 0; i < data.length; i++ ){
      for (let x = 0; x < data[i].children.length; x++ ){
        data[i].children[x].key = false
      }
    }
    that.setData({ menulist: data, ["detail.label"]: '', })
  },
  moreconfirm(e){
    this.getlist();
    this.page.pages = 1;
    this.layerNone();
  },
  pricereset(e){
    this.setData({
      ["priceindex.first_payindex"]:99,
      ["priceindex.month_payindex"]: 99,
      ["priceindex.guide_priceindex"]: 99,
      ["detail.gt_first"]:'',
      ["detail.lt_first"]: '',
      ["detail.gt_month"]: '',
      ["detail.lt_month"]: '',
      ["detail.gt_guide"]: '',
      ["detail.lt_guide"]: '',
    })
  },
  priceconfirm(e){
    this.getlist();
    this.page.pages = 1;
    this.layerNone();
  },
  detlisclick(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/buycar/details/details?id=' + id,
    })
  },
  getdata(e){
    var that = this;
    wx.request({//获取内容
      url: url + 'car/cond',
      method: 'POST',
      success: res => {
        //console.log( res )
        if (res.data.code == 200) {
          that.setData({
            brand: res.data.data.car,
            ["price.first_pay"]: res.data.data.first_pay,
            ["price.month_pay"]: res.data.data.month_pay,
            ["price.guide_price"]: res.data.data.guide_price,
            level: res.data.data.car_type,
            more: res.data.data.more,
          })
        }
      }
    })
  },
  getlist(e){
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取内容
      url: url + 'car/detail',
      method: 'POST',
      data:{
        gt_first: that.data.detail.gt_first,
        lt_first: that.data.detail.lt_first,
        gt_month: that.data.detail.gt_month,
        lt_month: that.data.detail.lt_month,
        brand: that.data.detail.brand,
        keywords: that.data.detail.keywords,
        label: that.data.detail.label,
        gt_guide: that.data.detail.gt_guide,
        lt_guide: that.data.detail.lt_guide,
        car_type: that.data.detail.car_type,
        pages: that.page.pages,
      },
      success: res => {
        // console.log( res )
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
        if (res.data.code == 200) {
          that.setData({
            listCon: res.data.data,
          })
          wx.hideToast();
        } else if (res.data.code == 400) {
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  }
})