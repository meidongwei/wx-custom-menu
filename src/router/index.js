import Vue from 'vue'
import Router from 'vue-router'
import Item1 from '@/pages/item1'
import Item2 from '@/pages/item2'
import Item3 from '@/pages/item3'
import InfoIndex from '@/pages/infoIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/infoIndex'
    },
    {
      path: '/infoIndex',
      name: 'infoIndex',
      component: InfoIndex
    },
    {
      path: '/item1',
      name: 'item1',
      component: Item1
    },
    {
      path: '/item2',
      name: 'item2',
      component: Item2
    },
    {
      path: '/item3',
      name: 'item3',
      component: Item3
    }
  ]
})
