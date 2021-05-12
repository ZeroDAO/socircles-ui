const Home = () => import('@/page/home')
const Dashboard = () => import('@/page/dashboard')
const HomeIndex = () => import('@/page/index')
const User = () => import('@/page/user')
const Nonce = () => import('@/page/nonce')

export default [
    {
        path: '/',
        component: HomeIndex,
        meta: {
            keepAlive: true,
        },
        children: [
            {
                path: '',
                name: '首页',
                component: Home,
                meta: {
                    keepAlive: true,
                }
            },
            {
                path: '/dashboard',
                name: '发现',
                component: Dashboard,
                meta: {
                    keepAlive: true,
                }
            },
            {
                path: '/user/:address',
                name: '用户',
                component: User,
                meta: {
                    keepAlive: true,
                }
            },
            {
                path: '/nonce',
                name: '名人堂',
                component: Nonce,
                meta: {
                    keepAlive: true,
                }
            }
        ]
    }
]
