import {getAddressList,setDealAddress} from '../../../api/address'
const app = getApp()
Page({
  data: {
    datalist:[]
  },

  toAddAddress:function(){
    wx.navigateTo({
      url: '/packageOrder/pages/addAddress/addAddress?backDelta=2',
    })
  },
  importfromwx:function(){
    wx.chooseAddress({
      success (res) {
        res
      }
    })
  },
  chooseDealAddress:function(e){
    const addressid = e.target.dataset.addressid
    console.log('addressid',addressid);
    setDealAddress({addressid})
    .then(res=>{
      console.log(res)
    })

    wx.navigateBack({
      delta: 1,
    })
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },

  onShow: function () {
    getAddressList({userid:app.globalData.userid})
    .then(res=>{
      const datalist = res.data.data
      this.setData({
        datalist
      })
    })
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