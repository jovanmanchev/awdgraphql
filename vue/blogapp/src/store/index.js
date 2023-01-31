import { createStore } from 'vuex'
import jwtDecode from 'jwt-decode'
const state = {
    user: null 
};

const mutations = {
    LOGIN_VUEX_MUTATION(state, payload){
        state.user = payload
    },
    LOGOUT_VUEX_MUTATION(state){
        state.user = null;
    }
};

const actions = {
    loginUser({commit}, payload){
        localStorage.setItem('jwtToken',payload.data.login.token);
        commit('LOGIN_VUEX_MUTATION',payload);
    },
    logoutUser({commit}){
        localStorage.removeItem('jwtToken');
        commit('LOGOUT_VUEX_MUTATION');
    }
};

const getters = {
    getUser: state => state.user,
    checkExpired : state => {
        const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

        if(decodedToken.exp * 1000 < Date.now()){
            localStorage.removeItem('jwtToken');
            state.user = null;
        }
        return state.user;
    }
};

export default createStore({
    state,
    mutations,
    actions,
    getters
})