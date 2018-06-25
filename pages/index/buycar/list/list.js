// pages/store/list/list.js
Page({
  data: {
    display: 'none',
    menuid: 99,
    levelid:0,
    menu: [ //导航
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "品牌"
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "价格"
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "级别"
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "更多"
      }
    ],
    menulist: [
      //导航列表
    ],
    brand: [ //品牌
      {
        "text": "不限"
      },
      {
        "text": "宝马",
        "path": "/images/car_03.png"
      },
      {
        "text": "大众",
        "path": "/images/car_03.png"
      },
      {
        "text": "奥迪",
        "path": "/images/car_03.png"
      }
    ],
    price: [ //价格
      {
        "text":'首付',
        "sub":[
          {
            "text": '一万以内',
            "key": false
          },
          {
            "text": '1-2万',
            "key": false
          },
          {
            "text": '2-3万',
            "key": false
          },
          {
            "text": '3-4万',
            "key": false
          },
          {
            "text": '4万以上',
            "key": false
          },
        ]
      },
      {
        "text": '月付',
        "sub": [
          {
            "text": '一万以内',
            "key": false
          },
          {
            "text": '1-2万',
            "key": false
          },
          {
            "text": '2-3万',
            "key": false
          },
          {
            "text": '3-4万',
            "key": false
          },
          {
            "text": '4万以上',
            "key": false
          },
        ]
      },
      {
        "text": '指导价',
        "sub": [
          {
            "text": '一万以内',
            "key": false
          },
          {
            "text": '1-2万',
            "key": false
          },
          {
            "text": '2-3万',
            "key": false
          },
          {
            "text": '3-4万',
            "key": false
          },
          {
            "text": '4万以上',
            "key": false
          },
        ]
      }
    ],
    level: [ //级别
      {
        "text":"不限",
        "key": false
      },
      {
        "text": "小型车",
        "key": false
      },
      {
        "text": "紧凑车型",
        "key": false
      },
      {
        "text": "中型车",
        "key": false
      }
    ],
    more: [ //更多
      {
        "text": '变速箱',
        "sub": [
          {
            "text": '手动',
            "key": false
          },
          {
            "text": '自动',
            "key": false
          }
        ]
      },
      {
        "text": '变速箱',
        "sub": [
          {
            "text": 'GPS导航',
            "key": false
          },
          {
            "text": '涡轮增压',
            "key": false
          },
          {
            "text": '真皮座椅',
            "key": false
          }
        ]
      },
      {
        "text": '排序',
        "sub": [
          {
            "text": '价格从高到低',
            "key": false
          },
          {
            "text": '价格从低到高',
            "key": false
          }
        ]
      }
    ],
    listCon:[
      {
        "path":'/images/car_03.png',
        "name":'晶锐Health Plus定制版',
        "cs":"厂商指导价10.54万",
        "l":"￥0.81万",
        "r":"1681元"
      }
    ]
  },
  onReady: function () {

  },
  onLoad() {

  },
  listTopclick(e) { //头部点击切换样式
    var that = this;
    var menuid = e.currentTarget.dataset.id;
    var menulist;
    if (menuid == 0) {
      menulist = that.data.brand
    } else if (menuid == 1) {
      menulist = that.data.price
    } else if( menuid == 2 ) {
      menulist = that.data.level
    }else{
      menulist = that.data.more
    }
    that.setData({
      menuid: menuid,
      display: 'block',
      menulist: menulist
    });
  },
  layerNone(e) {//点击背景隐藏
    var that = this;
    that.setData({ display: 'none' });
  },
  brandclick(e){ //品牌点击
    this.layerNone();
  },
  levelclick(e){ // 级别点击
    var index = e.currentTarget.dataset.index;
    this.setData({ levelid: index });
    this.layerNone();
  },
  screenclick(e){//筛选
    var that = this;
    var id = e.currentTarget.dataset.id;
    var menulist = e.currentTarget.dataset.menulist;
    if ( that.data.menuid == 1 ){
      var data = that.data.price;
    }else{
      var data = that.data.more;
    }
    var arry = data[menulist].sub;
    for (let i = 0; i < arry.length; i++) {
      if (id == i) {
        arry[i].key = !arry[i].key
      }
    }
    that.setData({ menulist: data})
  },
  reset(e){ //重置
    var that = this;
    if (that.data.menuid == 1) {
      var data = that.data.price;
    } else {
      var data = that.data.more;
    }
    for (let i = 0; i < data.length; i++ ){
      for( let x = 0; x < data[i].sub.length; x++ ){
        data[i].sub[x].key = false
      }
    }
    that.setData({ menulist: data })
  },
  confirm(e){
    this.layerNone();
  }
})