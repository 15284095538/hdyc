// pages/search/home/home.js
Page({
  data: {

  },
  onLoad: function(options) {

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
  }
})