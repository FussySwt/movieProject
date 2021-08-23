<template>
    <div class="container">
        <div class="head">
            <img :src="$store.state.user.userHead" alt="头像">
            <p class="upload">{{$store.state.user.name}}</p>
            <span @click="handleToQuit">退出</span>
            <label for="fileInput" class="input">
                <p>上传头像</p>
                <input id="fileInput" type="file" value="上传头像" @change="handleToUpload">
            </label>
        </div>
        <div class="identity">
            <div v-if="$store.state.user.isAdmin"><p>用户身份</p><p>管理员</p><a href="/admin" target="_blank">进入管理后台</a></div>
            <div v-else><p>用户身份</p><p>普通会员</p></div>
        </div>
        <!-- <label for="fileInput" class="input">
            <span>上传头像</span>
            <input id="fileInput" type="file" value="上传头像" @change="handleToUpload">
        </div> -->
    </div>
</template>

<script>
import axios from 'axios'
import { messagebox } from '@/components/JS'
import { Indicator } from 'mint-ui';
// import { mapState } from 'vuex'
export default {
    name: 'mine',
    /* computed: {
        ...mapState(['user/name'])
    }, */
    beforeMount(){
        Indicator.close()
    },
    methods: {
        handleToQuit(){
            var _this = this
            messagebox({
                title: '退出',
                content: '你确定要退出吗？',
                cancel: '取消',
                ok: '确定',
                handleOk(){
                    axios.get('/api2/users/quit').then(res=>{
                        console.log(res)
                        if(res.data.status === 0){
                            localStorage.removeItem('name')
                            localStorage.removeItem('isAdmin')
                            _this.$store.commit('user/getUserName',{username:'',isAdmin: 0,userHead:''})
                            _this.$router.push('/center/login')
                        }else{
                            messagebox({
                                title: '退出',
                                content: '退出失败！',
                                cancel: '确定',
                            })
                        }
                    })
                }
            })
        },
        handleToUpload(ev){
            var file = ev.target.files[0]
            var param = new FormData();
            param.append('file', file, file.name)
            var config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('/api2/users/uploadUserHead',param,config).then(res=>{
                if(res.data.status === 0){
                    var _this = this
                    messagebox({
                        title: '上传',
                        content: '上传成功',
                        ok: '确定',
                        handleOk(){
                            _this.$store.commit('user/updateUserHead',{userHead:res.data.data.userHead+'?'+Math.random()})
                        }
                    })
                }else{
                    messagebox({
                        title: '上传',
                        content: '上传失败',
                        cancel: '确定'
                    })
                }
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        axios.get('/api2/users/getUser').then(res=>{
            // console.log(res.data.data.username)
            if (res.data.status === 0) {
                next(vm=>{
                    localStorage.setItem('name',res.data.data.username)
                    localStorage.setItem('isAdmin',res.data.data.isAdmin)
                    vm.$store.commit('user/getUserName',{name:res.data.data.username,isAdmin:res.data.data.isAdmin,userHead:res.data.data.userHead})
                })
            }else{
                /* messagebox({
                    title:'登录',
                    content: '你还没有登录，请先登录！',
                    cancel:'取消',
                    ok: '确定',
                    handleOk(){
                        next('/center/login')
                    }
                }) */
                next('/center/login')
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .head{
        width: 100%;
        height: 170px;
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        position: relative;
        font-size: 19px;
        background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.u1.huluxia.com%2Fg3%2FM02%2F29%2FA2%2FwKgBOVwKYBGAPd-aAAH93zw18eI066.jpg&refer=http%3A%2F%2Fcdn.u1.huluxia.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617256357&t=b708f91ecc80ca7b4f849f639da963c0') no-repeat center center;
        img{width: 100px;height: 100px;border-radius: 50%;}
        background-size: 100%;
        .upload{padding-bottom: 20px;color: white;}
        span{position: absolute;right: 20px;top: 10px;color: #F03D37;}
    }
    .identity{
        height: 60px;
        display: flex;
        background-color: #F3F3F3;
        align-items: center;
        div{width:100%;display: flex;justify-content: space-around;
            a{text-decoration: none;color: lightskyblue;}
        }
    }
    .input{
        position: absolute;top:10px;left:20px;
        p{width: 100%;text-align: center;color: #F03D37;}
        input{display: none;}
    }
    @media screen and (min-width:980px) {
        .container{
            width: 900px;
            margin: 0 auto;
        }
        .head{
            border-radius: 0 0 20px 20px;
        }
        .head_name{font-size: 19px;}
        .identity{border-radius: 20px;}
    }
</style>
