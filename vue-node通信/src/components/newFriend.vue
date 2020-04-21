<template>
    <div id='newFriendBox'>
        <h1><span stye='margin-right:10px' @click="fh"><</span>新的朋友</h1>
        <ul>
            <li class="newFriendList" v-for="(item,index) in friendList" :id='item.newFriendId' :data-id='index'>
                <button class="accept" v-if="item.is_accept==1?true:false" @click="acceptFn" >接受</button>
                <span class="accept" style="background:#fff;color:#909399;" v-if='item.is_accept==0?true:false'>已添加</span>
                <!-- <span class="accept" style="background:#fff;color:#909399;" v-if='item.is_accept==2?ture:false'>已拒绝</span> -->
                <img :src="item.avatar" alt="" class="serAvatar">
                <span class="serNickname">{{item.nickname}}</span>
                <!-- <span class='serSex'>{{item.sex==0?"男":"女"}}</span> -->
                <span class='serSex'>{{item.introduce}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {Button} from 'element-ui'
export default {
    data() {
        return {
            accept:false,
            userId:this.$store.state.userId?this.$store.state.userId:this.$cookie.get('userId'),
            connectUrl:this.$store.state.connectUrl,
            friendList:[],
        }
    },
    components:{
        [Button.name]:Button
    },
    created(){
        this.$store.state.signIn=false
        this.newFriendList()
    },
    methods:{
        newFriendDrtails(sendId,introduces,isAccept,newFriendId){
            this.axios.get(this.connectUrl+'/newFriendDetails?sendId='+sendId).then(r=>{
                r.data.data[0].introduce=introduces
                r.data.data[0].is_accept=isAccept
                r.data.data[0].newFriendId=newFriendId
                // console.log(r.data.data[0])

                this.friendList.push(r.data.data[0])
            })
        },
        newFriendList(){
            this.axios.get(this.connectUrl+'/newFriend?userId='+this.userId).then(r=>{
                // console.log(r.data.data)
                for(let i=0;i<r.data.data.length;i++){
                    // console.log(r.data.data[i].introduce)
                    this.newFriendDrtails(r.data.data[i].send_id,r.data.data[i].introduce,r.data.data[i].is_accept,r.data.data[i].id)
                }
            })
        },
        acceptFn(e){
            // console.log(e)
            this.axios.get(this.connectUrl+'/acceptFriend?isAccept=0&id='+e.path[1].id).then(r=>{
                // console.log(this.friendList[e.path[1].dataset.id])
                this.$set(this.friendList[e.path[1].dataset.id],'is_accept',0)
            })
        },
        fh(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="stylus">
#newFriendBox
    h1
        margin 0;
        text-indent 10px
        background #cccccc
    .newFriendList
        padding 10px 20px
        border-bottom 1px solid #eee
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
        .accept
            width 60px
            height 30px
            font-size 14px 
            background #e6e6e6
            float: right;
            outline: none;
            border: none;
            color: #5daf34;
            margin-top 16px; 
</style>