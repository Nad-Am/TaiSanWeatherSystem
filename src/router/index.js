import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入组件
import Home from '@/view/Home.vue';
import Detaile from '@/view/Detaile.vue';
import LayOut from '@/component/LayOut.vue';

// 安装 Vue Router
Vue.use(VueRouter);

// 定义路由
const routes = [
  {
    path: '/',
    component: LayOut,
    children:[
      {
        path: '',
        component: Home
      },
      {
        path: 'detaile',
        component: Detaile
      }
    ]
  },
];

// 创建路由实例
const router = new VueRouter({
  mode: 'history', // 使用 HTML5 历史模式
  routes
});

export default router;