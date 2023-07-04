import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elTableInfiniteScroll from 'el-table-infinite-scroll';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



createApp(App).use(store).use(router).use(ElementPlus).use(elTableInfiniteScroll).mount('#app')
// router.beforeEnter((to, from, next) => {
//     console.log(user[0])
//     if (user[0].name) {
//       next()
//     } else {
//       next("/login")
//     }
//   },)