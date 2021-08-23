<template>
    <div>
        <headbar title="猫眼影院"></headbar>
        <div id="content">
			<div class="cinema_menu">
				<div class="city_switch" @click="handleClick()">
					全城 <i class="iconfont icon-xiala" ref="rot"></i>
				</div>
				<div class="brand_swtich">
					品牌 <i class="iconfont icon-xiala"></i>
				</div>
				<div class="feature_switch">
					特色 <i class="iconfont icon-xiala"></i>
				</div>
			</div>
            <div class="cinema_menu_city" ref="cityMap">
                <ul>
                    <li v-for="data in datalist">
                        <div @click="changeArea(data.id)">{{data.name}}</div>
                    </li>
                </ul>
            </div>
            <cinemaList></cinemaList>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
import headbar from '@/components/Header'
import cinemaList from '@/components/CinemaList'
import { Indicator } from 'mint-ui'
import tabbar from '@/components/Tabbar'
import axios from 'axios'
export default {
    components: {
        headbar,
        tabbar,
        cinemaList
    },
    data () {
        return {
            datalist: [],
            cinemaList: [],
            isMove:false
        }
    },
    mounted () {
        if(window.localStorage.getItem("cityId") != null){
            var cityId = window.localStorage.getItem("cityId")
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            axios({
                url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=7515468`,
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16132234251904032016760833","bc":"341100"}',
                    'X-Host': 'mall.film-ticket.cinema.list'
                }
            }).then(res => {
                this.$store.commit('cinemaListMutation',res.data.data.cinemas)
                this.cinemaList = res.data.data.cinemas
                var arr = res.data.data.cinemas.map(item=> item.district)
                var NewObj = {}
                var newArr = []
                for(var i=0;i<arr.length;i++){
                    var oName = arr[i].name
                    if(!NewObj[oName]){
                        NewObj[oName] = 200;
                        newArr.push({
                            id:arr[i].districtId,
                            name:arr[i].name
                        })
                    }
                }
                // console.log(newArr)
                this.datalist = newArr
                Indicator.close()
            })
        }else{
            this.$router.push('/city')
        }
    },
    methods: {
        handleClick(){
            // console.log(this.$refs.cityMap.offsetHeight)
            if(!this.isMove){
                this.$refs.cityMap.style.display = "block"
                this.$refs.rot.classList.add('rotate')
                this.isMove = true
            }else{
                this.$refs.cityMap.style.display = "none"
                this.$refs.rot.classList.remove('rotate')
                this.isMove=false
            }
        },
        changeArea(id){
            // console.log(id)
            var newArr = []
            for(var i = 0; i < this.cinemaList.length; i++){
                if(this.cinemaList[i].districtId == id){
                    newArr.push(this.cinemaList[i])
                }
            }
            // console.log(newArr)
            this.$store.commit('cinemaListMutation',newArr)
            this.$refs.cityMap.style.display = "none"
            this.isMove = false
            this.$refs.rot.classList.remove('rotate')
        }
    }
}
</script>

<style lang="scss" scoped>
    .rotate{
        transform: rotateZ(180deg);
    }
    #content{
        .cinema_menu{
            width: 100%;
            height: 45px;
            box-sizing: border-box;
            border-bottom:1px solid #e6e6e6;
            display: flex;
            justify-content:space-around;
            align-items:center;
            background:white;
            .city_switch i{
                transition: all .3s;
                display: inline-block;
                //  transform: rotateZ(-180deg);
            }
        }
        .cinema_menu_city{
            position: absolute;
            top: 45px;z-index: 10;
            width: 100%;
            background-color: #FAFAFA;
            overflow: hidden;
            display: none;
            transition: all .2s;
            ul{
                display: grid;grid-template-columns: repeat(3,1fr);
                li{height: 45px;
                    line-height: 45px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    div{
                        width: 100px;
                        height: 30px;
                        line-height: 30px;
                        border-radius: 5px;
                        box-sizing: border-box;
                        border: solid 1px lightgray;
                    }
                }
            }
        }
    }
</style>
