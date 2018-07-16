
Page({

  data: {
    time: {
      overtimestamp: 1532240225,
      day: '',
      hour: '',
      minute: '',
      second: '',
    }
  },
  onLoad: function (options) {
    var starttimestamp = Math.round(new Date() / 1000);
    this.countDown(this.data.time.overtimestamp - starttimestamp);
  },
  countDown(times) {//倒计时
    var that = this;
    var timer = null;
    timer = setInterval(function () {
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;//时间默认值
      if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      }
      if (day <= 9) day = '0' + day;
      if (hour <= 9) hour = '0' + hour;
      if (minute <= 9) minute = '0' + minute;
      if (second <= 9) second = '0' + second;
      that.setData({
        ['time.day']: day,
        ['time.hour']: hour,
        ['time.minute']: minute,
        ['time.second']: second,
      });
      times--;

    }, 1000);
    if (times <= 0) {
      clearInterval(timer);
    }
  }
})