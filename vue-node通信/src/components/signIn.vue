<template>
    <div id="signInBox">
        <h3>用户登录</h3>
        <el-form class="formBox" :model="form">
            <el-form-item label="昵称" label-width="50px">
                <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
                <i class="ts" v-if="tsN">请输入用户名</i>
            </el-form-item>
            <el-form-item label="密码"  label-width="50px">
                <el-input v-model="form.password" show-password placeholder="请输入密码"></el-input>
                <i class="ts" v-if="tsP">请输入密码</i>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="signIn">登录</el-button>
                <el-button type="primary" size="medium" @click="signUp">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {Button,Form,FormItem,Input,Message} from 'element-ui';
export default {
    name:'signIn',
    data() {
        return {
            connectUrl:this.$store.state.connectUrl,
            form:{
                nickname:"",
                password:"",
                // tsN:false,
                // tsP:false
            }
        }
    },
    mounted() {
    },
    components:{
        [Button.name]:Button,
        [Form.name]:Form,
        [FormItem.name]:FormItem,
        [Input.name]:Input,
        [Message.name]:Message
    },
    computed: {
        tsN:function(){
            if(this.form.nickname==""){
                return true
            }
        },
        tsP:function(){
            if(this.form.password==""){
                return true
            }
        }
    },
    methods:{
        signIn:function(){
            if(this.form.nickname!=""&&this.form.password!=""){
            // console.log("昵称：",this.form.nickname,"密码：",this.form.password)
            // http://192.168.1.125:3000/login?nickname=陈晨&password=122
            this.axios.get(this.connectUrl+'/login?nickname='+this.form.nickname+'&password='+this.form.password).then((r)=>{
                console.log(r)
                if(r.data.msg=="登录成功"){
                    this.$cookie.set('userId',r.data.data[0].id)
                    this.$cookie.set('login','true')
                    this.$cookie.set('myInfo',r.data.data[0].nickname)
                    this.$cookie.set('myAvatar',r.data.data[0].avatar)
                    this.$cookie.set('mySex',r.data.data[0].sex==0?"男":'女')
                    this.$store.dispatch('userInfo',r.data)
                    this.$router.push({path:'/app'})
                }else{
                    Message.error('用户名或密码错误')
                }
            })
            }
        },
        signUp:function(){
            this.$router.push({path:'/signUp'})
            // this.$router.push({path:'/socketF'})
        }
    }
}
</script>

<style lang="stylus">
#signInBox
    h3 
        padding 0
        margin 0
        width 100%
        height 50px
        line-height 50px
        text-indent 20px
        background-image linear-gradient(to right,#FE0000,#F26403)
        color #fff
    .formBox
        width 90%
        margin 40px auto
    .el-form-item__content
        margin-left 80px
        .ts
            position absolute
            left 0
            top 31px
            font-size 10px
            font-style normal
            color red
            
</style>