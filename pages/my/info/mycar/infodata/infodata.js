var dateTimePicker = require('../../../../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scdate: '请选择生产年份',
    gmdate:'请选择购买年份',
    cartypeTetx:'请选择车型',
    cartype:'',
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050,
    array:[
      '小',
      '大'
    ],
    carid:'',
    pl:'',
    lc:'',
    sy:'',
  },

  onLoad: function (options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
  },
  changescDate(e) {
    this.setData({ scdate: e.detail.value });
  },
  changegmDate(e) {
    this.setData({ gmdate: e.detail.value });
  },
  carTypeChang(e){
    var text;
    if (e.detail.value==0){
      text = '小'
    }else{
      text = '大'
    }
    this.setData({ cartype: e.detail.value, cartypeTetx:text });
  },
  carid(e){
    this.setData({ carid: e.detail.value });
  },
  pl(e) {
    this.setData({ pl: e.detail.value });
  },
  lc(e) {
    this.setData({ lc: e.detail.value });
  },
  sy(e) {
    this.setData({ sy: e.detail.value });
  },
  baocunClick(e){

    if (this.data.carid == '' ){
      wx.showToast({
        title: '请输入车牌号',
        icon: 'success',
        duration: 500,
        mask: true
      })
      return false
    }
    if (this.data.cartype == '') {
      wx.showToast({
        title: '请选择车型',
        icon: 'success',
        duration: 500,
        mask: true
      })
      return false
    }
    if (this.data.pl == '') {
      wx.showToast({
        title: '请选择排量',
        icon: 'success',
        duration: 500,
        mask: true
      })
      return false
    }
    if (this.data.lc == '') {
      wx.showToast({
        title: '请输入行驶里程',
        icon: 'success',
        duration: 500,
        mask: true
      })
      return false
    }
    if (this.data.scdate == '请选择生产年份') {
      wx.showToast({
        title: '请选择生产年份',
        icon: 'success',
        duration: 500,
        mask: true
      })
      return false
    }
    if (this.data.gmdate == '请选择购买年份') {
      wx.showToast({
        title: '请选择购买年份',
        icon: 'success',
        duration: 500,
        mask: true
      })
      return false
    }
    if (this.data.sy == '') {
      wx.showToast({
        title: '请输入使用年限',
        icon: 'success',
        duration: 500,
        mask: true
      })
      return false
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55500,
      mask: true
    })
    wx.request({//添加车辆
      url: url + 'user/set_lovecar',
      data: {
        'car_type': carid,
      },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 500,
          mask: true
        })
        wx.navigateBack();
      }
    })
  }
})