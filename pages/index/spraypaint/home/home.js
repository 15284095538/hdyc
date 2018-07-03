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


    if (selectid == 2 || selectid == 3 ){//左右前翼子板
      this.hbimgFun(2,3,0)
    }

    if (selectid == 4 || selectid == 5) {//左右后翼子板
      this.hbimgFun(4,5,1)
    }

    if (selectid == 6 || selectid == 7) {//左右前车门
      this.hbimgFun(6, 7, 2)
    }

    if (selectid == 8 || selectid == 9) {//左右后车门
      this.hbimgFun(8, 9, 3)
    }

    if (selectid == 13 || selectid == 14) {//左右裙边
      this.hbimgFun(13, 14, 4)
    }

    if (selectid == 15 || selectid == 16) {//左右后视镜
      this.hbimgFun(15, 16, 5)
    }

    if (selectid == 17 || selectid == 18) {//左右A柱
      this.hbimgFun(17, 18, 6)
    }

    if (selectid == 19 || selectid == 20) {//左右C柱
      this.hbimgFun(19, 20, 7)
    }

    if (topimg[21].key) {
      for (let i = 0; i < hbimg.length; i++) {
        hbimg[i].display = false
      }
      for (let i = 0; i < topimg.length; i++) {
        topimg[i].display = false
      }
    }

    if (topimg[21].key ){//整车喷漆
      topimg[21].display = true
    }else{
      topimg[21].display = false
    }

    if (selectid == 21 ){
      for (let i = 0; i < hbimg.length; i++){
        hbimg[i].display = false
      }
      for (let i = 0; i < topimg.length; i++) {
        topimg[i].display = false
      }
      if (topimg[21].key) {
        topimg[21].display = true
      } else {
        topimg[21].display = false
      }
    }
    this.setData({ topimg: topimg, hbimg: hbimg })
  },
  hbimgFun(firstid,twoid,lastid){
    var topimg = this.data.topimg;
    var hbimg = this.data.hbimg;
    if (topimg[firstid].display && topimg[twoid].display) {
      topimg[firstid].display = false
      topimg[twoid].display = false
      hbimg[lastid].display = true
    } else {
      hbimg[lastid].display = false
      if (topimg[firstid].key) {
        topimg[firstid].display = true
      } else {
        topimg[firstid].display = false
      }
      if (topimg[twoid].key) {
        topimg[twoid].display = true
      } else {
        topimg[twoid].display = false
      }
    }

  }
  
})

