Page({

  data: {
    flag:false
  },

  onLoad: function (options) {

  },
  toAddresslist(){
    wx.navigateTo({
      url: '/packageOrder/pages/address/address',
    })
  },
  toAddAddress(){
   wx.navigateTo({
     url: '/packageOrder/pages/addAddress/addAddress',
   })
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