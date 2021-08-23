<template>
    <div class="swiper-container detailswiper">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import Vue from 'vue'
export default {
  props: ['preview', 'myClass'],
  mounted () {
    const sw = new Swiper('.' + this.myClass, {
      slidesPerView: this.preview,
      spaceBetween: this.myClass === 'actorClass' ? 20 : 50,
      freeMode: true
    })
    Vue.use({
      sw
    })
  }
}
</script>

<style lang="scss" scoped>
    .swiper-wrapper{
        height: 150px;
        .actorImg{
            width: 100px;
            height: 100px;
            position: relative;
            overflow: hidden;
            left: 50%;
            transform: translateX(-50%);
        }
        .photoImg{
            width: 100px;
            position: relative;
        }
        img{
            position: absolute;
            width: 100%;
            top: -20%;
            // left: 50%;
            // transform: translateX(-50%);
        }
    }
</style>
