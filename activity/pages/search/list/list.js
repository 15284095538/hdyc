var url = getApp().globalData.publicUrl;

Page({
  data: {
    inputValue: '',
    list:[],
  },
  page: {
    pages: 1,
    pagebuler: true
  },
  onReachBottom: function () {//下拉加载更多
    if (this.page.pagebuler) {
      this.page.pages++;
      this.getdata();
    }
  },
  onPullDownRefresh: function () {//上拉刷新
    wx.showNavigationBarLoading();
    this.page.pages = 1;
    this.page.pagebuler = true
    this.getdata();
  },
  cypClick(e) {
    var goods_id = e.currentTarget.dataset.goods_id;
    var category_id = e.currentTarget.dataset.category_id;
    wx.navigateTo({
      url: '/pages/index/suppliescar/details/details?goods_id=' + goods_id + '&category_id=' + category_id
    })
  },
  onLoad: function(options) {
    var that = this;
    that.setData({
      inputValue: options.keyword
    })
    this.getdata();
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  is_define(value) {
    if (value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == "(null)" || value == 'NULL' || typeof(value) == 'undefined') {
      return false;
    } else {
      value = value + "";
      value = value.replace(/\s/g, "");
      if (value == "") {
        return false;
      }
      return true;
    }
  },
  searchStorage() { // 储存搜索历史
    if (this.is_define(this.data.inputValue)) {
      var searchs = wx.getStorageSync('searchs') || []
      searchs.unshift(this.data.inputValue)
      wx.setStorageSync('searchs', searchs)
    }
  },
  getdata(e) {//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取分类
      url: url + 'goods/goods_list',
      data: {
        level: wx.getStorageSync('userinfo').level,
        pages: this.page.pages,
        keyword: this.data.inputValue,
        category_id:'',
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          wx.hideToast();
          that.setData({
            list: res.data.data.list
          })
        }else{
          that.page.pagebuler = false
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
  }
})