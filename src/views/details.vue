<template>
    <div v-if="dataObj">
      <div class="return">
        <img src="data:image/png;base64,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" alt="" @click="handleClick">
        <div class="title hide" ref="mytitle">{{dataObj.name}}</div>
      </div>
      <div class="img">
        <img class="poster" :src="dataObj.poster" alt="">
      </div>
      <div id="intro">
          <div class="file-name">
            <h3>{{dataObj.name}}</h3>
            <span class="dt">{{dataObj.filmType.name}}</span>
            <span class="score" v-show="dataObj.grade">{{dataObj.grade}}分</span>
          </div>
          <p class="p">{{dataObj.category}}</p>
          <p class="p">{{year}}上映</p>
          <!-- <p class="p">{{new Date(dataObj.premiereAt*1000)}}上映</p> -->
          <p class="p">{{dataObj.nation}} | {{dataObj.runtime}}分钟</p>
          <div class="para" ref="myPara">
            <p class="paragraph" ref="myParagraph">{{dataObj.synopsis}}</p>
          </div>
          <div class="toggle" @click="handleIntro">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAYAAADwdn+XAAAAAXNSR0IArs4c6QAAAQlJREFUKBWNkT1Lw1AUht8TIlJExKlj/4WQFNIacWyHCoLQ1cXdj59g7e7i6CA4OAhOpbdNIKn2X3Ts1NGhocdzbgmk1NJmuCHnvM+Tc+8lEyVfDBzDxdVZtTrBDk8/SSrI8EbAzBH4EAwPc/qJ4/RkG28zklVGWefoYL8BQg/gcsYYmmjU2iQx8feFZjSrjLIyBTBgdjlKn8V4TUQszfsw8LtFkYnTW/lrh5lJoBeq+TenRJkV5EEzHN2B+LEY0t6KnOkhrHtPObMi0KKOCV68iqS03JoacC6T/QLUDmveRw7re02gRT2o+QKfdq9aAE33HDSDwB/bz8Lyr0D7y6uid5t1+XLTFf8Bk+NpPwQfd0oAAAAASUVORK5CYII=" alt="" ref="myImg">
          </div>
      </div>
      <div id="actors">
        <h4>演职人员</h4>
        <detailSwiper preview="3" class="actorClass" myClass="actorClass">
        <div class="swiper-slide" v-for="(data,index) in dataObj.actors" :key="index">
          <div class="actorImg">
            <img :src="data.avatarAddress" alt="">
          </div>
          <p>{{data.name}}</p>
          <p>{{data.role}}</p>
        </div>
        </detailSwiper>
      </div>
      <div id="photos">
        <div id="allphotos">
          <span>剧照</span>
          <span class="ph" @click="handlePhotos(dataObj.filmId)">全部({{dataObj.photos.length}}) ></span>
        </div>
        <detailSwiper preview="4" class="photoClass" myClass="photoClass">
        <div class="swiper-slide" v-for="(data,index) in dataObj.photos" :key="index">
          <div class="photoImg">
            <img :src="data" alt="">
          </div>
        </div>
        </detailSwiper>
      </div>
      <footer>
        猫眼电影
      </footer>
    </div>
</template>

<script>
import axios from 'axios'
import detailSwiper from './detail/DetailSwiper'
import { MessageBox,Indicator } from 'mint-ui'
// import bus from '@/bus'
export default {
  props: ['id'],
  data () {
    return {
      dataObj: null,
      isHide: true,
      year:''
    }
  },
  methods: {
    handleIntro () {
      // console.log(this.$refs.myPara.offsetHeight, this.$refs.myParagraph.offsetHeight)
      // this.$refs.myPara.style.height = this.$refs.myParagraph.offsetHeight + 'px'
      if (this.isHide) {
        // this.$refs.myPara.classList.remove('hide')
        this.$refs.myPara.style.height = this.$refs.myParagraph.offsetHeight + 'px'
        this.$refs.myImg.classList.add('rotate')
        this.isHide = false
      } else {
        // this.$refs.myPara.classList.add('hide')
        this.$refs.myPara.style.height = 30 + 'px'
        this.$refs.myImg.classList.remove('rotate')
        this.isHide = true
      }
    },
    handleClick () {
      // this.$router.push('/film')
      this.$router.back()
    },
    handleScroll () {
      if (document.documentElement.scrollTop >= 20) {
        this.$refs.mytitle.classList.remove('hide')
      } else {
        this.$refs.mytitle.classList.add('hide')
      }
    },
    handlePhotos(id){
      // console.log(id)
      this.$router.push({name:'photos',params:{uid:id}})
    },
    handleTime(time){
      var mon = '';
      switch(time.substring(4,7)){
        case 'Jan':
          mon = "01";
          break;
        case 'Feb':
          mon = '02';
          break;
        case 'Mar':
          mon = '03';
          break;
        case 'Apr':
          mon = '04';
          break;
        case 'May':
          mon = '05';
          break;
        case 'Jun':
          mon = '06';
          break;
        case 'Jul':
          mon = '07';
          break;
        case 'Aug':
          mon = '08';
          break;
        case 'Sep':
          mon = '09';
          break;
        case 'Oct':
          mon = '10';
          break;
        case 'Nov':
          mon = '11';
          break;
        case 'Dec':
          mon = '12';
          break;
      }
      var day = time.substring(8,10);
      var year = time.substring(11,15);
      return `${year}-${mon}-${day}`;
    }
  },
  mounted () {
    /* console.log(this.$route.params.uid)
    console.log(this.id) */
    this.data = this.$route.params.uid
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.data}&k=5197937`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16132234251904032016760833","bc":"341100"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res.data.data.film)
      this.dataObj = res.data.data.film
      // console.log(this.handleTime(new Date(this.dataObj.premiereAt*1000).toString()))
      this.year = this.handleTime(new Date(this.dataObj.premiereAt*1000).toString())
      Indicator.close()
      // console.log(this.dataObj.isSale)
      // if (this.dataObj.isSale === false) {
      //   MessageBox({
      //     title: '提示',
      //     message: '该影片暂无档期，到首页看其他电影吧',
      //     showCancelButton: true
      //   }).then(res => {
      //     if (res === 'confirm') {
      //       this.$router.push('/film')
      //     } else {
      //     }
      //   })
      // }
    })
    window.onscroll = this.handleScroll
  },
  beforeRouteEnter(to,from,next){
    console.log(from.path)
    if(from.path === '/film/nowplaying' || '/film/commingsoon'){
      next(vm=>{
      // console.log(vm.$route.params.uid)
        axios({
          url: `https://m.maizuo.com/gateway?filmId=${vm.$route.params.uid}&k=5197937`,
          headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16132234251904032016760833","bc":"341100"}',
            'X-Host': 'mall.film-ticket.film.info'
          }
        }).then(res=>{
          if (res.data.data.film.isSale === false) {
            MessageBox({
              title: '提示',
              message: '该影片暂无档期，到首页看其他电影吧',
              showCancelButton: true
            }).then(res => {
              if (res === 'confirm') {
                vm.$router.push('/film')
              } else {
              }
            })
          }
        })
      })
    }else{
      next()
    }
  },
  beforeDestroy(){
    window.onscroll = null
  },
  components: {
    detailSwiper
  }
}
</script>

<style lang="scss" scoped>
  span{font-size: 13px;color: #797D82;}
  p{font-size: 15px;}
  .return{
    z-index: 10;
    position: fixed;
    height: 50px;
    width: 100%;
    top: 0;
    left: 0;
    img{
      width: 30px;
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 10;
    }
    .title{
      line-height: 50px;
      text-align: center;
      height: 100%;
      width: 100%;
      background-color: white;
      transition: all .3s;
    }
    .hide{
      opacity: 0;
    }
  }
  .img{
    max-height: 200px;
    overflow: hidden;
    .poster{
    width: 100%;
    transform: translateY(-30%);
    }
  }
  #intro{
      padding: 15px;
      .p{
        height: 25px;
        line-height: 25px;
      }
      p{
        font-size: 13px;
        color: #797D82;
      }
    .file-name{
      h3{
        font-weight: normal;
        display: inline-block;
        margin-right: 15px;
      }
      .dt{
        background-color: #D2D6DC;
        border-radius: 3px;
        padding:0 2px 0;
        color: white;
      }
      .score{
        position: absolute;
        right: 10px;
        font-size: 17px;
        color:#FFB232;
      }
    }
    border-bottom: solid 15px #F4F4F4;
    .para{
      height: 30px;
      overflow: hidden;
      transition: all .3s;
    }
    .hide{
      height: 40px;
    }
    .toggle{
      text-align: center;
      img{display: inline-block;}
    }
    .rotate{
      transform:rotateZ(-180deg)
    }
  }
  .swiper-slide{
    p{
      text-align: center;
    }
  }
  #actors{
    // border-top: solid 10px #F4F4F4;
    height: 200px;
    margin: 15px;
    h4{padding: 15px;}
  }
  #photos{
    height: 140px;
    overflow: hidden;
    #allphotos{
      padding: 15px;
    .ph{position: absolute;right: 10px;}
    }
  }
  footer{
    background-color: #F4F4F4;
    height: 100px;
    line-height: 50px;
    text-align: center;
  }
</style>
