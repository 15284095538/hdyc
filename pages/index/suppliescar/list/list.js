var url = getApp().globalData.publicUrl;

Page({
  data: {
    selectid:0,
    menu: [],//导航
    list:[],
    category_id:'',
    scrollWidth:'',
  },
  page: {
    pages: 1,
  },
  onLoad(e) {
    console.log(e)
    this.getdata();
  },
  onReachBottom: function () {//下拉加载更多
    this.page.pages++;
    this.getdata();
  },
  onPullDownRefresh: function () {//上拉刷新
    wx.showNavigationBarLoading();
    this.page.pages = 1;
    this.getdata();
  },
  detClick(e){
    var goods_id = e.currentTarget.dataset.goods_id;
    wx.navigateTo({
      url: '/pages/index/suppliescar/details/details?goods_id=' + goods_id + '&category_id=' + this.data.category_id
    })
  },
  ChangeSelect(e){
    var selectid = e.currentTarget.dataset.id;
    var category_id = e.currentTarget.dataset.category_id;
    this.setData({ selectid: selectid, category_id: category_id })
    this.getdata();
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
      method: 'POST',
      data:{
        category_id: this.data.category_id ,
        level: wx.getStorageSync('userinfo').level,
        pages: this.page.pages,
      },
      success: function (res) {
        if (res.data.data.list.length == 0 ){
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 500,
            mask: true
          })
        }else{
          wx.hideToast();
        }
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
        that.setData({
          menu: res.data.data.category,
          list: res.data.data.list,
          scrollWidth: res.data.data.category.length * 187.5,
          category_id: res.data.data.category[0].id
        })
      }
    })
  }
})