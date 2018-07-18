// pages/my/info/mycar/addcar/addcar.js
var url = getApp().globalData.publicUrl;
Page({
  data: {
    winHeight:'',
    display:'none',
    fid:'',
    mycar:'',
    // 当前选择的导航字母
    selected: 0,
    // 选择字母视图滚动的位置id
    scrollIntoView: 'A',
    // 导航字母
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'],
    groups: [

    ],
    menulist: [

    ],
  },
  //添加爱车
   addcar:function(e){
     
     var carid = this.data.fid + ',' + e.currentTarget.dataset.index + ',' + e.currentTarget.id;
     var value = wx.getStorageSync('userinfo');
     wx.showToast({
       title: '加载中',
       icon: 'loading',
       duration: 55000,
       mask: true
     })
     wx.request({//添加车辆
       url: url + 'user/set_lovecar',
       data: {
         'car_type': carid,
         'openid': value.openid,
        'is_default':this.data.mycar,
       },
       method: 'POST',
       success: function (res) {
         wx.hideToast();
         wx.showToast({
           title: '添加成功',
           icon: 'success',
           duration: 500,
           mask: true
         })
         wx.navigateBack();
         console.log(res);
       }
     })
   } ,

  listTopclick(e) { //头部点击切换样式
    var that = this;
    var menuid = e.currentTarget.dataset.id;
    var selectkey = e.currentTarget.dataset.key;
    
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取车辆信息
      url: url + 'user/set_carclass',
      data: {
        'id': e.currentTarget.id,
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['menulist']: res.data.data,
          ['fid']: e.currentTarget.id,
          display: 'block',
        })
        wx.hideToast();
        console.log(res);
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      mycar: options.mycar,
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
    //获取车辆信息
    that.getdata();

    const res = wx.getSystemInfoSync(),
      letters = this.data.letters;
    // 设备信息
    this.setData({
      windowHeight: res.windowHeight,
      windowWidth: res.windowWidth,
      pixelRatio: res.pixelRatio
    });
    // 第一个字母距离顶部高度，css中定义nav高度为94%，所以 *0.94
    const navHeight = this.data.windowHeight * 0.94, // 
      eachLetterHeight = navHeight / 26,
      comTop = (this.data.windowHeight - navHeight) / 2,
      temp = [];

    this.setData({
      eachLetterHeight: eachLetterHeight
    });

    // 求各字母距离设备左上角所处位置

    for (let i = 0, len = letters.length; i < len; i++) {
      const x = this.data.windowWidth - (10 + 50) / this.data.pixelRatio,
        y = comTop + (i * eachLetterHeight);
      temp.push([x, y]);
    }
    this.setData({
      lettersPosition: temp
    })
  },
  getdata:function(e){
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取车辆信息
      url: url + 'user/set_carclass',
      data: {
        'id': 0,
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['groups']: res.data.data
        })
        wx.hideToast();
        console.log(res);
      }
    })
  }
  ,
  tabLetter(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selected: index,
      scrollIntoView: index
    })

    this.cleanAcitvedStatus();
  },
  // 清除字母选中状态
  cleanAcitvedStatus() {
    setTimeout(() => {
      this.setData({
        selected: 0
      })
    }, 500);
  },
  touchmove(e) {
    const x = e.touches[0].clientX,
      y = e.touches[0].clientY,
      lettersPosition = this.data.lettersPosition,
      eachLetterHeight = this.data.eachLetterHeight,
      letters = this.data.letters;
    console.log(y);
    // 判断触摸点是否在字母导航栏上
    if (x >= lettersPosition[0][0]) {
      for (let i = 0, len = lettersPosition.length; i < len; i++) {
        // 判断落在哪个字母区域，取出对应字母所在数组的索引，根据索引更新selected及scroll-into-view的值
        const _y = lettersPosition[i][1], // 单个字母所处高度
          __y = _y + eachLetterHeight; // 单个字母最大高度取值范围
        if (y >= _y && y <= __y) {
          this.setData({
            selected: letters[i],
            scrollIntoView: letters[i]
          });
          break;
        }
      }
    }
  },
  touchend(e) {
    this.cleanAcitvedStatus();
  }
  
})