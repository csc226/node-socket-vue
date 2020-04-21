<template>
  <div id="people">
    <h1>消息</h1>
    <div id='peopleWrap'>
      <ul id='peopleBox'>
        <li v-for="(item,index) in chatList" @click.stop='sendMsg' class="listBox" :data-id='item.id'>
          <img :src="item.another_id!=userId?item.another_avatar:item.user_avatar" class='listImg'>
          <span class='nameBox'>
            <font class='name'>{{item.another_id!=userId?item.another_id:item.user_id}}</font>
            <font class="newMsg">{{item.content}}</font>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      connectUrl:this.$store.state.connectUrl,
      userId:this.$store.state.myInfo?this.$store.state.myInfo:this.$cookie.get('myInfo'),
      chatList:[]
      
    }
  },
  created(){
    this.getChatList()
    this.$store.state.signIn=true
  },
  components: {

  },
  methods:{
      sendMsg:function(e){
        // console.log(e)
          if(e.target.className=='listBox'){
            this.$router.push({path:'/socketF',query:{name:e.target.children[1].children[0].innerText,nameUrl:e.target.children[0].currentSrc,chatId:e.target.dataset.id}})
          }else if(e.target.className=='listImg'){
            this.$router.push({path:'/socketF',query:{name:e.path[1].children[1].children[0].innerText,nameUrl:e.target.currentSrc,chatId:e.path[1].dataset.id}})
          }else if(e.target.className=='name'){
            this.$router.push({path:'/socketF',query:{name:e.target.innerText,nameUrl:e.path[2].children[0].currentSrc,chatId:e.path[2].dataset.id}})
          }else if(e.target.className=='newMsg'){
            this.$router.push({path:'/socketF',query:{name:e.path[1].children[0].innerText,nameUrl:e.path[2].children[0].currentSrc,chatId:e.path[2].dataset.id}})
          }else if(e.target.className=='nameBox'){
            this.$router.push({path:'/socketF',query:{name:e.target.children[0].innerText,nameUrl:e.path[1].children[0].currentSrc,chatId:e.path[1].dataset.id}})
          }
        //   // console.log(e)
        //   // console.log(e.path[1].children[0].currentSrc)
        //   // console.log(e.target.imgUrl)
        //   this.$router.push({path:'/socketF',query:{name:e.target.firstChild.innerText,nameUrl:e.target.imgUrl}})
      },
      getChatList(){
        this.axios.get(this.connectUrl+'/getChatUser?userId='+this.userId).then(r=>{
          // console.log(r.data.data)
          this.chatList=r.data.data
          const listL=r.data.data.length;
          for(let i=0;i<listL;i++){
            this.axios.get(this.connectUrl+'/getchatDetails?chatId='+r.data.data[i].id).then(r=>{
              // console.log(r)
              if(r.data.data.length!=0){
                this.$set(this.chatList[i],"content",r.data.data[0].content)
              }else{
                this.$set(this.chatList[i],"content"," ")
              }
            })
          }
        })
      }
  }
}
</script>

<style lang="stylus">

h1
  padding 0
  margin 0
  height 50px
  line-height 50px
  font-size 18px
  color #fff
  text-indent 10px
  background-image linear-gradient(to right,#FE0000,#F26403)
#peopleWrap
  width 92%
  height calc(100vh - 60px)
  overflow-y scroll
  margin 0 auto
#peopleBox
  li
    clear both
    margin 10px 0 
    height 50px
    img
      width 50px
      height 50px;
      border-radius 50px
      float left
    span
      width calc(100% - 50px - 20px)
      height 50px
      display inline-block
      line-height 30px
      font-size 18px;
      color #000
      position relative
      margin-left 10px
      border-bottom 1px solid #f9f7f7
      .name
        position absolute
        left 0
        top 0
      .newMsg
        position absolute
        left 0
        bottom 0
        font-size 14px
        color #999999
</style>
