import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { library} from "@fortawesome/fontawesome-svg-core";
import { faUserSecret, faPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
library.add(faUserSecret, faPen);

import 'bulma/css/bulma.css'

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
window.axios = axios.create({
    baseURL: 'https://tools.sopress.net/iut/coop/api/',
    headers: { Authorization: '1741d2b94e920b3c3fe2f46d0af35f88ca9459c4' }
});

import { utils } from "./utils";
Vue.mixin(utils);

new Vue({
  router,
  store,
    render: h => h(App),
    beforeCreate() {
        window.axios.interceptors.request.use((config) =>{
            // Do something before request is sent
            if(this.$store.state.token_session != null) {
                config.url+='?token='+this.$store.state.token_session;
                console.log(config.url);
            }
            return config
        }, error => {
            return console.log(error)
        });
        //setup liste membres
    }
}).$mount('#app');
