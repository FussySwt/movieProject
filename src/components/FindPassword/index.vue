<template>
    <div>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"><button @click="handleVerify" class="send" :disabled="isClickable">{{sendContent}}</button></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" type='"text' v-model="verify"></mt-field>
        <div class="findPassword_btn">
            <input type="submit" value="修改密码" @click="handleToUpdate">
        </div>
        <div class="findPassword_link">
            <router-link to="/center/login">立即登录</router-link>
            <router-link to="/center/register">立即注册</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { messagebox } from '@/components/JS'
export default {
    name: 'findpassword',
    data () {
        return {
            email: '',
            password: '',
            verify: '',
            sendContent: '发送验证码',
            isClickable:false,
            clickTimes:0
        }
    },
    methods: {
        handleToUpdate(){
            if(this.password === ""){
                messagebox({
                    title:'修改密码',
                    content: '密码不能为空',
                    cancel: '确定'
                })
                return
            }
            axios.post('/api2/users/findPassword',{
                email: this.email,
                password: this.password,
                verify: this.verify
            }).then(res=>{
                if(res.data.status === 0){
                    var _this = this
                    messagebox({
                        title: '修改密码',
                        content: '修改成功',
                        ok: '确定',
                        handleOk(){
                            _this.$router.push('/center/login')
                        }
                    })
                }else{
                    messagebox({
                        title:'修改密码',
                        content: res.data.msg,
                        cancel: '确定'
                    })
                }
            })
        },
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .send{padding: 5px;}
    .findPassword_btn{
        height:50px;
        margin:10px;
        input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
    }
    .findPassword_link{
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
