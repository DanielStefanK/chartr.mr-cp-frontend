<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <form @submit.prevent="login">
            <v-card-text>
              <v-text-field
                v-model="email"
                prepend-icon="alternate_email"
                name="email"
                label="E-Mail"
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>New to chartr? Sign up&nbsp;
              <router-link to="signup">here</router-link>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">Login</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag';

import { onLogin } from '../plugins/vue-apollo.js';

import { EventBus } from '../utils/eventBus';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    login() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation login($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                token
                me {
                  name
                  id
                  permissions
                  company {
                    id
                  }
                }
              }
            }
          `,

          variables: {
            email: this.email,
            password: this.password,
          },
        })
        .then(async ({ data }) => {
          await onLogin(this.$apollo.provider.defaultClient, data.login.token);
          EventBus.$emit('snackbar', {
            text: 'Successfully logged in',
            color: 'success',
          });
          this.$apollo.provider.defaultClient.writeQuery({
            query: gql`
              query me {
                me {
                  name
                  id
                  permissions
                  company {
                    id
                  }
                }
              }
            `,
            data: {
              me: data.login.me,
            },
          });
          this.$router.push({ name: 'dashboard' });
        })
        .catch(error => {
          console.log(error);
          EventBus.$emit('snackbar', {
            text: 'Wrong password/username',
            color: 'error',
          });
        });
    },
  },
};
</script>
