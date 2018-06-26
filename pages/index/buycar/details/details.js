Page({
  data: {
    swiper: {//banner图
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      indicatorcolor: '#d5d5d5',
      indicatoractivecolor: "#0084ff",
      imgUrl: [
        '/images/banner.jpg',
        '/images/banner.jpg',
        '/images/banner.jpg'
      ]
    },
    layerColorDisplay:'none',
    layerLiftcarDisplay: 'none',
  },
  layerColorclick(e){
    this.setData({ layerColorDisplay:'block' })
  },
  bglayerColorclick(e){
    this.setData({ layerColorDisplay: 'none' })
  },
  closelayerColor(e){
    this.bglayerColorclick();
  },
  bglayerLiftcarclick(e){
    this.setData({ layerLiftcarDisplay: 'none' })
  },
  layerLiftcarclick(e){
    this.setData({ layerLiftcarDisplay: 'block' })
  }
})
