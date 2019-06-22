//list.js
const app = getApp()
var sliderWidth = 96;
Page({
  data: {
    tabs: ["Sell", "Buy Alone", "Buy in Group"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    list1: [{
        id: 'form',
        name: 'MANAGE PRODUCTS',
        open: false,
        pages: ['uploader', 'viewer']
      },
      {
        id: 'search',
        name: 'SEARCH',
        open: false,
        pages: ['searchbar']
      },
    ],
    list2: [{
      id: 'search',
      name: 'SEARCH',
      open: false,
      pages: ['searchbar']
    }],
    imageurl1: "../../images/none.png",
    daindex1: 0,
    imageurl2: "../../images/none.png",
    daindex2: 0,
    state: 0,
    msgList: app.msgList
  },

  onShow: function() {
    var temp = app.msgList
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].text.length > 20) {
        temp[i].text_simple = temp[i].text.substring(0, 20) + "..."
      } else {
        temp[i].text_simple = temp[i].text
      }
    }
    this.setData({
      msgList: temp,
    })
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  zonghe: function() {
    this.setData({
      imageurl1: "../../images/none.png",
      daindex1: 0,
      imageurl2: "../../images/none.png",
      daindex2: 0
    })

    var arry_length = this.data.msgList.length
    for (var i = 0; i < arry_length; i++) {
      for (var j = 0; j < arry_length - i - 1; j++) {
        let arry_id1 = this.data.msgList[j].id
        let arry_id2 = this.data.msgList[j + 1].id
        if (arry_id1 > arry_id2) {
          const temp = this.data.msgList[j]
          this.data.msgList[j] = this.data.msgList[j + 1]
          this.data.msgList[j + 1] = temp
        }

      }
      this.setData({
        msgList: this.data.msgList,
        state: 0,
      })
    }
  },

  choosesort1: function(e) {
    this.setData({
      imageurl2: "../../images/none.png",
      daindex2: 0
    })
    if (this.data.daindex1 == 0) {
      this.setData({
        imageurl1: "../../images/up.png",
        daindex1: 1
      })
    } else {
      this.setData({
        imageurl1: "../../images/down.png",
        daindex1: 0
      })
    }

    if (this.data.state === 2) {
      var arry_length = this.data.msgList.length
      for (var i = 0; i < arry_length; i++) {
        for (var j = 0; j < arry_length - i - 1; j++) {
          let arry_xiaoliang1 = this.data.msgList[j].xiaoliang
          let arry_xiaoliang2 = this.data.msgList[j + 1].xiaoliang
          if (arry_xiaoliang1 < arry_xiaoliang2) {
            const temp = this.data.msgList[j]
            this.data.msgList[j] = this.data.msgList[j + 1]
            this.data.msgList[j + 1] = temp
          }
        }
      }
      this.setData({
        msgList: this.data.msgList,
        state: 3,
      })
    } else {
      var arry_length = this.data.msgList.length
      for (var i = 0; i < arry_length; i++) {
        for (var j = 0; j < arry_length - i - 1; j++) {
          let arry_xiaoliang1 = this.data.msgList[j].xiaoliang
          let arry_xiaoliang2 = this.data.msgList[j + 1].xiaoliang
          if (arry_xiaoliang1 > arry_xiaoliang2) {
            const temp = this.data.msgList[j]
            this.data.msgList[j] = this.data.msgList[j + 1]
            this.data.msgList[j + 1] = temp
          }
        }
      }
      this.setData({
        msgList: this.data.msgList,
        state: 2,
      })
    }
  },
  choosesort2: function(e) {
    this.setData({
      imageurl1: "../../images/none.png",
      daindex1: 0
    })
    if (this.data.daindex2 == 0) {
      this.setData({
        imageurl2: "../../images/up.png",
        daindex2: 1
      })
    } else {
      this.setData({
        imageurl2: "../../images/down.png",
        daindex2: 0
      })
    }

    if (this.data.state === 4) {
      var arry_length = this.data.msgList.length
      for (var i = 0; i < arry_length; i++) {
        for (var j = 0; j < arry_length - i - 1; j++) {
          let arry_jiage1 = this.data.msgList[j].jiage
          let arry_jiage2 = this.data.msgList[j + 1].jiage
          if (arry_jiage1 < arry_jiage2) {
            const temp = this.data.msgList[j]
            this.data.msgList[j] = this.data.msgList[j + 1]
            this.data.msgList[j + 1] = temp
          }
        }
      }
      this.setData({
        msgList: this.data.msgList,
        state: 5,
      })
    } else {
      var arry_length = this.data.msgList.length
      for (var i = 0; i < arry_length; i++) {
        for (var j = 0; j < arry_length - i - 1; j++) {
          let arry_jiage1 = this.data.msgList[j].jiage
          let arry_jiage2 = this.data.msgList[j + 1].jiage
          if (arry_jiage1 > arry_jiage2) {
            const temp = this.data.msgList[j]
            this.data.msgList[j] = this.data.msgList[j + 1]
            this.data.msgList[j + 1] = temp
          }
        }
      }
      this.setData({
        msgList: this.data.msgList,
        state: 4,
      })
    }
  },

  onLoad: function() {
    this.zonghe()
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  kindToggle1: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list1;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list1: list
    });
  },
  kindToggle2: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list2;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list2: list
    });
  },
  openToast: function() {
    wx.showToast({
      title: "Success",
      icon: 'success',
      duration: 3000
    });
  },
  seemore: function(e) {
    console.log(e)
    wx.navigateTo({
      url: "../detail/detail?str=" + e.currentTarget.dataset.name
    })
  },
  editList: function(e) {
    wx.navigateTo({
      url: "../uploader/uploader?str=" + e.currentTarget.dataset.name
    })
  }
})