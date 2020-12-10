import request from '../utils/request'
export function getProList(params){
  return request.post('/api/pro/prolist',params)
}

export function getProDetail(params){
  return request.get('/api/pro/detail',params)
}