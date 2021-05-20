const Home = () => import('@/page/home')
const Dashboard = () => import('@/page/dashboard')
const HomeIndex = () => import('@/page/index')
const User = () => import('@/page/user')
const Nonce = () => import('@/page/nonce')
const Top = () => import('@/page/top')

export default [
    {
        path: '/',
        component: HomeIndex,
        meta: {
            keepAlive: true,
        },
        children: [
            {
                path: '/',
                name: 'home',
                component: Home,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: 'user/:address',
                name: 'User',
                component: User,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: 'nonce',
                name: 'Nonce',
                component: Nonce,
                meta: {
                    keepAlive: true,
                }
            },
            {
                path: 'top',
                name: 'TOP20',
                component: Top
            }
        ]
    }
]
