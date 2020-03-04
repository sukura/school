import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () =>
              import('../views/login/login.vue')
    }, {
      path: '/home',
      name: 'home',
      component: () =>
              import('../views/home/index.vue')
    }, {
      path: '/workManage', // 考勤管理
      name: 'workManage',
      redirect: '/workManage/classDay',
      component: () =>
              import('../views/workManage/workIndex.vue'),
      children: [{
        path: 'classDay', // 我的课程 - 日统计
        name: 'classDay',
        component: () =>
                  import('../views/workManage/classDay.vue')
      }, {
        path: 'classMonth', // 我的课程 - 月统计
        name: 'classMonth',
        component: () =>
                  import('../views/workManage/month.vue')
      }, {
        path: 'myclassDay', // 我的班级 - 日统计
        name: 'myclassDay',
        component: () =>
                  import('../views/workManage/myclass-day.vue')
      }, {
        path: 'myclassMonth', // 我的班级 - 月统计
        name: 'myclassMonth',
        component: () =>
                  import('../views/workManage/myclass-month.vue')
      }, {
        path: 'myActivity', // 临时活动考勤 - 我创建的活动
        name: 'myActivity',
        component: () =>
                  import('../views/workManage/activity.vue')
      }, {
        path: 'myPartake', // 临时活动考勤 - 我参与的
        name: 'myPartake',
        component: () =>
                  import('../views/workManage/my-partake.vue')
      }, {
        path: 'syntheticalOne', // 综合查询 - 人次查询
        name: 'syntheticalOne',
        component: () =>
                  import('../views/workManage/synthetical-one.vue')
      }, {
        path: 'syntheticalTwo', // 综合查询 - 节次查询
        name: 'syntheticalTwo',
        component: () =>
                  import('../views/workManage/synthetical-two.vue')
      }]
    }, {
      path: '/arriveSchool', // 到校查询 - 进出记录
      name: 'arriveSchool',
      redirect: '/arriveSchool/arriveRecord',
      component: () => import('../views/arriveSchool/arrive-index.vue'),
      children: [
        {
          path: 'arriveRecord',
          name: 'arriveRecord',
          component: () => import('../views/arriveSchool/record.vue')
        }
      ]
    }
  ]
})
