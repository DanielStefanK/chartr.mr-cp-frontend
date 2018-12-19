<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8>
        <v-card class="elevation-12">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Create a Company</h3>
              <div>You do not have a company associated with your account
                <br>Please create one right here
              </div>
            </div>
          </v-card-title>
          <form @submit.prevent="submit">
            <v-card-text>
              <v-layout column>
                <v-flex xs12>
                  <v-text-field
                    v-model="name"
                    prepend-icon="business"
                    label="Company Name"
                    type="text"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <user-list :users="users"/>
                  <user-add-dialog @add="addUser"/>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">Submit</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserAddDialog from '@/components/UserAddDialog.vue';
import UserList from '@/components/UserList.vue';

export default {
  data() {
    return {
      name: '',
      users: [],
    };
  },

  methods: {
    submit() {
      alert('yay');
    },
    addUser(user) {
      this.users.push(user);
    },
  },

  components: {
    UserAddDialog,
    UserList,
  },
};
</script>
