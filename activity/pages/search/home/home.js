// pages/search/home/home.js
Page({
  data: {
    inputValue: '',
    serachList: ''
  },
  onLoad: function(options) {
    this.getSearch()
  },
  getSearch() { //展示搜索结果
    var that = this;
    var serachList = new Array();
    var searchs = wx.getStorageSync('searchs') || [];
    for (var x in searchs) {
      if (x < 5) {
        serachList.push(searchs[x])
      }
    }
    that.setData({
      serachList: serachList
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  is_define(value) { //判空
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
      this.getSearch();
      wx.navigateTo({
        url: '/activity/pages/search/list/list?keyword=' + this.data.inputValue + ''
      })
    }
  },
  clear() { //清除搜索历史
    var that = this;
    wx.setStorageSync('searchs', '')
    that.setData({
      serachList: ''
    })
  }
})