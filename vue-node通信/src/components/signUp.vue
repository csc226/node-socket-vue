<template>
    <div id='signUp'>
        <h3><font style="margin-right:8px;font-size:18px;" @click='fh'><</font>通讯注册</h3>
        <el-form class="formBox" :model="form">
            <el-form-item label="昵称" label-width="80px">
                <el-input type="text" placeholder="例如：陈晨" v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px">
                <el-input show-password placeholder="请输入密码" v-model="form.password" @keyup.13="signUp"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="80px">
                <el-input show-password placeholder="请再次输入密码" v-model="form.passAgain" @keyup.13="signUp"></el-input>
                <i v-if='passAgain' style="color:red;font-style:normal;position: absolute;top:32px;left:0;">两次密码不等!</i>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" size="medium" @click="signUp">注册</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
import {Form,FormItem,Input,Button,Upload,Message} from 'element-ui'
export default {
    name:'signUp',
    data() {
        return {
            form:{
                nickname:'',
                password:'',
                passAgain:''
            },
            // passAgain:false
        }
    },
    components:{
        [Form.name]:Form,
        [FormItem.name]:FormItem,
        [Input.name]:Input,
        [Button.name]:Button,
        [Upload.name]:Upload,
        [Message.name]:Message,
    },
    computed:{
        passAgain:function(){
           if(this.form.passAgain!=this.form.password){
               return true
           }else{
               return false
           }
        }
    },
    methods: {
        signUp:function(){
            // let that = this
            if(this.form.nickname!=""&&this.form.password!=""&&this.form.password==this.form.passAgain){
                this.axios.post('http://192.168.1.125:3000/addData?nickname='+this.form.nickname+'&password='+this.form.password).then((r)=>{
                    if(r.data=='已存在'){
                        Message({
                            message:this.form.nickname+'已存在'
                        })
                        return
                    }
                   if(r.data=='添加成功'){
                        Message({
                            message:'注册成功',
                            type:'success'
                        })
                        setTimeout(()=>{
                            this.$router.push({path:'/signIn'})
                        },1000)
                   }
                })
            // console.log(this.form.nickname)
            
            }
        },
        fh:function(){
            this.$router.go(-1)
        }
    },
}
</script>

<style lang="stylus">
#signUp
    width 100%
    margin 0 auto
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
</style>