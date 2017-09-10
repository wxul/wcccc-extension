import Vue from 'vue';
import App from '@page/index.vue';

const app = new Vue({
    render: h => h(App)
}).$mount('#app');

console.log('loaded!');