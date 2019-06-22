const app = getApp()

Page({
  data: {},
  onShareAppMessage: function(e) {
    wx.showShareMenu({
      withShareTicket: true,
      success: function(res) {
        console.log(res)
      },
    })

    return {
      title: "Title",
      path: "pages/group/group",
      success: function(res) {
        console.log(res)
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function(res) {
            console.log(res)
            var encryptedData = res.encryptedData
            encryptedData = decodeURIComponent(encryptedData)
            var iv = res.iv
            iv = decodeURIComponent(iv)
          }
        })
        wx.login({
          success: function(res) {
            var code = res.code
            var signature = signa.signaturetik("token=" + token, "userAccessToken=" + userAccessToken, "code=" + code, "encryptedData=" + encryptedData, "iv=" + iv)
            wx.request({
              url: "",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: {
                "code": code,
                "encryptedData": encryptedData,
                "iv": iv,
                "userAccessToken": userAccessToken,
                "signature": signature,
                "token": token
              },
              success: function(res) {
                console.log(res)
              }
            })
          }
        })
      }
    }

  }
});