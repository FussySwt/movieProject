export default {
    path: '/admin',
    component: () => import('@/views/admin'),
    children: [
        {
            path: 'users',
            component: () => import('@/views/admin/users')
        },
        {
            path: 'films',
            component: () => import('@/views/admin/films')
        },
        {
            path: 'cinemas',
            component: () => import('@/views/admin/cinemas')
        },
        {
            path: '',
            redirect: 'users'
        }
    ]
}