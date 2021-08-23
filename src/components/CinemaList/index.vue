<template>
  <div>
    <div class="cinema_body" :style="isHeight">
      <ul>
        <li v-for="data in cinemaList">
          <div class="cinemaL">
            <h5>{{ data.name }}</h5>
            <p class="adrs">{{ data.address }}</p>
          </div>
          <div class="cinemaR">
            <p class="price">￥{{ data.lowPrice / 100 }}起</p>
            <p>距离未知</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import BS from "better-scroll";
import { mapState } from "vuex";
export default {
  name: "CinemaList",
  data() {
    return {
      datalist: [],
      isHeight: {
        height: "0px",
      },
    };
  },
  computed: {
    ...mapState(["cinemaList"]),
  },
  mounted() {
    this.isHeight.height = document.documentElement.clientHeight - 145 + "px";
  },
  updated() {
    this.$nextTick(() => {
      new BS(".cinema_body", {
        scrollbar: {
          fade: true,
          interactive: false,
        },
      });
    });
  },
};
</script>

<style lang="scss" scoped>
#content {
  .cinema_menu {
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
  }
  .cinema_body {
    position: relative;
    flex: 1;
    overflow: hidden;
    // height: 400px;
    ul li {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-top: solid 1px #f4f4f4;
      p {
        font-size: 13px;
        color: #797d82;
      }
      .cinemaL {
        min-width: 200px;
        h5 {
          font-weight: normal;
        }
        .adrs {
          max-width: 300px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .cinemaR {
        width: 70px;
      }
      .price {
        font-size: 14px;
        color: #ff5f16;
      }
    }
  }
}
</style>
