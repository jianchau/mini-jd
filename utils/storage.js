export function setItem(key,data){
  wx.setStorageSync(key,data)
}

export function getItem(key){
  return wx.getStorageSync(key)
}