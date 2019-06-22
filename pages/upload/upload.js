const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    ifJump: false,
    ifEdit: false,
    editId: -1,
    title: "",
    time: "",
    text: "",
    files: [],
    temp: app.groupList[1],
    toomanywords: false
  },
  onLoad: function(options) {
    if (options.str != undefined) {
      var tem = []
      var i = 0
      var arry_length = app.groupList.length
      for (i = 0; i < arry_length; i++) {
        if (options.str == app.groupList[i].id) {
          tem[0] = app.groupList[i]
          break
        }
      }
      this.setData({
        title: tem[0].title,
        time: tem[0].time,
        text: tem[0].text,
        ifEdit: true,
        ifJump: false,
        editId: i,
      })
      if ((tem[0].src.indexOf("http") >= 0) || (tem[0].src.indexOf("wxfile") >= 0)) {
        this.setData({
          files: [tem[0].src],
        })
      } else {
        this.setData({
          files: []
        })
      }
    } else {
      this.setData({
        ifEdit: false,
        ifJump: false,
      })
    }
  },
  openAlert: function() {
    wx.showModal({
      content: 'Too many pictures.',
      showCancel: false,
    });
  },
  chooseImage: function(e) {
    var that = this;
    if (this.data.files.length >= 1) {
      this.openAlert()
    } else {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            files: that.data.files.concat(res.tempFilePaths)
          });
        }
      })
    }
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
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
        var i = app.groupList.length
        this.data.temp.id = i + 1
        if (this.data.title != "") {
          this.data.temp.title = this.data.title
        } else {
          this.data.temp.title = "Title " + this.data.temp.id
        }
        if (this.data.files.length != 0) {
          this.data.temp.src = this.data.files[0]
        } else {
          this.data.temp.src = "../../images/noImage.png"
        }
        if (this.data.text.length > 0) {
          this.data.temp.text = this.data.text
        } else {
          this.data.temp.text = "No detailed information."
        }
        var ttime = util.formatTime(new Date());
        this.data.temp.time=ttime
        this.data.temp.edit = true
        if (this.data.ifEdit) {
          this.data.temp.id = app.groupList[this.data.editId].id
          this.data.temp._id = app.groupList[this.data.editId]._id
          app.groupList[this.data.editId] = this.data.temp
          this.cloudedit()
        } else {
          app.groupList[i] = this.data.temp
          this.cloudupload()
          app.hostList[i] = app.globalData.userInfo
        }
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
  delete_image: function() {
    this.setData({
      files: []
    })
  },
  cloudupload: function () {
    wx.cloud.uploadFile({
      cloudPath: 'group/' + this.data.temp.id + '.png', // 上传至云端的路径
      filePath: this.data.temp.src, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        this.data.temp.src = res.fileID
        const db = wx.cloud.database()
        const sell = db.collection('group')
        console.log(this.data.temp)
        db.collection('group').add({
          data: {
            edit: false,
            id: this.data.temp.id,
            text: this.data.temp.text,
            text_simple: this.data.temp.text_simple,
            time: this.data.temp.time,
            title: this.data.temp.title,
            src: this.data.temp.src
          },
          success: function (res) {
            console.log(res)
          },
          fail: console.error
        })
      },
      fail: console.error
    })
  },
  cloudedit: function () {
    wx.cloud.uploadFile({
      cloudPath: 'group/' + app.groupList[this.data.editId].id + '.png', // 上传至云端的路径
      filePath: this.data.temp.src, // 小程序临时文件路径
      success: res => {
        const db = wx.cloud.database()
        const sell = db.collection('group')
        db.collection('group').doc(app.groupList[this.data.editId]._id).update({
          data: {
            edit: false,
            id: this.data.temp.id,
            src: this.data.temp.src,
            text: this.data.temp.text,
            text_simple: this.data.temp.text_simple,
            time: this.data.temp.time,
            title: this.data.temp.title,
          },
          success: function (res) {
            console.log(res.data)
          }
        })
      },
      fail: console.error
    })
  }
});