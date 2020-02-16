Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    // 1.组件点击切换
    handleItemClick(e){
      const index = e.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('itemclick', { index }, {})
    }
  }
})
