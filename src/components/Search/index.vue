<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model="filmMessage">
            </div>					
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul v-if="movieList.length > 0">
                <li v-for="data in movieList">
                    <div class="img"><img :src="data.img | imgfilter" alt=""></div>
                    <div class="info">
                        <p><span>{{data.nm}}</span></p>
                        <p v-if="data.enm">{{data.enm}}</p>
                        <p>{{data.cat}}</p>
                        <p>{{data.rt}}</p>
                    </div>
                    <div class="score">
                        <span>{{data.sc}}</span>
                    </div>
                </li>
                <div class="total" v-show="isTotal > 3" @click="handleClick(filmMessage)">查看全部{{isTotal}}部影视剧</div>
            </ul>
            <div v-else class="noMovie" ref="noMovie">
                <!-- 不存在该电影名 -->
                <!-- <img src="/images/notFound.jpg" alt=""> -->
                <img src="http://smstsn.com/images/timg.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
Vue.filter('imgfilter',(item)=>{
    return item.replace('/w.h','/120.180/')
})
export default {
    name: 'Search',
    data () {
        return {
            filmMessage: '',
            movieList: [],
            isTotal: null
        }
    },
    watch: {
        filmMessage(val){
            var that = this;
            this.cancelRequest();
            axios.get(`/ajax/search?kw=${val}&cityId=1&stype=-1`,{
                cancelToken: new axios.CancelToken(function(c) {
                    that.source = c;
                })
            }).then(res=>{
                // console.log(res.data.movies)
                if(res.data.movies){
                    this.movieList = res.data.movies.list
                    this.isTotal = res.data.movies.total
                }else{
                    this.movieList = []
                    this.isTotal = null
                }
            }).catch((err) => {
                if (axios.isCancel(err)) {
                    console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
                } else {
                    //handle error
                    // console.log(err);
                    this.movieList = []
                }
            })   
        }
    },
    methods: {
        handleClick(filmName){
            this.$router.push({name:'searchList',params:{fName:filmName}})
        },
        cancelRequest(){
            if(typeof this.source ==='function'){
                this.source('终止请求')
            }
        }
    },
    updated () {
        // this.$refs.noMovie.style.display = "block"
    }
}
</script>

<style lang="scss" scoped>
    .search_body{
        flex:1;
        overflow:auto;
        .search_input{
            padding: 8px 10px;
            background-color: #f5f5f5;
            border-bottom: 1px solid #e5e5e5;
        }
        .search_input_wrapper{
            padding: 0 10px;
            border: 1px solid #e6e6e6;
            border-radius: 5px;
            background-color: #fff;
            display: flex;
            line-height: 20px;
            i{font-size: 16px; padding: 4px 0;}
            input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
        }
        .search_result{
            h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
            ul{
                width: 100%;
                li{ border-bottom:1px #c9c9c9 solid; padding: 10px 15px; box-sizing:border-box; display: flex;width: 100%;}
            }
            .img{
                width: 60px;
                flex-shrink: 0;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .info{
                margin-left: 15px;
                flex-basis: 0;
                flex:1;
                white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
                p{ height: 22px; line-height: 22px; font-size: 10px;}
                p:first-child{display: flex;justify-content: space-between}
                p:nth-of-type(1) span{ font-size: 16px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
                p{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
            }
            .score{ font-size: 16px; color:#fc7103;}
            .total{height: 40px;line-height: 40px;color: #EF4238;text-align: center;border-bottom: 10px solid #F5F5F5;}
            .noMovie{
                width: 100%;
                // display: none;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
