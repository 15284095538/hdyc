Page({
  data: {
    topimg: [
      {
        'text': '前保险杠',
        'path': '/images/SprayPaint/5.png',
        'display': false,
        'key':false,
      },
      {
        'text': '后保险杠',
        'path': '/images/SprayPaint/2.png',
        'display': false,
        'key':false
      },
      {
        'text': '左前翼子板',
        'path': '/images/SprayPaint/22.png',
        'display': false,
        'key':false
      },
      {
        'text': '右前翼子板',
        'path': '/images/SprayPaint/13.png',
        'display': false,
        'key':false
      },
      {
        'text': '左后翼子板',
        'path': '/images/SprayPaint/20.png',
        'display': false,
        'key':false
      },
      {
        'text': '右后翼子板',
        'path': '/images/SprayPaint/11.png',
        'display': false,
        'key':false
      },
      {
        'text': '左前车门',
        'path': '/images/SprayPaint/21.png',
        'display': false,
        'key':false
      },
      {
        'text': '右前车门',
        'path': '/images/SprayPaint/12.png',
        'display': false,
        'key':false
      },
      {
        'text': '左后车门',
        'path': '/images/SprayPaint/18.png',
        'display': false,
        'key':false
      },
      {
        'text': '右后车门',
        'path': '/images/SprayPaint/9.png',
        'display': false,
        'key':false
      },
      {
        'text': '前车盖',
        'path': '/images/SprayPaint/6.png',
        'display': false,
        'key':false
      },
      {
        'text': '后车盖',
        'path': '/images/SprayPaint/3.png',
        'display': false,
        'key':false
      },
      {
        'text': '车顶',
        'path': '/images/SprayPaint/1.png',
        'display': false,
        'key':false
      },
      {
        'text': '左边裙',
        'path': '/images/SprayPaint/23.png',
        'display': false,
        'key':false
      },
      {
        'text': '右边裙',
        'path': '/images/SprayPaint/14.png',
        'display': false,
        'key':false
      },
      {
        'text': '左后视镜',
        'path': '/images/SprayPaint/19.png',
        'display': false,
        'key':false
      },
      {
        'text': '右后视镜',
        'path': '/images/SprayPaint/10.png',
        'display': false,
        'key':false
      },
      {
        'text': '左A柱',
        'path': '/images/SprayPaint/16.png',
        'display': false,
        'key':false
      },
      {
        'text': '右A柱',
        'path': '/images/SprayPaint/7.png',
        'display': false,
        'key':false
      },
      {
        'text': '左C柱',
        'path': '/images/SprayPaint/17.png',
        'display': false,
        'key':false
      },
      {
        'text': '右C柱',
        'path': '/images/SprayPaint/8.png',
        'display': false,
        'key':false
      },
      {
        'text': '整车喷漆',
        'path': '/images/SprayPaint/15.png',
        'display': false,
        'key':false
      },
    ],
    hbimg: [
      {
        'text': '左右前翼子板',
        'path': '/images/SprayPaint/30.png',
        'display': false,
        'key':false
      },
      {
        'text': '左右后翼子板',
        'path': '/images/SprayPaint/28.png',
        'display': false,
        'key':false
      },
      {
        'text': '左右前车门',
        'path': '/images/SprayPaint/29.png',
        'display': false,
        'key':false
      },
      {
        'text': '左右后车门',
        'path': '/images/SprayPaint/26.png',
        'display': false,
        'key':false
      },
      {
        'text': '左右裙边',
        'path': '/images/SprayPaint/31.png',
        'display': false,
        'key':false
      },
      {
        'text': '左右后视镜',
        'path': '/images/SprayPaint/27.png',
        'display': false,
        'key':false
      },
      {
        'text': '左右A柱',
        'path': '/images/SprayPaint/24.png',
        'display': false,
        'key':false
      },
      {
        'text': '左右C柱',
        'path': '/images/SprayPaint/25.png',
        'display': false,
        'key':false
      },
    ],
  },
  liclick(e) {//点击添加样式
    var topimg = this.data.topimg;
    var hbimg = this.data.hbimg;
    var selectid = e.currentTarget.dataset.selectid;
    for (let i = 0; i < topimg.length; i++) {//样式选择
      if (selectid == i) {//样式选择
        topimg[i].key = !topimg[i].key
      }
      if (selectid == 21) {//全车喷漆
        topimg[selectid].key = !topimg[selectid].key
        for (let x = 0; x < 21; x++) {
          topimg[x].key = false
        }
      }
    }
    
    topimg[selectid].display = !topimg[selectid].display


    if (selectid == 2 || selectid == 3 ){
      this.hbimgFun(2,3,0)
    }
    this.setData({ topimg: topimg, hbimg: hbimg })
  },
  hbimgFun(q,w,e){
    var topimg = this.data.topimg;
    var hbimg = this.data.hbimg;
    if (topimg[q].display && topimg[w].display) {
      topimg[q].display = false
      topimg[w].display = false
      hbimg[e].display = true
    } else {
      hbimg[0].display = false
      if (topimg[q].key) {
        topimg[q].display = true
      } else {
        topimg[q].display = false
      }
      if (topimg[w].key) {
        topimg[w].display = true
      } else {
        topimg[w].display = false
      }
    }
  }
  
})

