<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app v-if="showDrawer">
      <v-list dense v-if="$vuetify.breakpoint.mdAndDown">
        <v-list-tile>
          <v-spacer/>
          <v-btn icon @click.stop="drawer = !drawer">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
      <v-list two-line>
        <v-list-tile avatar v-if="me" :key="me.email">
          <v-list-tile-avatar>
            <img src="@/assets/defaultProfile.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="me.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="me.email"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-switch label="dark" v-model="dark"></v-switch>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile v-for="route in routes" :key="route.id" :to="{name: route.id}" exact>
          <v-list-tile-action>
            <v-icon>{{route.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{route.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon v-if="showDrawer" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Charter</v-toolbar-title>
      <v-spacer/>
      <v-menu v-model="creditsMenu" :close-on-content-click="false" :nudge-width="200" offset-y>
        <v-btn slot="activator" color="accent" dark>
          <v-icon>monetization_on</v-icon>
          {{myCompany ? myCompany.credits : '- $'}}
        </v-btn>
        <v-card>
          <v-card-text>
            Your company has
            {{myCompany ? myCompany.credits : '- $'}} $
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="onEarnCredits">add balance</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-tooltip bottom>
        <v-btn @click="logout" slot="activator" flat icon>
          <v-icon>input</v-icon>
        </v-btn>
        <span>Logout</span>
      </v-tooltip>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017 Chartr</span>
    </v-footer>
  </v-app>
</template>

<script>
import gql from 'graphql-tag';
import { onLogout } from '../plugins/vue-apollo.js';

import { testPerimeter } from '../router.js';
import { EventBus } from '@/utils/eventBus';

export default {
  data: () => ({
    drawer: null,
    dark: false,
    creditsMenu: false,
  }),

  apollo: {
    me: gql`
      query {
        me {
          id
          name
          company {
            id
          }
          email
          permissions
        }
      }
    `,
    myCompany: require('@/graphql/myCompanyQuery.gql'),
  },

  computed: {
    showDrawer() {
      return !this.$route.meta.hideDrawer;
    },

    routes() {
      return this.$router.options.routes[0].children
        .filter(
          route =>
            route.meta.showInNavigation &&
            testPerimeter(route.meta.perimeter, this.me),
        )
        .map(route => {
          return {
            id: route.name,
            icon: route.meta.icon,
            title: route.meta.title,
          };
        });
    },
  },

  watch: {
    dark(newValue) {
      EventBus.$emit('darkMode', newValue);
      localStorage.setItem('darkMode', newValue ? '1' : '0');
    },
  },

  methods: {
    async logout() {
      await onLogout(this.$apollo.provider.defaultClient);
      this.$router.push({ name: 'login' });
    },
    onEarnCredits() {
      this.creditsMenu = false;
      this.$router.push({ name: 'addbalance' });
    },
  },
  created() {
    this.dark = localStorage.getItem('darkMode') === '1' ? true : false;
  },
};
</script>
