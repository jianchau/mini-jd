import {getProList} from '../../api/pro'
Page({
  data: {
    proData:[],
    count:1
  },
  onLoad: function (options) {
    getProList({count:this.data.count,limitNum:20}).then(res=>{
      const arr = res.data.data[1]
      arr.forEach(item=>{
        const price = (item.originprice*item.discount/10).toFixed(2)+''
        price.indexOf('.')>-1?(item.showPrice = price.split('.')[0]):(item.showPrice = price)
        price.indexOf('.')>-1?(item.otherPrice = price.split('.')[1]):item.otherPrice = '00'
      })
      this.setData({
        proData:arr,
        count:this.data.count+1
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
    getProList({count:1,limitNum:20}).then(res=>{
      const arr = res.data.data[1]
      arr.forEach(item=>{
        const price = (item.originprice*item.discount/10).toFixed(2)+''
        price.indexOf('.')>-1?(item.showPrice = price.split('.')[0]):(item.showPrice = price)
        price.indexOf('.')>-1?(item.otherPrice = price.split('.')[1]):item.otherPrice = '00'
      })
      this.setData({
        proData:arr,
        count:2
      })
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
    })
  },

  onReachBottom: function () {
    getProList({ count: this.data.count,limitNum:20 }).then(res => {
      let arr = res.data.data[1]
      if(arr.length===0){
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
      }
      else{
        arr.forEach(item => {
          const price = (item.originprice * item.discount / 10).toFixed(2) + ''
          price.indexOf('.') !== -1 ? (item.showPrice = price.split('.')[0]) : (item.showPrice = price)
          price.indexOf('.') !== -1 ? item.otherPrice = price.split('.')[1] : item.otherPrice = '00'
        })
        this.setData({
          proData: [ ...this.data.proData, ...arr],
          count: this.data.count + 1
        })
      }  
    })
  },

  onShareAppMessage: function () {

  }
})