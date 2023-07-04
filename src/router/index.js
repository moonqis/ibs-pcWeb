import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../views/login-sign.vue')
  },
  {
    path: '/food',
    name: 'food',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FoodView.vue')
  },
  {
    path: '/learn',
    name: 'learn',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/LearnView.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    component: () => import('../views/NoticeView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  },
  {
    path: '/person',
    name: 'person',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/PersonView.vue')
  },
  {
    path: '/course',
    name: 'course',
    component: () => import('../views/person/coursecollect.vue')
  },
  {
    path: '/feedback',
    name: 'feedback',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/person/feedback.vue')
  },
  {
    path: '/foodcollect',
    name: 'foodcollect',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/person/foodcollect.vue')
  },
  {
    path: '/fooddata',
    name: 'fooddata',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/person/fooddata.vue')
  },
  {
    path: '/personsafe',
    name: 'personsafe',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/person/personsafe.vue')
  },
  {
    path: '/question',
    name: 'question',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/person/question.vue')
  },
  {
    path: '/sortdata',
    name: 'sortdata',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/person/sortdata.vue')
  },
  {
    path: '/state',
    name: 'state',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/person/state.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/MessageView.vue')
  },
  {
    path: '/foodcheck',
    name: 'foodcheck',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/admin/foodcheck.vue')
  },   {
    path: '/foodfeed',
    name: 'foodfeed',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/admin/foodfeed.vue')
  },  {
    path: '/sortcheck',
    name: 'sortcheck',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/admin/sortcheck.vue')
  },  {
    path: '/userlist',
    name: 'userlist',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/admin/userlist.vue')
  },  {
    path: '/feedlist',
    name: 'feedlist',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/admin/feedlist.vue')
  },
  {
    path: '/addnotice',
    name: 'addnotice',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/admin/addnotice.vue')
  },
  {
    path: '/getrole',
    name: 'getrole',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/person/getrole.vue')
  },
  {
    path: '/userrole',
    name: 'userrole',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/admin/postrolelist.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



router.beforeEach((to, from, next) => { 
  const user = JSON.parse(localStorage.getItem("user"));

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (user) { // 通过vuex state获取当前的token是否存在    注意token有时效性
      next();//存在就说明登录了，放行
    }
    else {
      next({  //不存在，回退到一个页面，例如登录页面
        path: '/login',
      })
    }
  }
  else {
    next();
  }
})
// export default router 前增加下面代码，添加一个临时路由
if (!router.hasRoute()) {
  router.addRoute({
    path: window.location.pathname,
    name: 'TempRoute',
    component: () => import('../components/empty/emptyLayout')
  })
}

export default router
