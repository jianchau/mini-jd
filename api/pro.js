import request from '../utils/request'
export function getProList(){
  return request.post('/api/pro/prolist',{count:1,limitNum:20})
}

export function getProDetail(params){
  return request.get('/api/pro/detail',params)
}