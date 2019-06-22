const app = getApp()

Page({
  data: {
    text: "",
    toomanywords: false,
  },
  getdata: function(e) {
    if (e.detail.value.length > 100) {
      this.setData({
        toomanywords: true
      })
    } else {
      this.setData({
        toomanywords: false
      })
    }
    this.setData({
      text: e.detail.value
    })
  },
  sleep: function(ms) {
    for (var t = Date.now(); Date.now() - t <= ms;) {}
  },
  async openToast() {
    await wx.showToast({
      title: "Submitted",
      icon: 'success',
      duration: 3000
    })
    await this.sleep(1000)
    await wx.redirectTo({
      url: '../main1/main1',
    })
  },
  submit: function(){
    if (this.data.text.length > 100) {
      wx.showModal({
        content: 'Too many words.',
        showCancel: false,
      });
    }else{
      this.openToast()
    }
  }
});