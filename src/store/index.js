import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Indicator } from 'mint-ui';
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowplayingList: [],
    commingsoonList: [],
    cinemaList:[],
    isLocate:false
  },
  mutations: {
    getNowplayingMutation(state,data){
      state.nowplayingList = data
    },
    getCommingSoonMutation(state,data){
      state.commingsoonList = data
    },
    cinemaListMutation(state,data){
      state.cinemaList = data
    },
    changeLocate(state,data){
      state.isLocate = data
    }
  },
  actions: {
    /* getNowplayingAction(store,id){
      axios({
        url:`https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=1&k=8165506`,
        headers:{
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16132234251904032016760833","bc":"341100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        store.commit('getNowplayingMutation',res.data.data.films)
        Indicator.close();
      })
    }, */
    getCommingSoonMutation(store,id){
      axios({
        url:`https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=2&k=270168`,
        headers:{
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16132234251904032016760833","bc":"440100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        store.commit('getCommingSoonMutation',res.data.data.films)
        Indicator.close();
      })
    },
    getMoreNowplayingAction({commit},obj){
      axios({
        url: `https://m.maizuo.com/gateway?cityId=${obj.cityID}&pageNum=${obj.times}&pageSize=10&type=1&k=8165506`,
        headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16132234251904032016760833","bc":"341100"}',
        'X-Host': 'mall.film-ticket.film.list'
        }
    }).then(res=>{
        // console.log(res.data.data.films)
        commit('getMoreNowplayingMutation',res.data.data.films)
    })
    }
  },
  modules: {
    user
  }
})
