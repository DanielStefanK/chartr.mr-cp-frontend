import Vue from 'vue';
import Router from 'vue-router';
import ControlPanel from './views/ControlPanel.vue';
import provider from './plugins/vue-apollo';
import gql from 'graphql-tag';

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
    redirect: 'dashboard',
  },

  NOTLOGGEDIN: {
    check(user) {
      return !user;
    },
    redirect: 'dashboard',
  },

  HASNOCOMPANY: {
    check(user) {
      return !!user.company;
    },
    redirect: 'dashboard',
  },
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: ControlPanel,
      children: [
        {
          path: '',
          meta: {
            perimeter: [routePerimeter.LOGGEDIN],
          },
          name: 'dashboard',
          component: () =>
            import(/* webpackChunkName: "dashboard" */ './views/ControlPanel/Dashboard.vue'),
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
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.perimeter) {
    const { data } = await provider.defaultClient.query({
      fetchPolicy: 'cache-first',
      errorPolicy: 'ignore',
      query: gql`
        query me {
          me {
            id
            permissions
            company {
              id
            }
          }
        }
      `,
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
