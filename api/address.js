import request from '../utils/request'
export function addAddress (params) {
  return request.post('/api/address/addAddress', params)
}
export function getAddressList (params){
  return request.get('/api/address/addresslist',params)
}
export function setDealAddress (params){
  return request.get('/api/address/setDealAddress',params)
}
