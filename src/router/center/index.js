export default {
    path: '/center',
    component: () => import('@/views/center.vue'),
    children: [
        {
            path: 'login',
            component: () => import('@/components/Login')
        },
        {
            path: 'register',
            component: () => import('@/components/Register')
        },
        {
            path: 'findpassword',
            component: () => import('@/components/FindPassword')
        },
        {
            path: 'mine',
            component: () => import('@/views/center/mine')
        },
        {
            path: '',
            redirect: 'mine'
        }
    ]
}