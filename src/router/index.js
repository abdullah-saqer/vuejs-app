import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ArticlesLising from '@/pages/ArticlesListing'
import ArticleManagement from '@/pages/ArticleManagement'
import { store } from '@/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'articles-listing',
      component: ArticlesLising,
      meta: {
        layout: 'app-layout',
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        layout: 'simple-layout',
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        layout: 'simple-layout',
        requiresAuth: false
      }
    },
    {
      path: '/create-article',
      name: 'create-article',
      component: ArticleManagement,
      meta: {
        layout: 'app-layout',
        requiresAuth: true
      }
    },
    {
      path: '/edit-article',
      name: 'edit-article',
      component: ArticleManagement,
      meta: {
        layout: 'app-layout',
        requiresAuth: true
      },
      children: [
        {
          path: ":id",
          component: ArticleManagement,
          meta: {
            layout: 'app-layout'
          }
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.authenticated) {
      next({
        name: 'login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

