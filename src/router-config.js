export function configRouter (router) {
  router.map({
    '/index': {
      name:"index",
      component: require('./components/Index.vue')
    },
    '/feedback':{
      name:"feedback",
      component: require('./components/Feedback.vue')
    },
    '/quickhelp':{
      name:"quickhelp",
      component: require('./components/QuickHelp.vue')
    },
    '/detail':{
      name:"detail",
      component: require('./components/Detail.vue')
    },
  })

  router.redirect({
    '/':'/index'
  })
  
  router.beforeEach((transition) => {
    if (transition.to.path === '/forbidden') {
      router.app.authenticating = true
      setTimeout(() => {
        router.app.authenticating = false
        alert('this route is forbidden by a global before hook')
        transition.abort()
      }, 3000)
    } else {
      transition.next()
    }
  })
}
