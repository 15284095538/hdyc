var url = getApp().globalData.publicUrl;
Page({
  data: {
    IMgFalse: false,
    isAllSelect: false,
    totalMoney: 0,
    delBtnWidth: 150,
    // 商品详情介绍
    carts: [

    ],
    mycar:0,
    type:'',
    text:'',
    class_id:'',
  }, 

  //左滑操作
  //手指刚放到屏幕触发  
  touchS: function (e) {
    //判断是否只有一个触摸点  
    // console.log(e.touches[0].clientX)  
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标  
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次  
  touchM: function (e) {
    // console.log("touchM:" + e);  
    var that = this
    var index = e.currentTarget.dataset.index;
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标  
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值  
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度  
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变  
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离  
        txtStyle = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度  
          txtStyle = "margin-left:-" + delBtnWidth + "px";
        }
        var txt = disX > delBtnWidth / 2 ? "display:flex " : "display:none";
        that.data.carts[index].Style = txtStyle;
        that.data.carts[index].txtStyle = txt;
        //获取手指触摸的是哪一项  
        that.setData({
          carts: that.data.carts,
          index: index,
        })
        // console.log(that.data.carts);
      }
    }
  },
  touchE: function (e) {
    var that = this
    that.clearDelete()
    var index = e.currentTarget.dataset.index;

    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标  
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离  
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮  
      var sty = disX > delBtnWidth / 2 ? "margin-left:-" + 110 + "rpx" : "left:0px";
      var txt = disX > delBtnWidth / 2 ? "display:flex " : "display:none";
      that.data.carts[index].Style = sty;
      that.data.carts[index].txtStyle = txt;
      //获取手指触摸的是哪一项  
      that.setData({
        carts: that.data.carts,
        index: index,
      })
      // console.log(that.data.carts);
    }
  },
  clearDelete: function () { //移动其他商品时，当前商品删除none  
    for (var i = 0; i < this.data.carts.length; i++) {
      this.data.carts[i].Style = "left:0px";
      this.data.carts[i].txtStyle = "display:none";
    }
    this.setData({
      carts: this.data.carts,
    })
  },

  onLoad: function (options) {
    this.setData({ type: options.type, text: options.text, class_id: options.class_id, store_id: options.store_id })
    this.getdata();
  },
  radioChange(e){
    var that = this;
    var index = e.detail.value;
    var car = this.data.carts;
    car[index].checked = !car[index].checked;
    for(let i=0;i<car.length;i++){
      if (i != index ){
        car[i].checked = false
      }
    }
    if (car[index].checked ){
      that.getmr(car[index].id)
    }
    this.setData({ carts:car })
  },
  onShow: function () {
    this.getdata();
  },
  getdata(e) {//获取数据
    var that = this;
    var value = wx.getStorageSync('userinfo');
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取爱车信息
      url: url + 'user/myCar',
      data: {
        'openid': value.openid,
      },
      method: 'POST',
      success: function (res) {
        
        wx.hideToast();
        if(res.data.code==400){
          that.setData({
            ['mycar']: 1
          })
        }
        that.setData({
          ['carts']: res.data.data
        })
        
        
        
        
        
      }
    })

  },
  getdatadata(e) {//重复获取
    var that = this;
    var value = wx.getStorageSync('userinfo');
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取爱车信息
      url: url + 'user/myCar',
      data: {
        'openid': value.openid,
      },
      method: 'POST',
      success: function (res) {
        wx.hideToast();
        if (res.data.code == 400) {
          that.setData({
            ['mycar']: 1
          })
        }
        that.setData({
          ['carts']: res.data.data
        })
      }
    })

  },
  carClick(e) {
    
    var carid = e.currentTarget.dataset.carid;
    var is_complete = e.currentTarget.dataset.is_complete;
    

    if (this.data.type == 2) {
      wx.redirectTo({
        url: '/pages/index/spraypaint/payselect/payselect?text=' + this.data.text + '&class_id=' + this.data.class_id + '&carid=' + carid
      })
    }
    
    if (this.data.type == 3) {
wx.redirectTo({
          url: '/pages/my/info/mycar/infodata/infodata?id=' + carid + '&store_id=' + this.data.store_id + ' &class_id=' + this.data.class_id + '&carid=' + carid + '&type=' + this.data.type,
        })
    }

    this.getmr(carid)
  },
  getmr:function(id){
    var that = this;
    var value = wx.getStorageSync('userinfo');
    wx.request({//设置默认爱车
      url: url + 'user/set_default',
      data: {
        'openid': value.openid,
        'id': id,
      },
      method: 'POST',
      success: function (res) {
        that.getdatadata();
        that.onGotUserInfo();
      }
    })
  },
  deleteProd: function (e) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//删除爱车
      url: url + 'user/del_mycar',
      data: {
        'id': e.currentTarget.id,
      },
      method: 'POST',
      success: function (res) {
        
        
        wx.login({
          success: res => {
            var code = res.code;
            wx.getUserInfo({
              success: function (res) {
                wx.request({
                  url: url + 'user/myInfo',
                  method: 'post',
                  data: {
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    code: code
                  },
                  success: function (data) {
                    wx.setStorageSync('userinfo', data.data.data)
                    const index = e.currentTarget.dataset.index;
                    let carts = that.data.carts;
                    carts.splice(index, 1); // 删除购物车列表里这个商品
                    that.setData({
                      carts: carts
                    })
                    wx.hideToast();
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 500,
                      mask: true
                    })
                  }
                })
              }
            })
          }
        })

        
      }
    })
  },
  onGotUserInfo(e){
    var that = this;
    wx.login({
      success: res => {
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            wx.request({
              url: url + 'user/myInfo',
              method: 'post',
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv,
                code: code
              },
              success: function (data) {
                wx.setStorageSync('userinfo', data.data.data)
                that.setData({
                  Userinfo: false
                })
              }
            })
          }
        })
      }
    })
  }
});

