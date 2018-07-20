Page({
  data: {
    selectid: 0,
    list: [
      {
        'path': '/images/xiche1.png',
        'name': '标准漆',
        'price': '￥299.00/标准面',
        't': '标准漆包括：打蜡、普通轮胎更换、7座机器打蜡'
      },
      {
        'path': '/images/xiche2.png',
        'name': '高端漆',
        'price': '￥399.00/标准面',
        't': '高端漆包括：打蜡、普通轮胎更换、7座机器打蜡、强效动力进气系统清洗、空调系统内循环清洗'
      }
    ]
  },
  selectclick(e) {
    var selectid = e.currentTarget.dataset.selectid;
    this.setData({ selectid: selectid, })
  },
  payClick(e){
    wx.navigateTo({
      url: '/pages/index/spraypaint/pay/pay'
    })
  },
  carselect(e){
    wx.navigateTo({
      url: '/pages/my/info/mycar/home/index?type=1'
    })
  }
})