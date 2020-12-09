import {getProList} from '../../api/pro'
Page({
  data: {
    proData:[]
  },
  onLoad: function (options) {
    getProList().then(res=>{
      const arr = res.data.data[1]
      arr.forEach(item=>{
        const price = (item.originprice*item.discount/10).toFixed(2)+''
        price.indexOf('.')>-1?(item.showPrice = price.split('.')[0]):(item.showPrice = price)
        price.indexOf('.')>-1?(item.otherPrice = price.split('.')[1]):item.otherPrice = '00'
      })
      this.setData({
        proData:arr
      })
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})