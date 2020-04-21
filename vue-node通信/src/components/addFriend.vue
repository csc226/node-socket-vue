<template>
    <div id='addFriendBox'>
        <h3><span @click="fh"><</span><el-button type='success' class='sendBt' @click='isNewFriend'>发送</el-button></h3>
        <p>申请添加朋友</p>
        <div class="sendReq">
            <span>发送添加朋友申请</span>
            <el-input type='textarea' v-model='textarea' resize='none' rows='3' class="textarea"></el-input>
        </div>
    </div>
</template>

<script>
import {Button,Input} from 'element-ui'
export default {
    data() {
        return {
            textarea:'',
            connectUrl:this.$store.state.connectUrl,
            userId:this.$store.state.userId?this.$store.state.userId:this.$cookie.get('userId'),
        }
    },
    components:{
        [Button.name]:Button,
        [Input.name]:Input,
    },
    created(){
        this.$store.state.signIn=false
        this.getDate()
    },
    mounted(){
        console.log(this.userId)
        
    },
    methods:{
        getDate(){
            // setInterval(() => {
                let date = new Date();
                let y = date.getFullYear();
                let m = parseInt(date.getMonth()+1)<10?"0"+parseInt(date.getMonth()+1):parseInt(date.getMonth()+1);
                let d = date.getDate()<10?"0"+date.getDate():date.getDate();
                this.time= y+'-'+m+'-'+d
                // console.log( this.time)
            // }, 1000);
            
        },
        fh:function(){
            this.$router.go(-1)
        },
        isNewFriend(){
            this.axios.get(this.connectUrl+'/isNewFriend?sendId='+this.userId+'&anotherId='+this.$route.query.anotherId).then(r=>{
                if(r.data.msg=='存在'){
                    if(r.data.data[0].is_accept=='1'){
                        this.$router.push({path:'/app'})
                        return console.log('已申请过了')
                    }else if(r.data.data[0].is_accept=='2'){
                        this.updateFriend()
                    }else if(r.data.data[0].is_accept=='0'){
                        this.$router.push({path:'/app'})
                        return console.log('已通过')
                    }
                 
                }else if(f=='不存在'){
                    this.addFriend()
                }
            })
        },
        addFriend(){
            this.axios.get(this.connectUrl+'/addFriend?userId='+this.userId+'&anotherId='+this.$route.query.anotherId+'&time='+this.time+'&introduce='+this.textarea).then(r=>{
            // this.axios.get(this.connectUrl+'/addFriend?userId='+'1'+'&anotherId='+'8'+'&time='+'2020-04-17'+'&introduce='+'收到').then(r=>{
                // console.log(r)
                if(r){
                    this.$router.push({path:'/app'})
                }
            })
        },
        updateFriend(){
            this.axios.get(this.connectUrl+'/updateFriend?sendId='+this.userId+'&anotherId='+this.$route.query.anotherId+'&time='+this.time+'&introduce='+this.textarea).then(r=>{
                if(e){
                    console.log('失败')
                    this.$router.push({path:'/app'})
                }else
                if(r==1){
                    // console.log('更新成功')
                    this.$router.push({path:'/app'})
                }else
                if(r==0){
                    console.log('更新失败')
                    this.$router.push({path:'/app'})
                }e
            })
        }
    }
}
</script>

<style lang="stylus">
#addFriendBox
    h3
        padding 10px
        margin 0
        height 40px
        line-height 40px
        .sendBt
            float right 
    p
        text-align center
        font-size 18px
        font-weight bold
        
    .sendReq
        width 90%
        margin 0 auto
        span
            font-size 12px
            margin-bottom 5px
            display block
        textarea
            font-size 14px
            background #f1efef

</style>