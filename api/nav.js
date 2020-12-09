import request from '../utils/request'

export function getNavs(){
  return request.get('/api/nav/navlist')
}