import {getNavs} from '../../api/nav/'
import {setItem,getItem} from '../../utils/storage'
Component({
  
  properties: {

  },
  data: {
    navlist:[]
  },
  attached: function (){
    getItem('navlist')?(
      this.setData({
        navlist:getItem('navlist')
      })
    ):(
      getNavs().then(res=>{
        let arr = res.data.data.splice(0,10).map(item=>{
          return {
            icon:item.icon,
            name:item.name
          }
        })
        this.setData({
          navlist:arr
        })
        setItem('navlist',arr)
      })
    )
  },
  methods: {

  }
})
