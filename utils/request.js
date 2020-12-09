const baseUrl = "http://10.20.159.102:3333"

export default {
  get(url,data={}){
    wx.showLoading()
    return new Promise((resolve,reject)=>{
      wx.request({
        url:baseUrl + url,
        data:data,
        method:'GET',
        success:(res)=>{
          resolve(res)
        },
        fail:()=>{
          reject()
        },
        complete:()=>{
          wx.hideLoading()
        }
      })
    })
  },

  post (url,data){
    return new Promise((resolve,reject)=>{
      wx.request({
        url:baseUrl + url,
        data:data||{},
        method:'POST',
        success:(res)=>{
          resolve(res)
        },
        fail:()=>{
          reject()
        },
        complete:()=>{
          wx.hideLoading()
        }
      })
    })
  }
}