Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  data:{
    isLoad:false
  },
  methods:{
    handleImage(){
      if(!this.data.isLoad){
        this.triggerEvent('imageload')
        this.data.isLoad = true
      }
    }
  }
})
