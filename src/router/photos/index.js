export default {
    path:'/photos/:uid',
    name: 'photos',
    component: () => import('@/views/detail/photos')
}