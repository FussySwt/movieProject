<template>
    <ul v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
        <li v-for="(data,index) in datalist" :key="index" @click="handleChangePage(data.filmId)">
            <div class="img">
                <img :src="data.poster" alt="">
            </div>
            <div class="intro" :style="`width:${fwidth}px`">
                <h3>{{data.name}}</h3>
                <p v-if="data.actors">主演：{{actorfilt(index)}}</p>
                <p v-else>暂无主演</p>
                <p>{{data.nation}} | {{data.runtime}}分钟</p>
            </div>
            <div class="book">
                <!-- <button>购票</button> -->
                购票
            </div>
        </li>
        <div v-if="isShow" class="loadingModule">加载中......</div>
        <div v-else class="loadingModule">----已经到底了----</div>
    </ul>
</template>

<script>
import { Indicator } from 'mint-ui';
import axios from 'axios'
import Vue from 'vue'
Vue.filter('actorfilter',(item)=>{
    return item.map(item=>item.name).join(" ")
})
export default {
    name: 'CommingSoon',
    data () {
        return {
            datalist: [],
            loading:false,
            isShow:true,
            CNow:1
        }
    },
    computed: {
        actorfilt(){
            return function(index){
                var arr = []
                for(var i = 0; i < this.datalist.length;i++){
                    if(i == index){
                        arr = this.datalist[index].actors
                        break
                    }
                }
                var newArr = []
                for(var j = 0; j < arr.length; j++){
                    newArr.push(arr[j].name)
                }
                return newArr.join(" ")
            }
        },
        fwidth(){
            return document.documentElement.clientWidth - 162
        }
    },
    mounted () {
        var oIntro = document.getElementsByClassName("intro")
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        if(window.localStorage.getItem("cityId")){
            this.cityid = window.localStorage.getItem("cityId")
        } else {
            this.cityid = 110100
        }
        axios({
        url:`https://m.maizuo.com/gateway?cityId=${this.cityid}&pageNum=1&pageSize=10&type=2&k=8165506`,
            headers:{
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16132234251904032016760833","bc":"341100"}',
            'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            this.datalist = res.data.data.films
            Indicator.close()
        })
        for(var i = 0; i < oIntro.length; i++){
            oIntro.style.width = document.documentElement.clientWidth - 162 + 'px'
        }
    },
    methods: {
        handleChangePage(data) {
            this.$router.push({name:'details',params:{uid:data}})
        },
        loadMore(){
            // console.log('到底了')
            this.loading = true
            this.CNow++
            if(window.localStorage.getItem("cityId")){
                this.cityid = window.localStorage.getItem("cityId")
            } else {
                this.cityid = 110100
            }
            axios({
                url: `https://m.maizuo.com/gateway?cityId=${this.cityid}&pageNum=${this.CNow}&pageSize=10&type=2&k=8165506`,
                headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16132234251904032016760833","bc":"341100"}',
                'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res=>{
                if(res.data.data.films.length>0){
                    this.datalist = [...this.datalist,...res.data.data.films]
                    this.loading = false
                }else{
                    this.isShow = false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    ul{
      margin: 0 12px;
      margin-bottom: 50px;
      li{
        display: flex;
        align-items: center;
        margin-top: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e6e6e6;
        // background-color: white;
        .img{
            width: 64px;
            height: 90px;
            flex-shrink: 0;
            /* display: flex;
            flex-shrink: 0;
            justify-content: center;
            align-items: center; */
          img{
            width: 100%;
            height: 100%;
          }
        }
        .intro{
            margin-left: 10px;
            flex: 1;
            position: relative;
          /* min-width: 0;
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          justify-content: center; */
          h3{
            font-size: 17px;
            line-height: 24px;
            // width: 150px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          p{
            font-size: 13px;
            color: #666;
            line-height: 22px;
            flex: 1;
            // width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            }
          .score{
            font-weight: 700;
            color: #faaf00;
            font-size: 15px;
          }
        }
        .book{
          /* height: 100%;
          width: 70px;
          flex-shrink: 0;
          button{
          height: 30px;
          width: 50px;
          border: none;
          border-radius: 5px;
          background-color: lightsalmon;
          color: white;
        } */
            flex-shrink: 0;
            width: 47px;
            height: 27px;
            line-height: 28px;
            text-align: center;
            background-color: #f03d37;
            color: #fff;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
        }
        span{font-size: 13px;color: #797D82;}
      }
      .loadingModule{
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
    .loading{
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
</style>
