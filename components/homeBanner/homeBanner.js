import {getBannerlist} from '../../api/banner'

Component({
  options:{
    styleIsolation:"apply-shared"
  },
 
  properties: {

  },

  data: {
    bannerlist:[],
    current_img:0,
    altarr:[]
  },
  
  attached(){
    getBannerlist().then(res=>{
      this.setData({
        bannerlist:res.data.data.splice(0,4),
      })
      let arr = [];
      this.data.bannerlist.forEach(item=>{
        arr.push(item.alt)
      })
      this.setData({
        altarr:arr
      })  
    })
  },

  methods: {
    handleChange(e){
      this.setData({
        current_img:e.detail.current
      })
    }
  }
})
