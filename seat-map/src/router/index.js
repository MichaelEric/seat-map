import Vue from 'vue'
import Router from 'vue-router'
import seatMap from '@/components/seatingMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'seatMap',
      component: seatMap
    }
  ]
})
