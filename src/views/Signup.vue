<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Signup</v-toolbar-title>
          </v-toolbar>
          <form @submit.prevent="signup">
            <v-card-text>
              <v-text-field
                :disabled="isLoading"
                v-model="name"
                prepend-icon="person"
                name="name"
                label="Name"
                type="text"
              ></v-text-field>
              <v-text-field
                :disabled="isLoading"
                v-model="email"
                prepend-icon="alternate_email"
                name="email"
                label="E-Mail"
                type="email"
              ></v-text-field>
              <v-text-field
                :disabled="isLoading"
                v-model="password"
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>Already a chartr? Login &nbsp;
              <router-link to="login">here</router-link>
              <v-spacer></v-spacer>
              <v-btn color="primary" :loading="isLoading" type="submit">Register</v-btn>
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
      name: '',
      isLoading: false,
    };
  },

  methods: {
    signup() {
      //todo validata data
      this.isLoading = true;
      this.$apollo
        .mutate({
          mutation: gql`
            mutation signup(
              $name: String!
              $email: String!
              $password: String!
            ) {
              signup(name: $name, email: $email, password: $password) {
                token
                me {
                  id
                }
              }
            }
          `,

          variables: {
            email: this.email,
            password: this.password,
            name: this.name,
          },
        })
        .then(async ({ data }) => {
          await onLogin(this.$apollo.provider.defaultClient, data.signup.token);
          EventBus.$emit('snackbar', {
            text: 'Successfully registert!',
            color: 'success',
          });
          this.$router.push({ name: 'dashboard' });
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
        });
    },
  },
};
</script>
