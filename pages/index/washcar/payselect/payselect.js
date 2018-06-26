Page({
  data: {
    selectid:0,
    list: [
      {
        'path': '/images/xiche1.png',
        'name': '标准洗车',
        'price': '￥30.00',
        't': '标准洗车包括：打蜡、普通轮胎更换、7座机器打蜡'
      },
      {
        'path': '/images/xiche2.png',
        'name': '精致洗车',
        'price': '￥15.00',
        't': '精致洗车包括：打蜡、普通轮胎更换、7座机器打蜡、强效动力进气系统清洗、空调系统内循环清洗'
      }
    ]
  },
  selectclick(e){
    var selectid = e.currentTarget.dataset.selectid;
    this.setData({ selectid: selectid, })
  }
})