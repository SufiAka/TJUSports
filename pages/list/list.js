//list.js
const app = getApp()

Page({
  data: {
    list: [
      {
        id: 'form',
        name: 'FORMS',
        open: false,
        pages: ['button', 'list', 'input', 'slider', 'uploader']
      },
      {
        id: 'widget',
        name: 'WIDGETS',
        open: false,
        pages: ['article', 'badge', 'flex', 'footer', 'gallery', 'grid', 'icons', 'loadmore', 'panel', 'preview', 'progress']
      },
      {
        id: 'feedback',
        name: 'FEEDBACKS',
        open: false,
        pages: ['actionsheet', 'dialog', 'msg', 'picker', 'toast']
      },
      {
        id: 'nav',
        name: 'NAVIS',
        open: false,
        pages: ['navbar']
      },
      {
        id: 'search',
        name: 'SEARCHES',
        open: false,
        pages: ['searchbar']
      }
    ],
    msgList:[
      { id: 1, title: "Title one", time: "2019-5-1 10:00:00", src: "../../images/1.png" }, 
      { id: 2, title: "Title two", time: "2019-5-1 10:00:00", src: "../../images/1.png" }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
})
