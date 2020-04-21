<template>
    <div id='socketBox'>
        <div class='socketTitle'>
            <img :class="{'imgGrayscale':imgGrayscale}" src='../images/tx.jpg'>
            <span>
                我是誰呢
            </span>
            <span class="tsTitle" v-if="clientInput">对方正在输入</span>
        </div>
        <div class='socketBody' ref='Box' >
            <ul id='listBox' ref='listBox'>
                <li :class="msg.lei" v-for="(msg,index) in msgList">
                    <img src='../images/tx.jpg'>
                    <span>{{msg.msg}}</span>
                </li>
               
            </ul>
        </div>
        <div class="socketInput">
            <!-- <el-upload 
            action="socket"
            :show-file-list="false">
                 <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
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
            value:'',
            imgGrayscale:true,
            clientInput:false,
            msgList:[],
            msgZd:['你好,我是你的朋友小O']  //自动回复

        }
    },
    components:{
        [Button.name]: Button,
        [Upload.name]: Upload
    },
    created(){
        this.socketJ()
    },
    mounted(){
         this.Scrolls()
    },
    updated(){
        this.Scrolls()
    },
    methods:{
        Scrolls:function(){
            // console.log('执行1次：',this.$refs.listBox.scrollHeight)
            this.$refs.Box.scrollTop = this.$refs.listBox.scrollHeight
        },

        socket:function(){
            const socket = io(this.$store.state.socketUrl)
            if(this.value==""){
                return
            }else{
            socket.emit('client2',this.value)
            this.msgList.push({lei:'listRight',msg:this.value})
            this.value=''
            }
        },
        inputFocus:function(){
            const socket = io(this.$store.state.socketUrl)
            socket.emit('inputFocus2',this.value)
        },
        inputBlur:function(){
            const socket = io(this.$store.state.socketUrl)
            socket.emit('inputBlur2',this.value)
        },

        //加入房间
        // joinRoom:function(){
        //     const socket = io(this.$store.state.socketUrl)
        //     socket.emit('client1','长影缚苍龙s')
        // },
        socketJ:function(){
            const that = this;
            const socket = io(this.$store.state.socketUrl)
            // 判断是否已经连接
            
            socket.on('connect',function(){
                // console.log('已连接')
                that.imgGrayscale=false
            })
            // 判断是否正在输入
            // 是
            socket.on('inputFocus1',function(msg){
                // console.log(msg)
                that.clientInput=msg
            })
            // 否
            socket.on('inputBlur1',function(msg){
                // console.log(msg)
                that.clientInput=msg
            })
            socket.on('大晴天儿ShuTIG',function(msg){
                 console.log('收到2')
                that.msgList.push({lei:'listLeft',msg:msg})
            })
        
        }
    }
}
</script>

<style lang="stylus">
    #socketBox
        width calc(100vw)
        height calc(100vh - 50px)
        margin 0 auto
        background url('../images/bj.gif') no-repeat center
        background-size cover
        filter opacity(0.7)
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
                content ''
                animation spin 1.5s infinite
            @keyframes spin {
                0% {content: '.'}
                30% {content: '..'}
                40% {content: '...'}
                60% {content: '....'}
                80% {content: '.....'}
                100% {content: '.....'}
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
            position fixed
            bottom 0
            text-align center
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