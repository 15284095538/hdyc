var url = getApp().globalData.publicUrl;

Page({
  data: {
    Topnum:1,
    store_id:'',
    allpinglun: [],
    xhpinlun:[],
  }, 
  onLoad: function (e) {
    this.setData({ store_id: e.store_id, })
    this.getstoreeval();
  },
  click: function (e) {
    var num = e.target.dataset.num;
    var list = this.data.allpinglun.list;
    var data = [];
    if ( num == 1 ){
      data = this.data.allpinglun.list
    }else if( num == 2 ){
      for (let i = 0; i < list.length; i++){
        if ( list[i].images.length !== 0 ){
          data.push(list[i])
        }
      }
    }else if( num == 3 ){
      for (let i = 0; i < list.length; i++) {
        if (list[i].level == 3) {
          data.push(list[i])
        }
      }
    }else if( num == 4 ){
      for (let i = 0; i < list.length; i++) {
        if (list[i].level == 2) {
          data.push(list[i])
        }
      }
    }else{
      for (let i = 0; i < list.length; i++) {
        if (list[i].level == 1) {
          data.push(list[i])
        }
      }
    }
    this.setData({
      Topnum: num,
      xhpinlun: data,
    });
  },
  getstoreeval(e) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取内容
      url: url + 'Store/store_eval',
      data: {
        store_id: this.data.store_id,
        type: -1,
        goods_id: '',
        status: '',
      },
      method: 'POST',
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            allpinglun: res.data.data,
            xhpinlun: res.data.data.list
          })
        }
        wx.hideToast();
      }
    })
  },
})