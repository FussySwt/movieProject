<template>
    <div id="main">
        <headbar title="猫眼电影"></headbar>
        <div id="content">
            <div class="movie_menu" ref="movieMenu">
                <router-link tag="div" to="/city" class="city_name">
                    <span>{{cityName.length>0 ? cityName : '暂无定位'}}</span><i class="iconfont icon-xiala"></i>
                </router-link>
                <div class="hot_switch">
                    <router-link tag="div" to="/film/nowplaying" class="hot_item" active-class="active">正在热映</router-link>
                    <router-link tag="div" to="/film/commingsoon" class="hot_item" active-class="active">即将上映</router-link>
                </div>
                <router-link tag="div" to="/film/search" class="search_entry" active-class="active">
                    <i class="iconfont icon-sousuo"></i>
                </router-link>
            </div>
            <div class="filed" ref="filed"></div>
        </div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        <tabbar></tabbar>
    </div>
</template>

<script>
import headbar from '@/components/Header'
import tabbar from '@/components/Tabbar'
import { messagebox } from '@/components/JS'
import axios from 'axios'
export default {
    name: 'Film',
    data () {
        return {
            cityName: "",
            cities: []
        }
    },
    components: {
        headbar,
        tabbar
    },
    mounted () {
        axios({
            url: 'https://m.maizuo.com/gateway?k=9089981',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16132234251904032016760833","bc":"110100"}',
                'X-Host': 'mall.film-ticket.city.list'
            }
        }).then(res => {
            // console.log(res.data.data.cities)
            for(var i=0;i<res.data.data.cities.length;i++){
                this.cities.push({id:res.data.data.cities[i].cityId,name:res.data.data.cities[i].name})
            }
            if(window.localStorage.getItem("cityId")){
                var id = window.localStorage.getItem("cityId")
                var name = ""
                name = res.data.data.cities.filter(item=>item.cityId == id)
                this.cityName = name[0].name
            } else {
                // console.log('没有城市id')
            } 
            // console.log(name[0].name)
        })

        var _this = this
        if(!_this.$store.state.isLocate){
            setTimeout(() => {
                axios.get('/geo/').then(res=>{
                    if(res.data.address){
                        var city = {}
                        for(var i=0;i<_this.cities.length;i++){
                            if(res.data.address.indexOf(_this.cities[i].name) >= 0){
                                // console.log(_this.cities[i])
                                city = _this.cities[i]
                                break
                            }else{continue}
                        }
                        // console.log(_this.cities)
                        if(city.id == window.localStorage.getItem("cityId")){
                        }else{
                            messagebox({
                                title:'定位',
                                content:res.data.address,
                                cancel:'取消',
                                ok:'切换定位',
                                handleOk(){
                                    console.log(_this.cities)
                                    console.log(city)
                                    if(city != null){
                                        window.localStorage.setItem("cityId",city.id)
                                        // window.localStorage.setItem("isLocate",true)
                                        window.location.reload()
                                    }
                                },
                                handleCancel(){
                                    _this.$store.commit('changeLocate',true)
                                }
                            })
                        }
                    }
                })
            }, 1500);
        }
        
        window.onscroll = this.handleScroll
    },
    beforeDestroy () {
        window.onscroll = null
    },
    methods: {
        handleScroll(){
            // console.log(document.documentElement.scrollTop)
            if(document.documentElement.scrollTop >= 50) {
                // console.log(1)
                this.$refs.movieMenu.classList.add("fixed")
                this.$refs.filed.style.height = '45px'
            }else{
                this.$refs.movieMenu.classList.remove("fixed")
                this.$refs.filed.style.height = '0px'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .myClass{color: red;}
    #content{
        margin-bottom: 0;
        .fixed{
            position: fixed;
            top: 0;
        }
        .movie_menu{
            width: 100%;
            height: 45px;
            box-sizing: border-box;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            justify-content: space-between;
            background-color: white;
            z-index: 9;
            .city_name{
                margin-left: 20px;
                height: 100%;
                line-height: 45px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .city_name.active{
                color: #ef4238;
                border-bottom: 2px solid #ef4238;
            }
            .hot_switch{
                display: flex;
                height: 100%;
                line-height: 45px;
            }
            .hot_item{
                font-size: 15px;
                color: #666;
                width: 80px;
                text-align: center;
                margin: 0 12px;
                font-weight: 700;
            }
            .hot_item.active{
                color: #ef4238;
                border-bottom: 2px solid #ef4238;
            }
            .search_entry{
                margin-right: 20px;
                height: 100%;
                line-height: 45px;
                box-sizing: border-box;
            }
            .search_entry.active{
                color: #ef4238;
                display: block;
                border-bottom: 2px solid #ef4238;
            }
            .search_entry i{
                font-size: 24px;
                color: red;
            }
        }
    }
</style>
