import Vue from 'vue'
import Router from 'vue-router'
import Item1 from '@/pages/item1'
import Item2 from '@/pages/item2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/item1',
      name: 'item1',
      component: Item1
    },
    {
      path: '/item2',
      name: 'item2',
      component: Item2
    }
  ]
})
