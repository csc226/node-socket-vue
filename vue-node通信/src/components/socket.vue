<template>
    <div id='socketBox'>
        <div class='socketTitle'>
            <!-- <font @click="fh"><</font> -->
            <img :src='nameUrl' :class="{'imgGrayscale':imgGrayscale}">
            <span>{{name}}</span>
            <span class="tsTitle" v-if='clientInput'>对方正在输入</span>
        </div>
        <div class='socketBody' ref='Box'>
            <ul ref='listBox' >
                <li :class="msg.lei" v-for="(msg,index) in msgList">
                    <img :src='msg.user_avatar'>
                    <span>{{msg.content}}</span>
                </li>
            </ul>
        </div>
        <div class="socketInput">
            <input type="text" v-model="value" @focus="inputFocus" @blur="inputBlur" @keyup.13="socket">
            <el-button type='success' size='mini' @click="socket">发送</el-button>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
import {Button,Upload} from 'element-ui';
export default {
    name:'socket',
    data(){
        return {
            name:'',
            nameUrl:'',
            value:'', //输入框
            imgGrayscale:true,
            clientInput:false, //对方正在输入
            connectUrl:this.$store.state.connectUrl,
            userId:this.$store.state.myInfo?this.$store.state.myInfo:this.$cookie.get('myInfo'),
            userAvatar:this.$store.state.myAvatar?this.$store.state.myAvatar:this.$cookie.get('myAvatar'),
            
            // socketUrl:"http://192.168.1.125:3000/",
            
            
        //    msgList:[{
        //        lei:'listLeft',
        //        msg:'这是一条消息'
        //    },{
        //        lei:'listRight',
        //        msg:'这是一条消息12'
        //    }]

        msgList:[]
        }
    },
    components:{
        [Button.name]: Button,
        [Upload.name]: Upload
    },
    created(){
        this.socketJ()
        this.getChatDetailsList()
        this.$store.state.signIn=true
        // // console.log(this.$route.query)
        // // console.log(this.userAvatar)
        // this.joinRoom()
    },
    mounted(){
        this.scrollS()
        this.getRoute()
    },
    updated(){
        this.scrollS()
    },
    methods:{
        
        getNewTime:function(){
            let d= new Date();
            let y = d.getFullYear();
            let m = parseInt(d.getMonth()+1)<10?'0'+parseInt(d.getMonth()+1):parseInt(d.getMonth()+1);
            let day = d.getDate()<10?'0'+d.getDate():d.getDate();
            let h = d.getHours();
            let min = d.getMinutes();
            let s = d.getSeconds();
            let time=y+'-'+m+'-'+day+' '+h+':'+min+':'+s;
            return time
        },
        addChatDetails:function(chatId,userId,content,type,time,userAvatar,){
            this.axios.get(this.connectUrl+'/addChatDetails?chatId='+chatId+'&userId='+userId+'&content='+content+'&type='+type+'&time='+time+'&userAvatar='+userAvatar).then(r=>{
                // console.log(r)
                this.value=''
            })
        },
        getChatId:function(userId,content,type,time,userAvatar){
            this.axios.get(this.connectUrl+'/getChatUserOne?userId='+userId+'&anotherId='+this.$route.query.name).then((r)=>{
                // console.log('查询：',r.data) 
                // // console.log(this.value)
                this.updateLatest(r.data.data[0].id,userId,content,type,time,userAvatar)
            })
        },
        updateLatest:function(chatId,userId,content,type,time,userAvatar){
            this.axios.get(this.connectUrl+'/updateChatUerAccept?chatId='+chatId).then(r=>{
                this.addChatDetails(chatId,userId,content,type,time,userAvatar)
            })
        },
        // fh(){
        //     this.$router.go(-1)
        // },
        getRoute:function(){
            this.name=this.$route.query.name
            this.nameUrl=this.$route.query.nameUrl
        },
        scrollS:function(){
            this.$refs.Box.scrollTop = this.$refs.listBox.scrollHeight
        },
       
        // 发送的信息
        socket:function(){            
            const socket = io(this.$store.state.socketUrl)
            if(this.value==''){
                return
            }else{
                socket.emit('client1',{room:this.userId+this.$route.query.name,data:{msg:this.value,user_avatar:this.userAvatar}})
                this.getChatId(this.userId,this.value,'txt',this.getNewTime(),this.userAvatar)
                this.msgList.push({lei:'listRight',content:this.value,user_avatar:this.userAvatar})
            }
        },

        inputFocus:function(){
            const socket = io(this.$store.state.socketUrl)
            socket.emit('inputFocus',{room:this.userId+this.$route.query.name,data:{msg:this.value,user_avatar:this.userAvatar}})
        },
        inputBlur:function(){
            const socket = io(this.$store.state.socketUrl)
            socket.emit('inputBlur',{room:this.userId+this.$route.query.name,data:{msg:this.value,user_avatar:this.userAvatar}})

        },
        // 接收信息
        socketJ:function(){
            const that = this;
            const socket = io(this.$store.state.socketUrl);
            // 是否在线 连接
            socket.on('connect',function(){
                that.imgGrayscale=false
            })
            // 判断是否正在输入
            // 是
            socket.on(this.$route.query.name+this.userId+'F',function(msg){
                // // console.log(msg)
                that.clientInput=msg
            })
            // 否
            socket.on(this.$route.query.name+this.userId+'B',function(msg){
                // // console.log(msg)
                that.clientInput=msg
            })
            socket.on(this.$route.query.name+this.userId,function(data){
                // // console.log('收到')
                that.msgList.push({lei:'listLeft',content:data.msg,user_avatar:data.user_avatar})
            })
        
        },
        //获取历史消息
        getChatDetailsList:function(){
            // console.log(this.$route.query.chatId)
            this.axios.get(this.connectUrl+'/getChatDetailsList?chatId='+this.$route.query.chatId).then((r)=>{
                // // console.log(r)
                this.msgList=r.data.data
                const length = r.data.data.length;
                for(let i=0;i<length;i++){
                    let lei = r.data.data[i].user_id==this.userId?"listRight":"listLeft";
                    this.$set(this.msgList[i],'lei',lei)
                }
            })
        }
    }
}
</script>

<style lang="stylus">
    #socketBox
        width calc(100vw)
        height calc(100vh - 100px)
        margin 0 auto
        background url('../images/bj.gif') no-repeat center
        background-size cover
        filter opacity(0.7)
        position relative
        z-index 9999
        .socketTitle
            width 100%
            height 50px
            line-height 50px
            text-indent 20px
            background-image linear-gradient(to right,#FE0000,#F26403)
            color #ffffff
            font-size 16px;
            img 
                width 30px
                height 30px
                border-radius 30px
                vertical-align middle
            .imgGrayscale
                filter grayscale(100%)    
            span 
                margin-left 8px    
            .tsTitle
                font-size 10px
                margin-left 4px
            .tsTitle:after
                display inline-table
                // width 0
                overflow hidden
                text-indent 0
                content ''
                animation: spin 1.5s infinite
            @keyframes spin{
                0% {content: '.'}
                30% {content: '..'}
                40% {content: '...'}
                60% {content: '....'}
                80% {content: '.....'}
                100% {content: '......'}
              
            }
        .socketBody
            padding 0 10px
            // border 1px solid #000
            height calc(100% - 90px)
            overflow-y scroll
            ul li
                padding 20px 0
                overflow hidden
                img
                    width 50px
                    height 50px
                    float left
                    border-radius 5px
                span 
                    display inline-block
                    padding 13px 10px
                    max-width calc(50%)
                    min-height 24px
                    line-height 24px
                    margin-left 10px
                    font-size 16px;
                    border 1px solid #E7E7E7
                    border-radius 5px
                    position relative
                span:before
                    width 0
                    content ''
                    display block
                    border-width 8px 8px 8px 0;
                    border-style solid 
                    position absolute
            ul .listLeft
                span
                    background #ffffff                    
                span:before
                    border-color transparent #ffffff transparent transparent
                    left -8px
            ul .listRight
                img 
                    float right
                span
                    background #9EEA6A
                    border-color #9EEA6A
                    float right
                    margin-right 10px
                span:before
                    border-width 8px 0 8px 8px
                    border-color transparent transparent transparent #9EEA6A
                    right -8px        
        .socketInput
            background-color #E0DBDB
            width 100%
            height 40px;
            line-height 40px
            position absolute
            bottom 0
            text-align center
            z-index 9999
            input[type='text']
                width calc(90% - 58px)
                height 28px;
                line-height 28px;
                text-indent 10px;
                text-align left 
                border 0;
                outline none 
                background-color #ffffff
</style>