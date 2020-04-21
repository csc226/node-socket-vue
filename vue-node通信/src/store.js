import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex)

export default new vuex.Store({
    state: {
        userId: '',
        login: false,
        signIn: true,
        connectUrl: 'http://192.168.1.125:3000',
        // connectUrl: 'http://192.168.43.129:3000',
        socketUrl: 'http://192.168.1.125:3100/',
        // socketUrl:"http://127.0.0.1:3000/",
        // socketUrl: "http://192.168.43.129:3100/",
        // socketUrl:"http://10.232.17.229:3000/",
        myInfo: '',
        myAvatar: '',
        mySex: '',
        friendCount: '',
    },
    mutations: {
        userInfo(state, value) {
            state.userId = value.data[0].id
            state.login = true
            state.myInfo = value.data[0].nickname
            state.myAvatar = value.data[0].avatar
            state.mySex = value.data[0].sex == 0 ? "男" : '女'
        },
        friendCount(state, count) {
            state.friendCount = count
        }
    },
    actions: {
        userInfo(context, value) {
            context.commit('userInfo', value)
        },
        friendCounts(context, count) {
            context.commit('friendCount', count)
        }
    }
})