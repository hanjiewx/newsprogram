// pages/newsDetails/newsDetails.js
Page({
data:{
 content:{},
 id:''
 },
 onLoad:function(options){
  this.setData({
    id:options.id
    })
  wx.request({
    url: 'https://test-miniprogram.com/api/news/detail',
    data: {
      id: this.data.id
    },
    success: res => {
      let result=res.data.result
      let count=result.readCount
      let content=result.content
      let title=result.title
      let time = new Date(result.date).toJSON()
      let source=result.source
      this.setData({
        title:title,
        time: new Date(+new Date(time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''),
        source:source,
        count:count,
        content:content,
      })
  }
  })
  
},

   
})