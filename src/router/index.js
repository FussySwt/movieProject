import Vue from 'vue'
import VueRouter from 'vue-router'
import FilmRouter from './film'
import CinemaRouter from './cinema'
import CenterRouter from './center'
import CityRouter from './city'
import SearchListRouter from './searchlist'
import DetailsRouter from './details'
import DetailPhotosRouter from './photos'
import AdminRouter from './admin'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'maoyan',
  routes: [
    FilmRouter,
    CinemaRouter,
    CenterRouter,
    CityRouter,
    SearchListRouter,
    DetailsRouter,
    DetailPhotosRouter,
    AdminRouter,
    {
      path: '/',
      redirect: '/film/nowplaying'
    }
  ]
})

export default router
