const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ifJump: false,
    title: "",
    time: "",
    text: "",
    temp: app.usrList[1],
    toomanywords: false
  },
  onLoad: function() {
    this.setData({
      ifJump: false
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
  gettitle: function(e) {
    this.setData({
      title: e.detail.value
    })
  },

  upload: function() {
    if (!this.data.ifJump) {
      this.setData({
        ifJump: true
      })
      if (this.data.text.length > 100) {
        wx.showModal({
          content: 'Too many words.',
          showCancel: false,
        });
      } else {
        var i = app.usrList.length
        this.data.temp.id = i + 1
        if (this.data.title != "") {
          this.data.temp.title = this.data.title
        } else {
          this.data.temp.title = "Title " + this.data.temp.id
        }
        this.data.temp.src = this.data.userInfo.avatarUrl
        this.data.temp.name = this.data.userInfo.nickName
        if (this.data.text.length > 0) {
          this.data.temp.text = this.data.text
        } else {
          this.data.temp.text = "No detailed information."
        }
        var ttime = util.formatTime(new Date());
        this.data.temp.time = ttime
        this.data.temp.edit = true
        app.usrList[i] = this.data.temp
        this.openToast()
      }
    }
  },
  sleep: function(ms) {
    for (var t = Date.now(); Date.now() - t <= ms;) {}
  },
  openToast: function() {
    wx.showToast({
      title: "Submitted",
      icon: 'success',
      duration: 3000
    })
    this.sleep(800)
    wx.navigateBack({
      url: '../../pages/main/main',
    })
  },
});