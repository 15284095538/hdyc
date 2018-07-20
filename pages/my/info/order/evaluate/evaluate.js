// pages/my/info/order/evaluate/evaluate.js
var url = getApp().globalData.publicUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    one_2: 0,
    two_2: 5,
    imgs: [],
    pingjia: '',
    postimg: ''
  },
  // 上传图片
  chooseImg: function(e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function() {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 删除图片
  deleteImg: function(e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  in_xin: function(e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
  },
  pingjia(e) { //评价
    var that = this
    that.setData({
      pingjia: e.detail.value
    })
  },
  onLoad: function(options) {
    var that = this;
    that.getdata(options.id)
  },
  getdata(id) { //获取数据
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    var that = this;
    var to = '';
    to = wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude');
    wx.request({ //获取内容
      url: url + 'lists/evaData',
      method: 'POST',
      data: {
        order_id: id,
      },
      success: res => {
        if (res.data.code == 200) {
          this.setData({
            info: res.data.data
          });
        }
        wx.hideToast();
      }
    })
  },
  upImg(num) { //上传图片
    var that = this
    var imgs = that.data.imgs
    var postimg = that.data.postimg
    console.log(that.data.postimg);
    wx.uploadFile({
      url: url + 'lists/evaluate_imgs', //仅为示例，非真实的接口地址
      filePath: imgs[num],
      name: 'path[]',
      success: function(res) {
        var data = JSON.parse(res.data)
        if (data.code == 200) {
          postimg = postimg + data.data + ','
          that.setData({
            postimg: postimg
          });
          if (imgs.length - 1 == num) {
            that.postData(1)
          }
        }
      }
    })
  },
  upData() { //提交
    var that = this
    var imgs = that.data.imgs
    if (imgs.length != 0) {
      for (var x in imgs) {
        that.upImg(x)
      }
    } else {
      that.postData(0)
    }
  },
  postData(is_img) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    var that = this;
    wx.request({ //获取内容
      url: url + 'lists/evaluate',
      method: 'POST',
      data: {
        goods_id: that.data.info.goods_id,
        openid: wx.getStorageSync('userinfo').openid,
        info: that.data.info.goods_info,
        content: that.data.pingjia,
        level: that.data.one_2,
        is_img: is_img,
        images: that.data.postimg,
        store_id: that.data.info.goods_info,
      },
      success: res => {
        if (res.data.code == 200) {
          wx.showToast({
            title: '评价成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
            wx.navigateBack()
          },1000)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
        wx.hideToast();
      }
    })
  },
  onReady: function() {

  }
})