<template>
  <v-list two-line>
    <template v-for="(user) in users">
      <v-list-tile :key="user.name" avatar>
        <v-list-tile-avatar>
          <img src="@/assets/defaultProfile.jpg">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-html="user.name"></v-list-tile-title>
          <v-list-tile-sub-title v-html="user.email"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  props: {
    users: { type: Array, required: true },
  },
};
</script>
