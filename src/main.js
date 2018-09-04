import Vue from "vue"
import App from "./App.vue"
// 生产模式需要在main.js中关闭
// ：Vue.config.productionTip = false ，
//作用是阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

new Vue({
    name: "app",
    el: "#app",
    render: h => h(App)
})