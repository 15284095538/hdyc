var url = getApp().globalData.publicUrl;
Page({
  data: {
    show:false,
    selectid:0,
    openid:'',
    twosta:true,
    showsta:0,
    allprice:0
  },
  onShow(e){
    var that = this;
    var wrapindex = this.data.wrapindex;
    if (parseInt(this.data.sta) === this.data.showsta) {
      var arr = this.data.list;
      var newid = this.data.newid;
      that.request(true, 'Upkeep/getData', {
        openid: that.data.openid,
        type: 1,
        class_id: that.data.classid,
        id: newid,
        to_id: that.data.oldid,
      },
        'POST', res => {
          var carts = that.data.list;
          carts[wrapindex] = res.data.goods[wrapindex];
          carts[wrapindex].turn = !carts[wrapindex].turn; 
          carts[wrapindex].sta = !carts[wrapindex].sta;
          carts[wrapindex].list[0].number = 1; 
          that.setData({
            car_info: res.data.car_info,
            list: carts,
            class_id: this.data.classid,
            showsta: 0
          })
      });
      // console.log(id);
      // console.log(arr);
      // var num = arr[index].list.length;
      // for (var i = 0; i < num;i++){
      //   if (arr[index].list[i].id == id){
      //     var zero = arr[index].list[i];
      //     arr[index].list.unshift(zero);
      //     arr[index].list.splice(0, arr[index].list.length-1);
      //   }
      // }
      
      
    }
    if (parseInt(this.data.icarsta) === this.data.carsta){
      console.log(1111111);
        that.request(true, 'Upkeep/getData', {
          openid: that.data.openid,
          type: 1,
          class_id: this.data.class_id
        },
          'POST', res => {
            var carts = res.data.goods;
            for (var i = 0; i < carts.length; i++) {
              if (carts[i].list) {
                carts[i].list[0].number = 1;
              }
            }
            that.setData({
              car_info: res.data.car_info,
              list: carts,
              carsta:'regain'
            })
          });
      }
  },
  onLoad(e) {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({openid: res.data.openid})
        that.request(true, 'Upkeep/getData', {
          openid:res.data.openid,
          type:1,
          class_id:0
        },
          'POST', res => {
            var carts = res.data.goods;
            for(var i=0;i<carts.length;i++){
              if(carts[i].list){
                carts[i].list[0].number = 1;
              }
            }
            that.setData({
              car_info:res.data.car_info,
              list:carts,
              class_id: 0,
              yq:true
            })
          });
      }
    })
    
  },
  selectidCLick(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    this.setData({ selectid:id});
    if(id == 1){
      that.request(true, 'Upkeep/getData', {
        openid: that.data.openid,
        type: 1,
        class_id: 1
      },
        'POST', res => {
          console.log(res);
          var carts = res.data.goods;
          for (var i = 0; i < carts.length; i++) {
            if (carts[i].list) {
              carts[i].list[0].number = 1;
            }
          }
          that.setData({
            car_info: res.data.car_info,
            list:carts,
            class_id: 1
          })
      });
    }else if(id == 0){
      that.request(true, 'Upkeep/getData', {
        openid: that.data.openid,
        type: 1,
        class_id: 0
      },
        'POST', res => {
          //console.log(res);
          var carts = res.data.goods;
          for (var i = 0; i < carts.length; i++) {
            if (carts[i].list) {
              carts[i].list[0].number = 1;
            }
          }
          that.setData({
            car_info: res.data.car_info,
            list: carts,
            class_id: 0
          })
      });
    }
  },
  linkTo(e){
    //var url = e.currentTarget.dataset.url;
    var carsta = Math.floor(Math.random() * (888 - 0 + 1) + 0);
    this.setData({carsta})
    wx.navigateTo({
      url: '/pages/maintain/car/car?carsta=' + carsta
    })
  },
  godetail:function(e){
    var goods_id = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '/pages/maintain/goodsDetail/goodsDetail?goods_id='+goods_id
    })
  },
  defaultClick:function(e){
    const index = e.currentTarget.dataset.index;
    var arr = e.currentTarget.dataset.arr;
    const list = this.data.list;
    list[index].checked = !list[index].checked;

    
    this.setData({
      list: list
    });
    if(arr.length != 0){
      this.allPrice();
    }
    
  },
  show:function(e){
    var that = this;
    var arr = e.currentTarget.dataset.arr;
    var index = e.currentTarget.dataset.index;
    var list = this.data.list;
    list[index].turn = !list[index].turn;
    //  Look!
    // for(var i=0;i<list.length;i++){
    //   if(index === i){
    //     list[i].sta = !list[i].sta;
    //   }
    // }
    list[index].sta = !list[index].sta;
    if(arr.length == 0){
      list[index].sta = false;
    }
    this.setData({
      list,
      turnindex:index
    })
  },
  handle:function(e){
    var index = e.currentTarget.dataset.index;
    var arr = e.currentTarget.dataset.arr;
    var list = this.data.list;
    list[index].handle = !list[index].handle;
    // if (list[index].handle && (arr.length != 0)){
    //   list[index].sta = true;
    // }
    list[index].stat = !list[index].stat;
    this.setData({
      list
    })
  },
  delCar:function(e){
    var tapindex = e.currentTarget.dataset.index;
    var list = this.data.list;
    // for(var i=0;i<list.length;i++){
    //   if(tapindex === i){
    //     list[i].list.splice(0,1);
    //   }
    // }
    list[tapindex].list.splice(0,1);
    list[tapindex].sta = false;
    list[tapindex].turn = false;
    this.setData({
      list
    })
  },
  change(e){
    // if(this.data.yq){
    //   this.setData({ oldid : e.currentTarget.dataset.oldid , yq:false});
    // }
    var oldid = e.currentTarget.dataset.oldid;
    var id = e.currentTarget.dataset.id;
    // var sta = e.currentTarget.dataset.sta;
    var sta = Math.floor(Math.random() * (1000 - 0 + 1) + 0);
    
    var classid = e.currentTarget.dataset.classid;
    var wrapindex = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/maintain/product/product?id=' + id + '&sta=' + sta + '&classid=' + classid
    })
    this.setData({ showsta: sta, wrapindex, oldid});
  },
  bindMinus: function (e) {//减

    var that = this;
    const index = e.currentTarget.dataset.index;
    var carts = this.data.list;
    var id = e.currentTarget.dataset.id;
    var num = e.currentTarget.dataset.num;
    num = num - 1;
    if (num < 1) {
      wx.showToast({
        title: '受不了了，宝贝不能再减少了哦',
        icon: 'none',
      })
    } else {
      carts[index].list[0].number = num;
      this.setData({
        list: carts,
      })
      this.allPrice();
    }
  },
  bindPlus: function (e) {//加
    var that = this;
    const index = e.currentTarget.dataset.index;
    var carts = this.data.list;
    var id = e.currentTarget.dataset.id;
    var store = e.currentTarget.dataset.store;
    var num = e.currentTarget.dataset.num;
    num = num + 1;
    if(num>store){
      wx.showToast({
        title: '宝贝不能再增加了',
        icon: 'none',
      })
    }else{
      carts[index].list[0].number = num;
      this.setData({
        list: carts,
      })
      this.allPrice();
    }
    
  },
  allPrice(e) {//计算价格
  var that = this;
    var allnum = 0;
    var allprice = 0;
    var allselect = false;
    var list = this.data.list;
    var goodsIdArr = [];
    var goodsNumArr = [];
    var goodsImgArr = [];
    var jsonStr = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].checked && (list[i].list.length != 0)) {
        allprice += list[i].list[0].number * Number(list[i].list[0].price);
        goodsIdArr.push(list[i].list[0].id);
        goodsNumArr.push(list[i].list[0].number);
        goodsImgArr.push(list[i].list[0].g_picture);
        var type = '';
        if (that.data.class_id == 0) {
          type = '大保养'
        } else {
          type = '小保养'
        }
        var obj = {
          "className": list[i].kind.type_name,
          "type": type,
          "goods": [{
            "goods_id": list[i].list[0].id,
            "img": list[i].list[0].g_picture,
            "goods_name": list[i].list[0].g_name,
            "price": list[i].list[0].price,
            "goods_number": list[i].list[0].number
          }]
        };
        jsonStr.push(obj);
      }
    }
    this.setData({
      allprice, goodsIdArr, goodsNumArr,goodsImgArr,jsonStr
    })
  },
  gobuy(e){
    var that = this;
    var class_id = this.data.class_id;
    var goodsIdArr = JSON.stringify(this.data.goodsIdArr);
    var goodsNumArr = JSON.stringify(this.data.goodsNumArr);
    var goodsImgArr = JSON.stringify(this.data.goodsImgArr);
    var jsonStr = JSON.stringify(this.data.jsonStr);
    if (this.data.goodsIdArr){
      that.request(true, 'order/order', {
        openid: 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
        goods_type: 2,
        goods_id: goodsIdArr,
        value_id: '',
        level: '',
        number: goodsNumArr,
        jsonStr: jsonStr
      },
        'POST', res => {
          var cellphone = res.data.user.cellphone;
          var name = res.data.user.name;
          wx.navigateTo({
            url: '/pages/maintain/order/order?name=' + name + '&cellphone=' + cellphone + '&allprice=' + that.data.allprice + '&goodsImgArr=' + goodsImgArr + '&goodsIdArr=' + goodsIdArr + '&goodsNumArr=' + goodsNumArr + '&jsonStr=' + jsonStr
          })
        });
    }
    
  },
  onPullDownRefresh: function () {
    var that = this;
    that.request(true, 'Upkeep/getData', {
      openid: this.data.openid,
      type: 1,
      class_id: this.data.class_id
    },
      'POST', res => {
        console.log(res);
        var carts = res.data.goods;
        for (var i = 0; i < carts.length; i++) {
          if (carts[i].list) {
            carts[i].list[0].number = 1;
          }
        }
        that.setData({
          car_info: res.data.car_info,
          list: carts,
        })
    });
    wx.stopPullDownRefresh();
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
  }
})

