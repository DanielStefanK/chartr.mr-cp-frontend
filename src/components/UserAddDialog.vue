<template>
  <v-dialog v-model="dialog" width="500">
    <div slot="activator">
      <v-btn flat icon>
        <v-icon>add</v-icon>
      </v-btn>Add a user to your company
    </div>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Add User</v-card-title>
      <form @submit.prevent="add">
        <v-card-text>
          <v-text-field v-model="name" prepend-icon="person" name="name" label="Name" type="text"></v-text-field>
          <v-text-field v-model="email" prepend-icon="alternate_email" label="E-Mail" type="email"></v-text-field>
          <v-text-field
            v-model="password"
            id="password"
            prepend-icon="lock"
            label="Password"
            type="password"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat type="submit">add</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      name: '',
      email: '',
      password: '',
    };
  },

  methods: {
    add() {
      this.$emit('add', {
        name: this.name,
        password: this.password,
        email: this.email,
      });

      this.name = '';
      this.email = '';
      this.password = '';
      this.dialog = false;
    },
  },
};
</script>
