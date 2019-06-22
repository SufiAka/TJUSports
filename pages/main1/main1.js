//list.js
wx.cloud.init()
const app = getApp()
var sliderWidth = 96;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabs: ["My Profile", "Sell & Buy", "Buy in Group"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    list1: [{
      id: 'form',
      name: 'MANAGE PRODUCTS',
      open: false,
      pages: ['uploader', 'viewer']
    }],
    list2: [{
      id: 'search',
      name: 'SEARCH',
      open: false,
      pages: ['searchbar']
    }],
    list3: [{
        id: 'form',
        name: 'MANAGE GROUPS',
        open: false,
        pages: ['upload']
      },
      {
        id: 'search',
        name: 'SEARCH',
        open: false,
        pages: ['searchgroup']
      }
    ],
    imageurl1: "../../images/none.png",
    daindex1: 0,
    imageurl2: "../../images/none.png",
    daindex2: 0,
    state: 0,
    msgList: app.msgList,
    usrList: app.usrList
  },

  onShow: function() {
    if (app.openid === "") {
      this.getopenid()
    }
    this.getcloud()
  },
  getopenid: function() {
    var that = this
    const db = wx.cloud.database()
    const oid = db.collection('oid')
    db.collection('oid').add({
      data: {},
      success: function(res) {
        db.collection('oid').doc(res._id).get({
          success: function(res) {
            app.openid = res.data._openid
            db.collection('oid').doc(res.data._id).remove({
              success: function (res) {
                console.log(res.data)
                that.getcloud()
              }
            })
          }
        })
      },
      fail: console.error
    })
  },
  getcloud: function() {
    var that = this
    const db = wx.cloud.database()
    const sell = db.collection('sell')
    db.collection('sell').get({
      success: function(res) {
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data.length)
          if (res.data[i]._openid === app.openid) {
            res.data[i].edit = true
          }
          app.msgList[i] = res.data[i]
        }
        const sell = db.collection('group')
        db.collection('group').get({
          success: function(res) {
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i]._openid === app.openid) {
                res.data[i].edit = true
              }
              app.groupList[i] = res.data[i]
            }
            var temp = app.msgList
            var temp1 = app.usrList
            var temp2 = app.groupList
            for (var i = 0; i < temp.length; i++) {
              if (temp[i].text.length > 20) {
                temp[i].text_simple = temp[i].text.substring(0, 20) + "..."
              } else {
                temp[i].text_simple = temp[i].text
              }
            }
            for (var i = 0; i < temp2.length; i++) {
              if (temp2[i].text.length > 20) {
                temp2[i].text_simple = temp2[i].text.substring(0, 20) + "..."
              } else {
                temp2[i].text_simple = temp2[i].text
              }
            }
            that.setData({
              msgList: temp,
              usrList: temp1,
              groupList: temp2,
            })
            that.zonghe()
            wx.getSystemInfo({
              success: function(res) {
                that.setData({
                  sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                  sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
              }
            });
          }
        })
      }
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
  kindToggle3: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list3;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list3: list
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
    wx.navigateTo({
      url: "../detail/detail?str=" + e.currentTarget.dataset.name
    })
  },
  seemore_group: function(e) {
    wx.navigateTo({
      url: "../detail_group/detail_group?str=" + e.currentTarget.dataset.name
    })
  },
  editList: function(e) {
    wx.navigateTo({
      url: "../uploader/uploader?str=" + e.currentTarget.dataset.name
    })
  },
  editList_group: function(e) {
    wx.navigateTo({
      url: "../upload/upload?str=" + e.currentTarget.dataset.name
    })
  },
  onLoad: function() {
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
  }
})