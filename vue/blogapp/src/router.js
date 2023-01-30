import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Regster from './components/Register.vue';
import Home from './components/Home.vue';

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
        }
    ]
});

export default router;