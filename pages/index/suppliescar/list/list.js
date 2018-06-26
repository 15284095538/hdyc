Page({
  data: {
    selectid:0,
    menu: [ //导航
      {
        "text": "智能导航",
      },
      {
        "text": "行车记录仪",
      },
      {
        "text": "内饰贴",
      },
      {
        "text": "智能后视镜",
      }
    ],
    list:[
      {
        'path':'/images/car_03.png',
        'name':'新款吉弘行车记录仪高清夜视双镜头',
        'j':'365',
        'num':'555',
        "price":'$500'
      }
    ]
  },
  onLoad() {
    
  },
  ChangeSelect(e){
    var selectid = e.currentTarget.dataset.id;
    this.setData({ selectid: selectid })
  }
})