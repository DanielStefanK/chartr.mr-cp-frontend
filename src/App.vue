<template>
  <v-app :dark="dark">
    <transition mode="out-in" :name="transitionName">
      <router-view></router-view>
    </transition>
    <v-snackbar v-model="snackbar" :timeout="5000" :color="snackbarColor">{{ snackbarText }}</v-snackbar>
  </v-app>
</template>

<script>
import { EventBus } from './utils/eventBus';

export default {
  name: 'App',

  data() {
    return {
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'error',
      transitionName: 'fade',
      dark: false,
    };
  },

  watch: {
    $route(to, from) {
      switch (to.name) {
        case 'signup':
          this.transitionName = 'slide-left';
          break;
        case 'login':
          if (from.name === 'signup') this.transitionName = 'slide-right';
          else this.transitionName = 'fade';
          break;
        default:
          this.transitionName = 'fade';
      }
    },
  },

  created() {
    EventBus.$on('snackbar', data => {
      this.snackbarText = data.text;
      this.snackbarColor = data.color;
      this.snackbar = true;
    });
    EventBus.$on('darkMode', data => {
      this.dark = data;
    });
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
