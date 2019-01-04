<template>
  <v-dialog v-model="dialog" width="500">
    <div slot="activator" v-if="this.$slots.default">
      <slot></slot>
    </div>
    <div slot="activator" v-else>
      <v-btn flat icon>
        <v-icon>edit</v-icon>
      </v-btn>
    </div>

    <v-card>
      <v-card-title primary-title>
        <div>
          <div class="headline">Select User</div>
        </div>
      </v-card-title>
      <v-card-text>
        <user-list @removeUser="add" :users="users" selectable/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { EventBus } from '../utils/eventBus';

import UserList from './UserList';

export default {
  props: {
    users: {
      type: Array,
      required: false,
    },
  },

  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    async add(user) {
      this.dialog = false;
      this.$emit('selected', user);
      EventBus.$emit('snackbar', {
        text: 'A user was selected',
        color: 'success',
      });
    },
  },

  components: {
    UserList,
  },
};
</script>
