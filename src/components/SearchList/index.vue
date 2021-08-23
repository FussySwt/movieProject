<template>
    <div>
        <header>
            <headbar title="电影列表">
                <span class="iconfont icon-zuohua" @click="handleClick()"></span>
            </headbar>
        </header>
        <div class="filter"></div>
        <loader v-if="isAppear"></loader>
        <ul v-else class="films" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false"
  infinite-scroll-distance="10">
            <li v-for="data in datalist">
                <div class="img">
                    <img :src="data.img | imgfilter" alt="">
                </div>
                <div class="info">
                    <h4>{{data.nm}}</h4>
                    <p>{{data.enm}}</p>
                    <p>{{data.cat}}</p>
                    <p>{{data.rt}}</p>
                </div>
                <div class="score" :style="data.sc===0?'':'color:orange'">{{data.sc===0?'暂无评分':data.sc}}</div>
            </li>
            <div v-if="isShow" class="loadingModule" ref="loading">加载中......</div>
            <div v-else class="loadingModule">----已经到底了----</div>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import headbar from '@/components/Header'
import Vue from 'vue'
// import { Indicator } from 'mint-ui';
import loader from '@/components/Loader'
Vue.filter('imgfilter',(item)=>{
    return item.replace('/w.h/','/120.180/')
})
export default {
    components: {
        headbar,
        loader
    },
    data () {
        return {
            datalist: [],
            loading:false,
            isShow:true,
            count: 20,
            isAppear:true
        }
    },
    mounted () {
        // console.log(this.$route.params.fName)
        // Indicator.open({
        //     text: '加载中...',
        //     spinnerType: 'fading-circle'
        // });
        axios.get(`/searchlist/movies?keyword=${this.$route.params.fName}&ci=1&offset=20&limit=20`).then(res=>{
            // console.log(res.data)
            // Indicator.close()
            this.isAppear = false
            this.datalist = res.data.movies
            if(this.datalist.length === 0){
                this.isShow = false
            }
        })
    },
    methods: {
        handleClick(){
            this.$router.push('/film/search')
        },
        loadMore() {
            // console.log('到底了')
            this.loading = true;
            this.count += 20
            this.$refs.loading.style.display="block"
            axios.get(`/searchlist/movies?keyword=${this.$route.params.fName}&ci=1&offset=${this.count}&limit=20`).then(res=>{
                if(res.data.movies.length === 0){
                    this.isShow = false
                } else {
                    // console.log(res.data)
                    this.datalist = [...this.datalist,...res.data.movies]
                    this.loading = false
                    this.$refs.loading.style.display="none"
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    header{
        position: fixed;
        width: 100%;
        top: 0;
        .iconfont{
            position: absolute;top: 35%;left: 20px;
        }
    }
    .filter{height: 50px;}
    .films{
        li{
            height: 100px;
            display: flex;
            .img{
                width: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-shrink: 0;
                img{
                    width: 60px;
                    height: 80px;
                }
            }
            .info{
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: center;
                h4{
                    overflow: inherit;
                    text-overflow: ellipsis;
                }
                p{
                    overflow: inherit;
                    text-overflow: ellipsis;
                    font-size: 13px;
                }
            }
            .score{
                font-size: 15px;
                padding-top: 23px;
                padding-right: 10px;
            }
        }
        .loadingModule{
            height: 30px;
            line-height: 30px;
            text-align: center;
        }
    }
    .hide{
        display: none;
    }
</style>
