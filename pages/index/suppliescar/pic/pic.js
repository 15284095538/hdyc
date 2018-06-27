Page({
  data: {
    lastX: 0,
    lastY: 0,
    text : "没有滑动",
    currentGesture: 0,
  },
  handletouchmove: function(event) {
    if (this.data.currentGesture != 0){
      return
    }
    let currentX = event.touches[0].pageX
    let currentY = event.touches[0].pageY
    let tx = currentX - this.data.lastX
    let ty = currentY - this.data.lastY
    let text = ""
    //左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0) {
        text = "向左滑动"
        this.data.currentGesture = 1
      }
      else if (tx > 0) {
        text = "向右滑动"
        this.data.currentGesture = 2
      }

    }
    //上下方向滑动
    else {
      if (ty < 0){
        text = "向上滑动"
        this.data.currentGesture = 3

      }
      else if (ty > 0) {
        text = "向下滑动"
        this.data.currentGesture = 4
      }

    }

    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
    this.setData({
      text : text,
    });
  },

  handletouchtart:function(event) { 
    console.log(event)
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  handletouchend:function(event) {
    console.log(event)
    this.data.currentGesture = 0
    this.setData({
      text : "没有滑动",
    });
  },
})