// pages/newsDetails/newsDetails.js
Page({

 onLoad(){
   
  wx.request({
    url: 'https://test-miniprogram.com/api/news/detail',
    data: {
      id: wx.getStorageSync('id')
    },
    success: res => {
      let result=res.data.result
      let content=result.content
      let title=result.title
      let time = new Date(result.date).toJSON()
      let source=result.source
      let text=[]
      let picturePath=[]
    
      //let textAndImage={}
      for(let i=0,j=0,k=0;i<content.length;i++){
        
        if (content[i].text) 
        { text[j] = content[i].text
          i++
          j++   
        
        }
        else {
          if (content[i].src) 
          { picturePath[k] = content[i].src
          k++ ;i++} 
          else { i++ }
        }
        }
      
       console.log(text)
       console.log(picturePath)
     
      this.setData({
        title:title,
        time: new Date(+new Date(time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''),
        source:source,
        text:text,
        picturePath: picturePath,
        
      })
     // console.log(res)
      //console.log(content)
    }
  })
  
},
//getNews(id) {
  
//  }
   
})