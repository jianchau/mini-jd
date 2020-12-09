// components/cartlist/cartlist.js
import {updateCartFlag,updateCartAllFlag,updateCartNum} from '../../api/cart'
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
        return item.flag ? item.originprice * item.num + sum : sum + 0
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
        console.log(res);
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
  }
})
