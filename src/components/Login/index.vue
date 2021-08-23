<template>
    <div class="login_body">
        <div class="logo"><span class="iconfont icon-google_drive" ref="iconGoogleDrive"></span></div>
        <div>
            <input v-model="username" class="login_text" type="text" placeholder="账户名/手机号/Email" onfocus="this.placeholder=''" onblur="this.placeholder='账户名/手机号/Email'">
        </div>
        <div>
            <input v-model="password" class="login_text" type="password" placeholder="请输入您的密码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的密码'">
        </div>
        <div>
            <input type="text" class="login_text" placeholder="请输入验证码" v-model="verifyImg">
            <img @click="handleChange" src="/api2/users/verifyImg">
        </div>
        <div class="login_btn">
            <input type="submit" value="登录" @click="handleToLogin">
        </div>
        <div class="login_link">
            <router-link to="/center/register">立即注册</router-link>
            <router-link to="/center/findPassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { messagebox } from '@/components/JS'
import { Indicator } from 'mint-ui';
export default {
    name: 'Login',
    data () {
        return {
            username: '',
            password: '',
            count:0,
            isClickable:true,
            verifyImg: ''
        }
    },
    beforeRouteEnter(to,from,next){
        axios.get('/api2/users/getUser').then(res=>{
            if(res.data.status === 0){
                next('/center/mine')
            }else{
                next()
            }
        })
    },
    methods: {
        handleToLogin(){
            if(this.isClickable){
                this.isClickable = false
                axios.post('/api2/users/login',{
                    username: this.username,
                    password: this.password,
                    verifyImg: this.verifyImg
                }).then(res=>{
                    var _this = this
                    if (res.data.status === 0) {
                        messagebox({
                            title: '登录',
                            content: '登录成功',
                            ok: '确定',
                            handleOk(){
                                Indicator.open({
                                    text: '加载中...',
                                    spinnerType: 'fading-circle'
                                });
                                _this.$router.push('/center/mine');
                            }
                        })
                    }else{
                        _this.count++
                        console.log(res.data)
                        messagebox({
                            title: '登录',
                            content: res.data.msg,
                            cancel: '确定',
                            handleCancel(){
                                // console.log(_this.count)
                                if(res.data.msg == "该账号已被冻结"){
                                    _this.count--
                                }
                                if(_this.count == 1){
                                    _this.$refs.iconGoogleDrive.style.color = "red"
                                }
                                if(_this.count == 2){
                                _this.$refs.iconGoogleDrive.classList.add("rot")
                                }
                            }
                        })
                        this.isClickable = true
                    }
                })
            }
        },
        handleChange(ev){
            ev.target.src = '/api2/users/verifyImg?'+Math.random();
        }
    }
}
</script>

<style lang="scss" scoped>
    #content .login_body{  width:100%;}
    .login_body .logo{
        height: 100px;
        line-height: 100px;
        text-align: center;
        background-image: linear-gradient(#E54847,#F2A4A4,transparent);
        span{font-size: 50px;/* animation: rot 1s linear infinite; */display: inline-block;}
        @keyframes rot {
            0%{transform: rotateZ(0);}
            100%{transform: rotateZ(360deg);}
        }
    }
    .rot{animation: rot 1s linear infinite;}
    .login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
    .login_body .login_btn{ height:50px; margin:10px;}
    .login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
    .login_body .login_link{ display: flex; justify-content:space-between;}
    .login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>
