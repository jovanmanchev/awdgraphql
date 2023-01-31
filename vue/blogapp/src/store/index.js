import { createStore } from 'vuex'
import jwtDecode from 'jwt-decode'
const state = {
    user: null,
    posts: [] 
};

const mutations = {
    LOGIN_VUEX_MUTATION(state, payload){
        state.user = payload
    },
    LOGOUT_VUEX_MUTATION(state){
        state.user = null;
    },
    UPDATE_POSTS_VUES_MUTATION(state, payload){
        state.posts = payload
    }
};

const actions = {
    loginUser({commit}, payload){
        localStorage.setItem('jwtToken',payload.data.login.token);
        localStorage.setItem('username', payload.data.login.username)
        commit('LOGIN_VUEX_MUTATION',payload);
    },
    logoutUser({commit}){
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        commit('LOGOUT_VUEX_MUTATION');
    },
    updatePosts({commit}, payload){
        commit('UPDATE_POSTS_VUES_MUTATION', payload);
    }
};

const getters = {
    getUser: state => state.user,
    checkExpired : state => {
        const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

        if(decodedToken.exp * 1000 < Date.now()){
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('username')
            state.user = null;
        }
        return state.user;
    },
    getPosts : state => state.posts
};

export default createStore({
    state,
    mutations,
    actions,
    getters
})