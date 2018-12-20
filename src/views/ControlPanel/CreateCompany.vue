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
                    :error-messages="validationErrors('name',
                    {
                      required: 'Please enter an Name',
                      minLength: 'Name too short',
                      maxLength: 'Name too long',
                    })"
                    prepend-icon="business"
                    label="Company Name"
                    type="text"
                    @blur="$v.name.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <ApolloQuery :query="require('@/graphql/MeQuery.gql')" :variables="{ name }">
                    <template slot-scope="{ result: { data, loading } }">
                      <div v-if="loading">
                        <v-progress-linear indeterminate></v-progress-linear>
                      </div>
                      <div v-else>
                        <user-list
                          removable
                          :me="data ? data.me : null"
                          :users="users"
                          @removeUser="removeUser"
                        />
                        <user-add-dialog :users="users" @add="addUser"/>
                      </div>
                    </template>
                  </ApolloQuery>
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
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import { EventBus } from '@/utils/eventBus';
import validationMixins from '@/mixins/validationHelper';

import UserAddDialog from '@/components/UserAddDialog.vue';
import UserList from '@/components/UserList.vue';

export default {
  data() {
    return {
      name: '',
      users: [],
      isLoading: false,
    };
  },

  mixins: [validationMixins],

  validations: {
    name: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(30),
    },
  },

  methods: {
    addUser(user) {
      this.users.push(user);
    },
    removeUser(email) {
      const index = this.users.findIndex(usr => usr.email === email);

      this.users.splice(index, 1);
    },
    submit() {
      if (!this.$v.$invalid) {
        this.isLoading = true;

        this.$apollo
          .mutate({
            mutation: require('@/graphql/createOwnCompanyMutation.gql'),

            variables: {
              name: this.name,
              employees: this.users,
            },
          })
          .then(async ({ data }) => {
            EventBus.$emit('snackbar', {
              text: 'Successfully created Company!',
              color: 'success',
            });
            await this.$apollo.provider.defaultClient.writeQuery({
              query: require('@/graphql/MeQuery.gql'),
              data: {
                me: data.createOwnCompany.contact,
              },
            });
          })
          .catch(error => {
            // TODO: better error handling
            EventBus.$emit('snackbar', {
              text: error.message,
              color: 'error',
            });
          })
          .then(() => {
            this.isLoading = false;
            this.$router.push({ name: 'dashboard' });
          });
      } else {
        this.$v.$touch();
      }
    },
  },

  components: {
    UserAddDialog,
    UserList,
  },
};
</script>
