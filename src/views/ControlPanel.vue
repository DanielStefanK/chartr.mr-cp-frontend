<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app v-if="showDrawer">
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon v-if="showDrawer" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Charter</v-toolbar-title>
      <v-spacer/>
      <v-tooltip bottom>
        <v-btn @click="logout" slot="activator" flat icon color="accent">
          <v-icon>input</v-icon>
        </v-btn>
        <span>Logout</span>
      </v-tooltip>
    </v-toolbar>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017 Chartr</span>
    </v-footer>
  </v-app>
</template>

<script>
import { onLogout } from '../plugins/vue-apollo.js';

export default {
  data: () => ({
    drawer: null,
  }),

  computed: {
    showDrawer() {
      return !this.$route.meta.hideDrawer;
    },
  },

  methods: {
    async logout() {
      await onLogout(this.$apollo.provider.defaultClient);
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
