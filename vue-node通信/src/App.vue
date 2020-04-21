<template>
  <div id="app">
    <ul id="toolbar" v-if="signIn">
      <li :class='chart?"on":""' @click="chartFn">消息</li>
      <li :class='friend?"on":""' @click="friendFn">好友<span v-if="friendCount==0?false:true">{{friendCount}}</span></li>
      <li :class='my?"on":""' @click="myFn">我的</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
      chart:true,
      friend:false,
      my:false,
      connectUrl:this.$store.state.connectUrl,
      userId:this.$store.state.userId?this.$store.state.userId:this.$cookie.get('userId'),
      friendCount:'',
      // signIn:true
    }
  },
  created(){
    
    // this.$router.push({path:'/chatList'})
    this.newFriendList()
    // console.log(this.friendCount)
  },
  computed: {
    signIn:function(){
      if(this.$store.state.login || this.$cookie.get('login')){
        console.log(this.$store.state.signIn)
        return this.$store.state.signIn
      }
    },
    
  },
  components: {
   
  },
  methods:{
    chartFn:function(){
      if(this.$route.path!='/'){
        this.$router.push({path:'/'})
        this.chart=true
        this.friend=false
        this.my=false
      }
    },
    friendFn:function(){
      console.log()
      if(this.$route.path!='/app'){
        this.$router.push({path:'/app'})
        this.chart=false
        this.friend=true
        this.my=false
        this.newFriendList()
      }else{
        this.newFriendList()
      }
      
    },
    myFn:function(){
      if(this.$route.path!='/mydetails'){
        this.$router.push({path:'/mydetails'})
        this.chart=false
        this.friend=false
        this.my=true
      }
    },
    newFriendList(){
        let that =this;
        // setInterval(function(){
            that.axios.get(that.connectUrl+'/newFriend?userId='+that.userId).then(r=>{
                // console.log(r.data.data.length)
                that.friendCount = r.data.data.length
                that.$store.dispatch('friendCounts',r.data.data.length)
            })
        // },1000)
    }
  }
}
</script>

<style lang="stylus">
body,ul,li
  margin 0
  list-style none
  padding 0

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#toolbar
  display flex
  text-align: center;
  background: #F2F2F2;
  height: 50px;
  border-top: 1px solid #F2F2F2;
  align-items: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index 100
  li
    color #000
    font-size 18px
    flex 1
  li.on
    color blue  
</style>
