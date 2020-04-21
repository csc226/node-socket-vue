import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: '消息',
        component: () =>
            import ('./components/chatList.vue')
    }, {
        path: '/app',
        name: '好友',
        component: () =>
            import ('./components/peopleList.vue')
    }, {
        path: '/mydetails',
        name: '我的',
        component: () =>
            import ('./components/mydetails.vue')
    }, {
        path: '/socketF',
        name: '发消息',
        component: () =>
            import ('./components/socket.vue')
    }, {
        path: '/socketJ',
        name: '接收消息',
        component: () =>
            import ('./components/socketJ.vue')
    }, {
        path: '/signUp',
        name: '注册',
        component: () =>
            import ('./components/signUp.vue')
    }, {
        path: '/signIn',
        name: '登录',
        component: () =>
            import ('./components/signIn.vue')
    }, {
        path: '/search',
        name: '搜索',
        component: () =>
            import ('./components/search.vue')
    }, {
        path: '/addFriend',
        name: '添加朋友',
        component: () =>
            import ('./components/addFriend.vue')
    }, {
        path: '/newFriend',
        name: '新的朋友',
        component: () =>
            import ('./components/newFriend.vue')
    }]
})