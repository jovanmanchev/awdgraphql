import { createStore } from 'vuex'

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
        commit('LOGIN_VUEX_MUTATION',payload);
    },
    logoutUser({commit}){
        commit('LOGOUT_VUEX_MUTATION');
    }
};

const getters = {
    getUser: state => state.user
};

export default createStore({
    state,
    mutations,
    actions,
    getters
})