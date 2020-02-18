Component({
  methods: {
    handleBackTop(){
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  }
})
