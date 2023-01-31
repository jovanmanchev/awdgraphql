import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Regster from './components/Register.vue';
import Home from './components/Home.vue';
import PostCardComments from './components/PostCardComments.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Regster
        },
        {
            path: '/posts/:id',
            name: 'PostDetail',
            props: true,
            component: PostCardComments
        }
    ]
});

export default router;