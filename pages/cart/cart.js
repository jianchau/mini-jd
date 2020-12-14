// pages/cart/cart.js
import {getPersonalCart,cartRecommend} from '../../api/cart'
const app = getApp()
Page({
  data: {
    cartlist: [],
    emptyFlag: true,
    recommendlist: []
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {
    getPersonalCart({
      token: app.globalData.token,
      userid: app.globalData.userid
    })
    .then(res => {
      if (res.data.code === '10119') {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
      if (res.data.code === '10009') {
        this.setData({
          emptyFlag: true
        })
      } 
      else {
        let listarr = res.data.data
        for(let x=0;x<listarr.length/2;x++){
          let temp=listarr[x];
          listarr[x]=listarr[listarr.length-1-x];
          listarr[listarr.length-1-x]=temp;
        }
        listarr.map(item => {
          const price = (item.originprice * item.discount / 10).toFixed(2) + ''
          price.indexOf('.') !== -1 ? (item.showPrice = price.split('.')[0]) : (item.showPrice = price)
          price.indexOf('.') !== -1 ? item.otherPrice = price.split('.')[1] : item.otherPrice = '00'
        })
        this.setData({
          cartlist: listarr,
          emptyFlag: false
        })
      }
    })
    .catch(err=>console.log(err))

    cartRecommend({
      token: app.globalData.token,
    })
    .then(res => {
      const arr = res.data.data
      arr&&arr.map(item => {
        const price = (item.originprice * item.discount / 10).toFixed(2) + ''
        price.indexOf('.') !== -1 ? (item.showPrice = price.split('.')[0]) : (item.showPrice = price)
        price.indexOf('.') !== -1 ? item.otherPrice = price.split('.')[1] : item.otherPrice = '00'
      })
      this.setData({
        recommendlist: res.data.data
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