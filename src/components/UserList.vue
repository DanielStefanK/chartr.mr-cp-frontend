<template>
  <v-list two-line>
    <transition-group name="list" tag="p">
      <v-list-tile avatar v-if="me" :key="me.email">
        <v-list-tile-avatar>
          <img src="@/assets/defaultProfile.jpg">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-html="me.name"></v-list-tile-title>
          <v-list-tile-sub-title v-html="me.email"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>you</v-list-tile-action>
      </v-list-tile>
      <template v-for="(user) in users">
        <v-list-tile :key="user.name" avatar>
          <v-list-tile-avatar>
            <img src="@/assets/defaultProfile.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title
              :style=" {textDecoration: user.deleted ? 'line-through' : 'none'}"
              v-html="user.name"
            ></v-list-tile-title>
            <v-list-tile-sub-title v-html="user.email"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="removeable && ! user.deleted">
            <v-btn icon ripple @click="removeUser (user)">
              <v-icon color="error lighten-1">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action v-else-if="selectable">
            <v-btn icon ripple @click="removeUser (user)">
              <v-icon>done</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </transition-group>
  </v-list>
</template>

<script>
export default {
  props: {
    users: { type: Array, required: true },
    me: { type: Object, required: false },
    removeable: { type: Boolean, default: false },
    selectable: { type: Boolean, default: false },
  },
  methods: {
    removeUser(user) {
      this.$emit('removeUser', user);
    },
  },
};
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
