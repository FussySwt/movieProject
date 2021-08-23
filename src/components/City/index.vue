<template>
    <div>
        <header>
            <router-link tag="div" to="/film/nowplaying" class="quit"><span class="iconfont icon-guanbi"></span></router-link>
            <h4>当前城市</h4>
        </header>
        <mt-index-list id="city">
            <div>
                <!-- <mt-cell title="Aaron"></mt-cell>
                <mt-cell title="Alden"></mt-cell>
                <mt-cell title="Austin"></mt-cell> -->
                <div class="title">热门城市</div>
                <ul class="hot_city">
                    <li v-for="data in isHot" :key="data.cityId" @click="handleHotCity(data.cityId)">
                        <div>{{data.name}}</div>
                    </li>
                </ul>
            </div>
            <mt-index-section :index="data.index" v-for="data in datalist" :key="data.index">
                <div v-for="city in data.content" :key="city.cityId" @click="handleClick(city.cityId)">
                    <mt-cell :title="city.name"></mt-cell>
                </div>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui';
export default {
    name: 'City',
    data () {
        return {
            datalist: [],
            isHot: []
        }
    },
    mounted () {
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        axios({
            url: 'https://m.maizuo.com/gateway?k=4480335',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16132234251904032016760833","bc":"341100"}',
                'X-Host': 'mall.film-ticket.city.list'
            }
        }).then(res => {
            // console.log(res.data.data.cities)
            this.getCity(res.data.data.cities)
            this.getHotCity(res.data.data.cities)
            Indicator.close()
        })
    },
    methods: {
        getCity (data) {
            var letterArr = []
            for (var i = 65; i <= 90; i++) {
                letterArr.push(String.fromCharCode(i))
            }
            var newList = []
            for (var j = 0; j < letterArr.length; j++){
                var arr = data.filter(item=>item.pinyin.substring(0,1) === letterArr[j].toLowerCase())
                if (arr.length > 0) {
                    newList.push({
                        index:letterArr[j],
                        content: arr
                    })
                }
            }
            this.datalist = newList
            // console.log(this.datalist)
        },
        handleClick (data) {
            window.localStorage.setItem("cityId",data)
            this.$router.push('/film')
        },
        getHotCity (data) {
            var arr = []
            arr = data.filter(item=>item.isHot === 1)
            this.isHot = arr
        },
        handleHotCity (data) {
            window.localStorage.setItem("cityId",data)
            this.$router.push('/film')
        }
    }
}
</script>

<style lang="scss" scoped>
    header{
        height: 40px;
        border-bottom: 10px solid #F4F4F4;
        position: relative;
        .quit{
            position: absolute;
            height: 40px;
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        h4{
            line-height: 40px;
            text-align: center;
            font-weight: normal;
        }
    }
    header::after{
        content:"";
        display: block;
        clear: both;
    }
    #city{
        touch-action: none;
        .title{
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            background-color: #FAFAFA;
            text-align: center;
            border-bottom: 1px solid #D9D9D9;
        }
        .hot_city{
            display: grid;
            grid-template-columns: repeat(3,1fr);
            // grid-template-rows: repeat(3,1fr);
            li{
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px 0;
                div{
                    width: 100px;
                    height: 30px;
                    border-radius: 3px;
                    border: none;
                    background-color: #F4F4F4;
                    line-height: 30px;
                    text-align: center;
                }
            }
        }
    }
</style>
