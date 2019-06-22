var base64 = require("../example/images/base64");
const app = getApp()
Page({
  data: {
    userInfo: {},
    sellinfo: "Directing to Feedback Page.",
    showid: 0,
    deList: [],
  },

  onLoad: function() {
    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
    });
  },
  onLoad: function(options) {
    var tem = []
    var temp = {}
    var arry_length = app.msgList.length
    for (var i = 0; i < arry_length; i++) {
      if (options.str == app.msgList[i].id) {
        tem[0] = app.msgList[i]
        temp = app.sellList[i]
        break
      }
    }

    this.setData({
      showid: options.str,
      deList: tem,
      userInfo: temp
    })
  },
  previewImage: function(e) {
    var temp = []
    temp[0] = this.data.deList[0].src
    if ((temp[0].indexOf("http") < 0) && (temp[0].indexOf("wxfile") < 0)) {
      if (temp[0].indexOf("noImage.png") >= 0) {
        temp[0] = app.images[0]
      } else {
        for (var i = 1; i < 5; i++) {
          if (temp[0].indexOf(i) >= 0) {
            temp[0] = app.images[i]
            break
          }
        }
      }
    }
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: temp // 需要预览的图片http链接列表
    })
  },
  sleep: function(ms) {

    for (var t = Date.now(); Date.now() - t <= ms;) {}
  },
  async openAlert() {
    await wx.showModal({
      content: this.data.sellinfo,
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../feedback/feedback',
          })
        }
      }
    })
  },
  want: function() {
    this.openAlert()
  },
});