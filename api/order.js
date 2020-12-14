import request from './../utils/request'
export function addOrder(params){
  return request.post('/api/order/addOrder',params)
}