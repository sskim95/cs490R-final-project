import Vue from "vue";
import Vuex from "vuex";
import AuthService from "@/services/auth";

const token = localStorage.getItem("jwt_token");
const initialState =
    token && token != ""
        ? { loggedIn: true, token: token }
        : { loggedIn: false, token: null};

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user)
                .then((token) => {
                    console.log("Got token from services: " + token);
                    localStorage.setItem("jwt_token", token);
                    commit("login", token);
                    return Promise.resolve();
                })
                .catch((err) => {
                    console.log("Login failed");
                    console.log(err);
                    return Promise.reject(err);
                });
        },
        logout({ commit }) {
            localStorage.removeItem("jwt_token");
            commit("logout");
        },
    },
    mutations: {
        login(state, token) {
            state.loggedIn = true;
            state.token = token;
        },
        logout(state) {
            state.loggedIn = false;
            state.token = null;
        },
    },
    getters: {
        loggedIn: (state) => state.loggedIn,
        token: (state) => state.token,
    },
});
