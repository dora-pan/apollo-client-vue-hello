import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home'
import GqlQuery from 'pages/GqlQuery'
import GqlMutation from 'pages/GqlMutation'
import GqlSubscription from 'pages/GqlSubscription'

Vue.use(Router)

const routes = [{
  path: '/',
  component: Home,
  children: [{
      path: '/query',
      component: GqlQuery
    },
    {
      path: '/mutation',
      component: GqlMutation
    },
    {
      path: '/subscription',
      component: GqlSubscription
    }
  ]
}]

export default new Router({
  routes
})