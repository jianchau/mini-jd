// packageOrder/pages/addAddress/addAddress.js
import areaList from '../../../utils/area'
import {addAddress,setDealAddress} from '../../../api/address'
const app = getApp()
Page({
  data: {
    telNumber:'',
    userName:'',
    detailInfo: '',
    areaList:areaList,
    visiable: false,
    pcc:'',
    provinceName: '', 
    cityName:'', 
    countyName: '', 
    isDefault: false,
    backDelta:1
  },
  handleUserName:function(e){
    this.setData({
      userName:e.detail
    })
  },
  handleTelNumber:function(e){
    this.setData({
      telNumber:e.detail
    })
  },
  handleDetailInfo:function(e){
    this.setData({
      detailInfo:e.detail
    })
  },
  handleDefaultStatus:function(e){
    console.log(e.detail);
    this.setData({
      isDefault:e.detail
    })
  },
  showAddressPicker () {
    this.setData({
      visiable: true
    })
  },
  onClickHide () {
    this.setData({
      visiable: false
    })
  },
  getAddress ( e ) {
    console.log(e.detail.values)
    if (e.detail.values[0].name === '') {
      wx.showToast({
        title: '请选择省份',
        icon:'none'
      })
    } 
    else {
      if (e.detail.values[1].name === '') {
        wx.showToast({
          title: '请选择城市',
          icon:'none'
        })
      } 
      else {
        if (e.detail.values[2].name === '') {
          wx.showToast({
            title: '请选择区县',
            icon:'none'
          })
        } 
        else {
          this.setData({
            visiable: false,
            provinceName: e.detail.values[0].name,
            cityName: e.detail.values[1].name,
            countyName: e.detail.values[2].name
          })
          const {provinceName,cityName,countyName} = this.data
          const frontPcc = provinceName===cityName?provinceName:provinceName+cityName
          const pcc = frontPcc + countyName
            this.setData({
              pcc
            })
        }
      }
    }
  },
  cancelAddress () {
    this.setData({
      visiable: false
    })
  },
  saveAddress () {
    console.log(this.data.isDefault)
    addAddress({
      userid: app.globalData.userid,
      token: app.globalData.token,
      userName: this.data.userName, 
      telNumber: this.data.telNumber, 
      provinceName: this.data.provinceName, 
      cityName:this.data.cityName, 
      countyName: this.data.countyName, 
      detailInfo: this.data.detailInfo,
      isDefault: this.data.isDefault
    })
    .then(res=>{
      if (res.data.code==='10119') {
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        })
        wx.navigateTo({
          url: '/pages/login/login',
        })
      } 
      else {
        console.log('addressid',res.data.addressid);
        setDealAddress({addressid:res.data.addressid})
        .then((res)=>{
          console.log('ssuce',res);
        })
        wx.showToast({
          title: '添加成功',
          icon:'none'
        })
        console.log('delta',this.data.backDelta);
        wx.navigateBack({
          delta:this.data.backDelta,
        })
      }
    })
  },
  imprtfromwx(){
    wx.chooseAddress({
      success (res) {
        res
      }
    })
  },
  onLoad: function (options) {
    console.log(options.backDelta);
   this.setData({
     backDelta:options.backDelta*1
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