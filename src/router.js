import Vue from 'vue';
import Router from 'vue-router';
import ControlPanel from './views/ControlPanel.vue';
import provider from './plugins/vue-apollo';

Vue.use(Router);

const routePerimeter = {
  LOGGEDIN: {
    check(user) {
      return !!user;
    },
    redirect: 'login',
  },

  HASCOMPANY: {
    check(user) {
      return user.company;
    },
    redirect: 'createcompany',
  },

  NOTLOGGEDIN: {
    check(user) {
      return !user;
    },
    redirect: 'dashboard',
  },

  HASNOCOMPANY: {
    check(user) {
      return !user.company;
    },
    redirect: 'dashboard',
  },

  ISADMIN: {
    check(user) {
      return user && user.permissions.find(perm => perm === 'ADMIN');
    },
    redirect: 'dashboard',
  },
};

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: ControlPanel,
      children: [
        {
          path: '',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN, routePerimeter.HASCOMPANY],
            showInNavigation: true,
            icon: 'home',
            title: 'Dashboard',
          },
          name: 'dashboard',
          component: () =>
            import(/* webpackChunkName: "dashboard" */ './views/ControlPanel/Dashboard.vue'),
        },
        {
          path: 'editemployees',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN, routePerimeter.HASCOMPANY],
            showInNavigation: true,
            icon: 'contacts',
            title: 'Edit Employees',
          },
          name: 'editemployees',
          component: () =>
            import(/* webpackChunkName: "editemployees" */ './views/ControlPanel/EditEmployees.vue'),
        },
        {
          path: 'editcompany',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN, routePerimeter.HASCOMPANY],
            showInNavigation: true,
            icon: 'business',
            title: 'Edit Company',
          },
          name: 'editcompany',
          component: () =>
            import(/* webpackChunkName: "editcompany" */ './views/ControlPanel/EditCompany.vue'),
        },
        {
          path: 'interview/list',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN, routePerimeter.HASCOMPANY],
            showInNavigation: true,
            icon: 'forum',
            title: 'Interviews',
          },
          name: 'listinterviews',
          component: () =>
            import(/* webpackChunkName: "listinterviews" */ './views/ControlPanel/ListInterviews.vue'),
        },
        {
          path: 'interview/create',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN, routePerimeter.HASCOMPANY],
            showInNavigation: false,
            icon: 'forum',
            title: 'Interviews',
          },
          name: 'interviewcreate',
          component: () =>
            import(/* webpackChunkName: "creaateinterviews" */ './views/ControlPanel/InterviewCreate.vue'),
        },
        {
          path: 'result/list',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN, routePerimeter.HASCOMPANY],
            showInNavigation: false,
            icon: 'face',
            title: 'Results',
          },
          name: 'listresults',
          component: () =>
            import(/* webpackChunkName: "listresults" */ './views/ControlPanel/ListResults.vue'),
        },
        {
          path: 'createcompany',
          name: 'createcompany',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN, routePerimeter.HASNOCOMPANY],
            showInNavigation: false,
            hideDrawer: true,
          },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "createcompany" */ './views/ControlPanel/CreateCompany.vue'),
        },
        {
          path: 'addbalance',
          name: 'addbalance',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN, routePerimeter.HASCOMPANY],
            showInNavigation: false,
          },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "earnCredits" */ './views/ControlPanel/EarnCredits.vue'),
        },
        {
          path: 'interview/details/:id',
          name: 'interviewDetails',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN, routePerimeter.HASCOMPANY],
            showInNavigation: false,
          },
          component: () =>
            import(/* webpackChunkName: "interviewDetail" */ './views/ControlPanel/InterviewDetail.vue'),
          props: route => ({ id: route.params.id }),
        },
        {
          path: 'result/details/:id',
          name: 'resultDetails',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN, routePerimeter.HASCOMPANY],
            showInNavigation: false,
          },
          component: () =>
            import(/* webpackChunkName: "resultDetail" */ './views/ControlPanel/ResultDetail.vue'),
          props: route => ({ id: route.params.id }),
        },
        {
          path: 'createTemplate',
          name: 'createTemplate',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN, routePerimeter.ISADMIN],
            showInNavigation: true,
            icon: 'layers',
            title: 'Create Template',
          },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "createTemplate" */ './views/ControlPanel/CreateTemplate.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        perimeter: [routePerimeter.NOTLOGGEDIN],
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      meta: {
        perimeter: [routePerimeter.NOTLOGGEDIN],
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "signup" */ './views/Signup.vue'),
    },
    {
      path: '*',
      component: () =>
        import(/* webpackChunkName: "notfound" */ './views/PageNotFound.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle)
    document.title = 'Chartr - ' + nearestWithTitle.meta.title;
  else document.title = 'Chartr';

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
    el => el.parentNode.removeChild(el),
  );

  if (nearestWithMeta) {
    nearestWithMeta.meta.metaTags
      .map(tagDef => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
          tag.setAttribute(key, tagDef[key]);
        });

        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
      })
      .forEach(tag => document.head.appendChild(tag));
  }

  if (to.meta.perimeter) {
    const { data } = await provider.defaultClient.query({
      fetchPolicy: 'cache-first',
      errorPolicy: 'ignore',
      query: require('@/graphql/MeQuery.gql'),
    });

    let user;

    if (!data) {
      user = null;
    } else {
      user = data.me;
    }

    const faultyPerimeter = to.meta.perimeter.find(
      perimeter => !perimeter.check(user),
    );

    if (faultyPerimeter) {
      next({ name: faultyPerimeter.redirect });
      return;
    }
  }

  next();
});

export default router;

export function testPerimeter(routePerimeter, user) {
  if (routePerimeter) {
    const faultyPerimeter = routePerimeter.find(
      perimeter => !perimeter.check(user),
    );

    if (faultyPerimeter) {
      return false;
    }
    return true;
  }
  return true;
}
