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
                :error-messages="validationErrors('name',
                  {
                    required: 'Please enter an Name',
                    minLength: 'Name too short',
                    alphaNum: 'Name must be alphanumerical',
                    maxLength: 'Name too long',
                  })"
                v-model="name"
                prepend-icon="person"
                name="name"
                label="Name"
                type="text"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                :disabled="isLoading"
                :error-messages="validationErrors('email',
                  {
                    required: 'Please enter an email',
                    email: 'Please enter a valid email',
                    minLength: 'E-Mail too short',
                    maxLength: 'E-Mail too long',
                  })"
                v-model="email"
                prepend-icon="alternate_email"
                name="email"
                label="E-Mail"
                type="email"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                :disabled="isLoading"
                :error-messages="validationErrors('password',
                  {
                    required: 'Please Enter a password',
                    minLength: 'Password must containt at leads 6 symbols'
                  })"
                v-model="password"
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                @blur="$v.password.$touch()"
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
import {
  required,
  minLength,
  maxLength,
  alphaNum,
  email,
} from 'vuelidate/lib/validators';

import { onLogin } from '../plugins/vue-apollo';

import { EventBus } from '../utils/eventBus';
import validationMixins from '@/mixins/validationHelper';

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      isLoading: false,
    };
  },

  mixins: [validationMixins],

  validations: {
    email: {
      required,
      email,
      minLength: minLength(4),
      maxLength: maxLength(30),
    },
    password: {
      required,
      minLength: minLength(6),
    },
    name: {
      required,
      minLength: minLength(2),
      alphaNum,
      maxLength: maxLength(30),
    },
  },

  methods: {
    signup() {
      if (!this.$v.$invalid) {
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
            await onLogin(
              this.$apollo.provider.defaultClient,
              data.signup.token,
            );
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
      } else {
        this.$v.$touch();
      }
    },
  },
};
</script>
