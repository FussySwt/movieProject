<template>
    <div>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"><button @click="handleVerify" class="send" :disabled="isClickable">{{sendContent}}</button></mt-field>
        <mt-field label="用户名" placeholder="请输入用户名" type="text" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field label="确认密码" placeholder="请输入确认密码" type="password" v-model="InfoPassword"></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" type="text" v-model="verify"></mt-field>
</mt-field>
        <div class="register_btn">
            <input type="submit" value="注册" @click="handleToRegister">
        </div>
        <div class="register_link">
            <router-link to="/center/login">立即登录</router-link>
            <router-link to="/center/findPassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { messagebox } from '@/components/JS'
export default {
    name: 'register',
    data () {
        return {
            sendContent: '发送验证码',
            email: '',
            username:'',
            password: '',
            InfoPassword: '',
            verify: '',
            isClickable:false,
            clickTimes:0
        }
    },
    methods: {
        handleVerify(){
            if(this.clickTimes === 0){
                this.clickTimes = 1
                axios.get(`/api2/users/verify?email=${this.email}`).then(res=>{
                    this.clickTimes = 0
                    if(res.data.status === 0){
                        var _this = this
                        messagebox({
                            title: '验证码',
                            content: '验证码发送成功！',
                            cancel: '确定'
                        })
                        var i = 60;
                        var timer = setInterval(() => {
                            _this.sendContent = `还剩${i}秒`
                            _this.isClickable = true
                            i--
                            if(i === -1){
                                clearInterval(timer)
                                _this.isClickable = false
                                _this.sendContent = `发送验证码`
                            }
                        }, 1000);
                    }else{
                        messagebox({
                            title: '验证码',
                            content: '验证码发送失败！',
                            cancel: '确定'
                        })
                    }
                })
            }
        },
        handleToRegister(){
            if(this.username === ""){
                messagebox({
                    title:'注册',
                    content:'用户名不能为空',
                    cancel:'确认'
                })
                return
            }
            if(this.password === ""){
                messagebox({
                    title:'注册',
                    content:'密码不能为空',
                    cancel:'确认'
                })
                return
            }
            if(this.password !== this.InfoPassword){
                messagebox({
                    title:'注册',
                    content:'密码不一致',
                    cancel:'确认'
                })
                return
            }
            axios.post('/api2/users/register',{
                username: this.username,
                password: this.password,
                email: this.email,
                verify: this.verify
            }).then(res=>{
                if(res.data.status !== 0){
                     messagebox({
                    title:'注册',
                    content:res.data.msg,
                    cancel:'确认'
                })
                }else{
                    var _this = this
                    messagebox({
                        title: '注册',
                        content: '注册成功！',
                        ok: '确认',
                        handleOk(){
                            _this.$router.push('/center/login')
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .send{
        padding: 5px;
    }
    .register_btn{
        height:50px;
        margin:10px;
        input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
    }
    .register_link{
        display: flex;
        justify-content:space-between;
        a{
            text-decoration: none;
            margin:0 5px;
            font-size: 12px;
            color:#e54847;
        }
    }
</style>
