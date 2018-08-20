
var url = getApp().globalData.publicUrl;
Page({
  data: {
    winHeight:'',
    display:'none',
    displaycardisplacement:'none',
    displacement:'',
    caryear:'',
    displaycaryear:"none",
    car_type:'',
    mycar:'',
    // 当前选择的导航字母
    selected: 0,
    // 选择字母视图滚动的位置id
    scrollIntoView: 'A',
    // 导航字母
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'],
    groups: [],
    menulist: [],
  },
  listTopclick(e) { //车系
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取车辆信息
      url: url + 'user/set_carclass',
      data: {
        'id': id,
        type: 2
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['menulist']: res.data.data,
          cartype: id,
          display: 'block',
        })
        wx.hideToast();
      }
    })
  },
  cardisplacementClick(e){//排量
    var that = this;
    const id = e.currentTarget.dataset.id;
    var menulistid = e.currentTarget.dataset.menulistid;
    var cartype = this.data.cartype + ',' + menulistid + ',' + id;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取车辆信息
      url: url + 'user/set_carclass',
      data: {
        id: id,
        type: 3
      },
      method: 'POST',
      success: function (res) {
        if( res.data.data.length > 0 ){
          that.setData({
            displacement: res.data.data,
            displaycardisplacement: 'block',
            display: 'none',
            cartype: cartype
          })
          wx.hideToast();
        }else{
          that.setData({
            displacement: res.data.data,
            displaycardisplacement: 'none',
            display: 'block'
          })
          wx.showToast({
            title: '车辆详细待完善，敬请期待。',
            icon: 'none',
            duration: 500,
            mask: true
          })
        }
      }
    })
  },
  caryearClick(e){//生产年限
    const id = e.currentTarget.dataset.id;
    var cartype = this.data.cartype + ',' + id;
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
        id: id,
        type: 4
      },
      method: 'POST',
      success: function (res) {
        if (res.data.data.length > 0) {
          that.setData({
            caryear: res.data.data,
            displaycardisplacement: 'none',
            displaycaryear: 'block',
            cartype: cartype
          })
          wx.hideToast();
        }
      }
    })
  },
  addcar: function (e) {//添加爱车
    const id = e.currentTarget.dataset.id;
    var cartype = this.data.cartype + ',' + id;
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//添加车辆
      url: url + 'user/set_lovecar',
      data: {
        'car_type': cartype,
        'openid': wx.getStorageSync('userinfo').openid,
        'is_default': 1,
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
                    wx.showToast({
                      title: '添加成功',
                      icon: 'success',
                      duration: 300,
                      mask: true,
                      success:function(){
                        wx.navigateBack();
                      }
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
        type: 1
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['groups']: res.data.data
        })
        wx.hideToast();
      }
    })
  },
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