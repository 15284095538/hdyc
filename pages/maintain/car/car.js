var url = getApp().globalData.publicUrl;
Page({
  data: {
    list: [
      // {
      //   'car_brand':'一汽-大众奥迪-奥迪A3',
      //   'is_default': 0,
      //   'info': '2018新款Sportback 35TFSI进取型',
      //   'image':'car.png',
      //   'id':'329',
      //   'checked': false
      // },
      // {
      //   'car_brand': '陆丰-X7',
      //   'is_default': 1,
      //   'info': '2018新款Sportback 35TFSI进取型',
      //   'image': 'car.png',
      //   'id': '9',
      //   'checked': true
      // },
      // {
      //   'car_brand': '众泰-SR9',
      //   'is_default': 0,
      //   'info': '2018新款Sportback 35TFSI进取型',
      //   'image': 'car.png',
      //   'id': '4',
      //   'checked':false
      // },
    ],
    default: '',
    sta: '',
    tapindex:''
  },
  onShow:function(){
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.request(true, 'user/myCar', {
          openid: res.data.openid,
        },
          'POST', res => {
            //console.log(res);
            var list = res.data;
            for (var i = 0; i < list.length; i++) {
              if (list[i].is_default == 1) {
                list[i].default = '默认';
              }
            }
            that.setData({
              list
            })
          });
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    var icarsta = options.carsta;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({openid: res.data.openid})
        that.request(true, 'user/myCar', {
          openid: res.data.openid,
        },
          'POST', res => {
            console.log(res);
            var list = res.data;
            for(var i=0;i<list.length;i++){
              if(list[i].is_default == 1){
                list[i].default = '默认';
              }
            }
            that.setData({
              list, icarsta
            })
        });
      }
    })
  },
  addCar(e){
    wx.navigateTo({
      url: '/pages/my/info/mycar/addcar/addcar?mycar=0',
    })
  },
  choose: function (e) {
    var that = this;
      var list = this.data.list;
      var index = e.currentTarget.dataset.index;
      var carId = e.currentTarget.dataset.id;
      var car_type = e.currentTarget.dataset.car_type; 
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      prevPage.setData({
        carId,
        car_type,
        icarsta:that.data.icarsta
      });
      for(var i=0;i<list.length;i++){
        list[i].checked = false;
      }
      list[index].checked = true;
      this.setData({list})
    that.request(true, 'user/set_default', {
      openid: that.data.openid,
      id: carId
    },
      'POST', res => {
        if(res.msg == 'success'){
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 200)
        }
      });
      
      
  },

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
  },
})