<template>
  <div id="people" >
    <h1>好友列表 
      <i @click.stop="search">+</i>
      <ul v-if="addShow">
        <li @click.stop="openSearch"><span class="addIcon">+</span><span class="addFriend">添加好友</span></li>
        <li @click.stop="newFriend"><span class="addIcon"></span><span class="addFriend">新的朋友</span><span class="friendCount" v-if='friendCount==0?false:true'>{{friendCount}}</span></li>
      </ul>
    </h1>
    <div id='peopleWrap'>
      <ul id='peopleBox'>
        <li v-for="(item,index) in friendList" :data-id='item.chat_id' class="listBox" @click.stop='sendMsg'>
          <img :src="item.another_avatar" class='listImg'>
          <span class='nameBox'>
            <font class='name'>{{item.another_id}}</font>
            <font class="newMsg">{{item.another_sex==0?'女':'男'}}</font>
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
      userAvatar:this.$store.state.myAvatar?this.$store.state.myAvatar:this.$cookie.get('myAvatar'),
      friendList:[],
      addShow:false,
      friendCount:this.$store.state.friendCount,
    }
  },
  created(){
    this.$store.state.signIn=true
    this.getFriendList()    
    this.friendCountFn()    
    // console.log(this.friendList)
  },
  components: {

  },
  methods:{
      friendList1ChatId(userId,anotherId,chatId){
        this.axios.get(this.connectUrl+'/friendListChat?userId='+userId+'&anotherId='+anotherId+'&chatId='+chatId).then(r=>{
          // console.log(r)
        })
      },
      friendList2ChatId(anotherId,userId,chatId){
        this.axios.get(this.connectUrl+'/friendListChat?anotherId='+anotherId+'&userId='+userId+'&chatId='+chatId).then(r=>{
          // console.log(r)
        })
      },
      getChatId:function(userId,anotherId,anotherAvatar){
        this.axios.get(this.connectUrl+'/isChatUser?userId='+userId+'&anotherId='+anotherId).then((r)=>{
          // console.log(r.data.data[0].id)
           this.friendList1ChatId(userId,anotherId,r.data.data[0].id)
           this.friendList2ChatId(userId,anotherId,r.data.data[0].id)
           this.$router.push({path:'/socketF',query:{name:anotherId,nameUrl:anotherAvatar,chatId:r.data.data[0].id}})
        })
      },
      isChatUser:function(userId,anotherId,anotherAvatar,userAvatar,chatUserId){
          var that= this;
          this.axios.get(this.connectUrl+'/isChatUser?userId='+userId+'&anotherId='+anotherId).then((r)=>{
            // console.log(r)
            if(r=='错误'){
              return
            }else
            if(r.data=='不存在'){
                this.axios.get(this.connectUrl+'/isChatUser?userId='+anotherId+'&anotherId='+userId).then(r=>{
                  if(r.data=='不存在'){
                    this.addChatUser(userId,anotherId,anotherAvatar,userAvatar)
                  }else 
                  if(r.data.msg=='存在'){
                    that.$router.push({path:'/socketF',query:{name:anotherId,nameUrl:anotherAvatar,chatId:chatUserId.id}})
                    return
                  }
                })
                
            } else
            if(r.data.msg=='存在'){
              that.$router.push({path:'/socketF',query:{name:anotherId,nameUrl:anotherAvatar,chatId:chatUserId.id}})
              return
            }
          })
        
      },
      addChatUser:function(userId,anotherId,anotherAvatar,userAvatar){
        this.axios.get(this.connectUrl+'/addChatUser?userId='+userId+'&anotherId='+anotherId+'&anAvatar='+anotherAvatar+'&userAvatar='+userAvatar).then(r=>{
              // console.log(r)
              this.getChatId(userId,anotherId,anotherAvatar)
            })
      },
      sendMsg:function(e){
        // console.log(e)
        
        // console.log(this.userId)
        
          if(e.target.className=='listBox'){
            let chatUserId = e.target.dataset
            this.isChatUser(this.userId,e.target.children[1].children[0].innerText,e.target.children[0].currentSrc,this.userAvatar,chatUserId)
            
          }else if(e.target.className=='listImg'){
            let chatUserId = e.path[1].dataset
            this.isChatUser(this.userId,e.target.children[1].children[0].innerText,e.target.currentSrc,this.userAvatar,chatUserId)
            
          }else if(e.target.className=='name'){
            let chatUserId = e.path[0].path[1].dataset
            this.isChatUser(this.userId,e.target.innerText,e.path[2].children[0].currentSrc,this.userAvatar,chatUserId)
            
          }else if(e.target.className=='newMsg'){
            let chatUserId = e.path[0].path[1].dataset
            this.isChatUser(this.userId,e.path[1].children[0].innerText,e.path[2].children[0].currentSrc,this.userAvatar,chatUserId)
            
          }else if(e.target.className=='nameBox'){
            let chatUserId = e.path[1].dataset
            this.isChatUser(this.userId,e.target.children[0].innerText,e.path[1].children[0].currentSrc,this.userAvatar,chatUserId)
            
          }       
      },
      getFriendList(){
        // console.log(this.userId)
         this.axios.get(this.connectUrl+'/getFriendList?userId='+this.userId).then((r)=>{
          this.friendList=r.data
          // console.log(r)
        })
      },
      search(e){
        this.addShow=this.addShow?false:true
      },
      addShowClose(){
        this.addShow=false
      },
      openSearch(){
        this.$router.push({path:"/search"})
      },
      newFriend(){
        // console.log('100')
        this.$router.push({path:'/newFriend'})
      },
      friendCountFn(){
        // this.$store.dispatch('friendCounts',this.friendCount)
        // friendCount
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
  position relative
h1 i
  display inline-block
  text-align center
  width 24px
  height 24px
  border-radius 24px
  border 1px solid #fff
  text-indent 0
  line-height 24px
  position absolute
  top 12px
  right 20px
h1 ul
    width 120px
    height auto
    padding 0px 10px 10px
    background #4d4d4d
    position absolute
    right 10px;
    top 60px;
    border-radius 5px
    font-weight 300
    z-index 1000
h1 ul:before
    content " "
    display block
    border-width 0 10px 10px 10px
    border-color transparent transparent #4d4d4d transparent
    border-style solid
    position absolute
    top -9px
    right 15px
h1
  ul
    li
      height 42px
      .addFriend
        width 88px
        height 30px
        line-height 30px
        text-indent 0
        border-bottom 1px solid #ffffff21
        display inline-block
      .addIcon
        display inline-block
        width 20px
        text-align center
        text-indent 0
        font-size 16px  
      .friendCount
        position: absolute;
        top: 50px;
        right: 5px;
        display: block;
        height: 20px;
        border-radius: 20px;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
        text-indent: 0;
        padding: 0px 6px;
        background: #f26403;    
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
