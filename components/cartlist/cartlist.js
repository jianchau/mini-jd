// components/cartlist/cartlist.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {updateCartFlag,updateCartAllFlag,updateCartNum,deleteCart} from '../../api/cart'
const app = getApp()
Component({
  properties: {
    cartlist: Array
  },
  data: {
    totalPrice: 0,
    totalNum: 0,
    allFlag: true
  },
  observers: {
    "cartlist": function (cartlist) {
      const flag = this.data.cartlist.every(item => item.flag)
      const totalPrice = cartlist.reduce((sum, item) => {
        return item.flag ? ((((item.originprice * item.num *item.discount/10).toFixed(2)*1 + sum)*1).toFixed(2))*1 : sum + 0
      }, 0)
      const totalNum = cartlist.reduce((sum, item) => {
        return item.flag ? item.num + sum : sum + 0
      }, 0)
      this.setData({
        totalPrice,
        totalNum,
        allFlag: flag
      })
    }
  },
  methods: {
    selectItem (e) {
      const arr = this.data.cartlist
      const index = e.target.dataset.index
      updateCartFlag({cartid:arr[index].cartid,flag:e.detail}).then(res=>{
        arr[index].flag = e.detail
        this.setData({
          cartlist: arr,
        })
      }) 
    },
    selectAll (e) {
      const arr = this.data.cartlist
      const userid = arr[0].userid
      updateCartAllFlag({
        userid,
        flag: e.detail,
        token: app.globalData.token
      })
      .then(() => {
        arr.forEach(item => {
          item.flag = e.detail
        })
        this.setData({
          allFlag: e.detail,
          cartlist: arr
        })
      })
    },
    onNumChange (e) {
      const num = e.detail
      const index = e.target.dataset.index
      const arr = this.data.cartlist
      updateCartNum({
        cartid: arr[index].cartid,
        num,
        token: app.globalData.token
      })
      .then(() => {
        arr[index].num = num
        this.setData({
          cartlist: arr
        })
      })
    },
   onClickButton(){
      wx.navigateTo({
        url: '/packageOrder/pages/confirm/confirm',
      })
    },
    removeItem(e){
      const { cartid, index } = e.target.dataset 
      Dialog.confirm({
        title: '确认删除',
        message: '你确定要移除这个商品吗？',
      })
      .then(() => {
        const arr = this.data.cartlist
        deleteCart({
          cartid,
          token: app.globalData.token
        })
        .then(() => {
          arr.splice(index, 1)
          const allFlag = arr.every(item => {
            return item.flag
          })
          this.setData({
            cartlist: arr,
            allFlag
          })
        })
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }
})
