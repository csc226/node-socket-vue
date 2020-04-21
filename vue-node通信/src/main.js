import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import axios from 'axios'
import vueAxios from 'vue-axios'
import store from './store.js'
import vueCookie from 'vue-cookie'
// import vueCookies from 'vue-cookies
// import myplugin from './components/plugins'
Vue.config.productionTip = false
Vue.prototype.$cookie = vueCookie
Vue.use(vueAxios, axios)
router.beforeEach((to, form, next) => {
    if (store.state.login || vueCookie.get('login') || to.path === '/signIn' || to.path === "/signUp") {
        next()
    } else {
        next({
            path: '/signIn'
        })
    }
})
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')