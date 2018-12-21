<template>
  <v-container>
    <v-layout>
      <v-flex md8 sm12>
        <v-card>
          <v-card-title>
            <v-layout justify-space-between>
              <div class="headline">Employees</div>
              <ApolloMutation
                :mutation="require('@/graphql/addEmployee.gql')"
                :refetchQueries="refetch"
                @done="onDone"
                @error="onError"
              >
                <template slot-scope="{ mutate, loading }">
                  <user-add-dialog @add="addUser (mutate, $event)">
                    <v-tooltip bottom>
                      <v-btn :loading="loading" icon slot="activator">
                        <v-icon>add</v-icon>
                      </v-btn>
                      <span>Add Employee</span>
                    </v-tooltip>
                  </user-add-dialog>
                </template>
              </ApolloMutation>
            </v-layout>
          </v-card-title>

          <v-card-text>
            <v-layout>
              <v-flex xs12>
                <template v-if="$apollo.loading">
                  <v-progress-linear indeterminate></v-progress-linear>
                </template>

                <div v-else>
                  <!-- TODO: update user dialog on click on one -->
                  <user-list
                    removeable
                    :me="me ? me : null"
                    :users="employees"
                    @removeUser="onRemoveUser"
                  />
                  and {{deletedEmployees.length}} deleted
                </div>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import gql from 'graphql-tag';
import { EventBus } from '@/utils/eventBus';

import UserAddDialog from '@/components/UserAddDialog.vue';
import UserList from '@/components/UserList.vue';

export default {
  components: {
    UserList,
    UserAddDialog,
  },

  apollo: {
    myEmployees: {
      query: require('@/graphql/myEmployeesQuery.gql'),
      variables: {
        orderBy: 'createdAt_DESC',
      },
    },
    me: require('@/graphql/MeQuery.gql'),
  },

  computed: {
    employees() {
      return this.myEmployees && this.me
        ? this.myEmployees.filter(
            usr => usr.email !== this.me.email && usr.deleted === false,
          )
        : [];
    },

    deletedEmployees() {
      return this.myEmployees && this.me
        ? this.myEmployees.filter(
            usr => usr.email !== this.me.email && usr.deleted === true,
          )
        : [];
    },
  },

  methods: {
    addUser(mutate, user) {
      console.log(user);

      mutate({ variables: { ...user } });
    },
    refetch() {
      return ['myEmployees', 'myCompany'];
    },
    onError() {
      EventBus.$emit('snackbar', {
        text: 'User could ne be added',
        color: 'error',
      });
    },
    onDone() {},
    onRemoveUser(user) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($id: ID!) {
            removeEmployee(id: $id) {
              id
            }
          }
        `,
        refetchQueries: this.refetch(),
        variables: {
          id: user.id,
        },
      });
    },
  },
};
</script>
