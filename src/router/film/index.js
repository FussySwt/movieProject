export default {
    path: '/film',
    component: () => import('@/views/film'),
    children: [
        {
            path: 'nowplaying',
            component: () => import('@/components/Nowplaying')
        },
        {
            path: 'commingsoon',
            component: () => import('@/components/CommingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        {
            path: '',
            redirect: 'nowplaying'
        }
    ]
}