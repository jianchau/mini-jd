import request  from './../utils/request'
export function getBannerlist () {
  return request.get('/api/banner')
}
