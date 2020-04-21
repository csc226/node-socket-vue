<template>
    <div id="mydetails">
        <div class="imgBox">
            <img :src="imgUrl" alt="">
            <p>{{nickname}}</p> 
            <p>{{sex}}</p> 
            <el-button type='primary' @click="exit">退出</el-button>
        </div>
    </div>
</template>
<script>
import {Button} from 'element-ui'
export default {
    data() {
        return {
            imgUrl:this.$store.state.myAvatar?this.$store.state.myAvatar:this.$cookie.get('myAvatar'),
            nickname:this.$store.state.myInfo?this.$store.state.myInfo:this.$cookie.get('myInfo'),
            sex:this.$store.state.mySex?this.$store.state.mySex:this.$cookie.get('mySex')
        }
    },
    components:{
        [Button.name]:Button
    },
    created(){
        this.$store.state.signIn=true
    },
    mounted(){
        // console.log(this.imgUrl)
        // console.log(this.$store.state.myInfo)
        // console.log(this.sex)
    },
    methods:{
         exit(){
            this.$cookie.delete('login')
            this.$cookie.delete('myAvatar')
            this.$cookie.delete('myInfo')
            this.$cookie.delete('mySex')
            this.$cookie.delete('userId')
            this.$router.push({path:'/'})
        }
    }

}
</script>

<style lang="stylus">
.imgBox
    text-align center
    padding 50px 0 0
    img
        width 80px
        height 80px
        border-radius 80px
    p
        font-size 16px    
</style>