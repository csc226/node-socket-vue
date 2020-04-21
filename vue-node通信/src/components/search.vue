<template>
    <div id='searchBox'>
        <div class="searchBox">
            <h3><span @click="fh"><</span>添加朋友</h3>
            <el-input v-model="searchNickname" placeholder="昵称" class='serInput'>
                 <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button type="primary" @click="searchBt">搜索</el-button>
        </div>
        <div v-if='ts' style="text-align: center;padding:20px 0;">该用户不存在</div>
        <div v-if='friend.length!=0' class="searchShowBox">
            <div v-for="(item,index) in friend" class='searchShow' :data-id='item.id'>
                <img :src="item.avatar" alt="" class="serAvatar">
                <span class="serNickname">{{item.nickname}}</span>
                <span class='serSex'>{{item.sex==0?"男":"女"}}</span>
            </div>
            <div class="addFriend" v-if='!isFriend' @click="addFriend">添加好友</div>
            <div class="addFriend" v-if='isFriend' @click="sendMsg">发送消息</div>
        </div>
        
       
    </div>
</template>

<script>
import {Input,Button} from 'element-ui'
export default {
    data() {
        return {
            userId:this.$store.state.myInfo?this.$store.state.myInfo:this.$cookie.get('myInfo'),
            searchNickname:'',
            connectUrl:this.$store.state.connectUrl,
            friend:[],
            ts:false,
            isFriend:false,
            anotherId:''
        }
    },
    components:{
        [Input.name]:Input,
        [Button.name]:Button,
    },
    created(){
        this.$store.state.signIn=false
    },
    methods:{
        fh:function(){
            this.$router.go(-1)
        },
        isFriendFn:function(){
            this.axios.get(this.connectUrl+'/isFriend?userId='+this.userId+'&nickname='+this.friend[0].nickname).then(r=>{
                // console.log(r.data)
                if(r.data.length!=0){
                    this.isFriend=true
                    return
                }else{
                    this.isFriend=false
                    return
                }
            })
        },
        searchBt:function(){
            this.axios.get(this.connectUrl+'/searchFriend?nickname='+this.searchNickname).then(r=>{
                // console.log(r)
                if(r.data.msg=='存在'){
                    this.ts = false
                    this.friend=r.data.data
                    // console.log(this.friend)
                    this.isFriendFn()
                }else{
                    this.friend=""
                    this.ts = true
                }
            })
        },
        sendMsg:function(e){
            // console.log(e)
            this.$router.push({path:'/socketF',query:{name:e.path[1].children[0].children[1].innerText,nameUrl:e.path[1].children[0].children[0].currentSrc,chatId:e.path[1].children[0].dataset}})
        },
        addFriend:function(){
            this.$router.push({path:'/addFriend',query:{anotherId:this.friend[0].id}})
        }
    }
}
</script>

<style lang="stylus">
#searchBox
 .searchBox
  text-align center
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 10px;
  h3
    padding 0
    margin 0
    font-size 16px;
    color #fff
    width 100%
    height 40px
    line-height 40px
    text-align left 
    text-indent 10px
    background-image linear-gradient(to right, #fe0000, #f26403)
    span
        margin-right 10px 
  .serInput
   width calc(78% - 30px)
   margin-top 20px 
 .searchShowBox
    // background #cccccc
    padding 20px 0
    .addFriend
        width calc(78% + 40px)
        height 40px
        margin 0 auto
        background #3a8ee6
        line-height 40px
        text-align center
        font-size 18px
        color #fff
        margin-top 20px
 .searchShow
    width calc(78% + 40px)
    margin 0 auto
    overflow hidden
    .serAvatar
        width 60px
        height 60px
        float left 
        margin-right 8px 
    .serNickname
        display block
        padding-top 5px
        font-size 18px
    .serSex
        margin-top 5px 
        font-size 14px
        color #565656     
        display block
</style>