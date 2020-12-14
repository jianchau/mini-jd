import {getAddressList} from '../../../api/address'
import {getCartGoing,removeCartGoing} from '../../../api/cart'
import {addOrder} from './../../../api/order'
const app = getApp()
Page({
  data: {
    flag:true,
    telNumber:'',
    userName:'',
    detailInfo: '',
    defaultFlag:false,
    pcc:'',
    provinceName: '', 
    cityName:'', 
    countyName: '', 
    isDefault: false,
    userid:app.globalData.userid,
    cartData:[],
    totalPrice:0,
  },
  toAddresslist(){
    wx.navigateTo({
      url: '/packageOrder/pages/address/address',
    })
  },
  toAddAddress(){
    wx.navigateTo({
      url: '/packageOrder/pages/addAddress/addAddress?backDelta=1',
    })
  },
  onSubmit(){
    console.log(app.globalData.userid,app.globalData.token);
    addOrder({
      userid: app.globalData.userid,
      token: app.globalData.token
    })
    .then(res => {
      removeCartGoing({userid:app.globalData.userid,token:app.globalData.token})
      .then(res=>console.log(res))
    })
    .catch(err=>console.log(err))

  },
  onLoad: function (options) {

  },
  onShow:function(){
    getAddressList({userid:app.globalData.userid})
    .then(res=>{
      const {data} = res.data
      if (data.length===0){
        this.setData({
          flag:false
        })
      }
      else{
        let index  = data.findIndex(item=>{
          return item.isCurrentUse
        })
        index = index===-1?0:index
        const {provinceName,cityName,countyName,detailInfo,userName,telNumber} = data[index]
        this.setData({
          flag:true,
          userName,
          telNumber,
          provinceName,
          cityName,
          countyName,
          detailInfo
      })
      const frontPcc = (provinceName===cityName)?provinceName:provinceName + cityName
      const pcc = frontPcc + countyName +  detailInfo
      this.setData({
        pcc
      })
      }
    })
    getCartGoing({userid:this.data.userid})
    .then((res)=>{
      const cartData = res.data.data
      cartData.map(item => {
        const price = (item.originprice * item.discount / 10).toFixed(2) + ''
        price.indexOf('.') !== -1 ? (item.showPrice = price.split('.')[0]) : (item.showPrice = price)
        price.indexOf('.') !== -1 ? item.otherPrice = price.split('.')[1] : item.otherPrice = '00'
      })
      const totalPrice = cartData.reduce((sum,item)=>{
        return (sum + (item.originprice*item.discount/10).toFixed(2)*1).toFixed(2)*1
      },0)
      this.setData({
        cartData,
        totalPrice
      })
    }).catch(err=>console.log(err))
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