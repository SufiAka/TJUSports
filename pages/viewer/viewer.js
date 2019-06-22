wx.cloud.init()
const app = getApp()
Page({
  data: {
    temp: app.msgList,
    msgList: [],
    ifDelete: false,
  },
  onShow: function() {
    this.setData({
      temp: app.msgList,
      ifDelete: false
    })

    var tem = []
    var j = 0
    for (var i = 0; i < this.data.temp.length; i++) {
      if (this.data.temp[i].edit) {
        tem[j] = this.data.temp[i]
        if (tem[j].text.length > 20) {
          tem[j].text_simple = tem[j].text.substring(0, 20) + "..."
        } else {
          tem[j].text_simple = tem[j].text
        }
        j++
      }
    }
    this.setData({
      msgList: tem,
    })
  },
  sleep: function(ms) {
    for (var t = Date.now(); Date.now() - t <= ms;) {}
  },
  seemore: function(e) {
    wx.navigateTo({
      url: "../detail/detail?str=" + e.currentTarget.dataset.name
    })
  },
  editList: function(e) {
    wx.navigateTo({
      url: "../uploader/uploader?str=" + e.currentTarget.dataset.name
    })
  },
  delList: function(e) {
    if (!this.data.ifDelete) {
      this.setData({
        ifDelete: true
      })
      for (var i = 0; i < app.msgList.length; i++) {
        if (app.msgList[i].id === e.currentTarget.dataset.name) {
          var that = app.msgList[i].src
          var thats=app.msgList[i]._id
          const db = wx.cloud.database()
          const sell = db.collection('sell')
          db.collection('sell').doc(thats).remove({
            success: function (res) {
              console.log(res.data)
            }
          })
          wx.cloud.deleteFile({
            fileList: [that],
            success: res => {
              // handle success
              console.log(res.fileList)
            },
            fail: console.error
          })
          app.msgList.splice(i, 1)
          break
        }
      }
      wx.showToast({
        title: "Refreshing...",
        icon: "loading",
        mask: true,
        duration: 800
      })
      this.sleep(800)
      this.onShow()
    }
  }
})