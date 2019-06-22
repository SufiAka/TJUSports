const app = getApp()
Page({
  data: {
    ifSearch: false,
    inputShowed: false,
    inputVal: "",
    msgList: app.msgList,
    msgSearch: []
  },
  onLoad: function() {
    var temp = app.msgList
    this.setData({
      msgList: temp,
    })
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
    var arry_length = this.data.msgList.length
    var temp = []
    var j = 0
    var flag = false
    for (var i = 0; i < arry_length; i++) {
      if (this.data.msgList[i].title.toLowerCase().indexOf(e.detail.value.toLowerCase()) >= 0) {
        temp[j] = this.data.msgList[i]
        j++
        flag = true
      }
    }
    if (flag) {
      this.setData({
        ifSearch: true
      })
    } else {
      this.setData({
        ifSearch: false
      })
    }
    this.setData({
      msgSearch: temp
    })
  },
  seemore: function(e) {
    wx.navigateTo({
      url: "../detail/detail?str=" + e.currentTarget.dataset.name
    })
  },
});