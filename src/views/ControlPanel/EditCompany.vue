<template>
  <v-container>
    <v-layout>
      <v-flex md8 sm12>
        <v-card>
          <v-card-title>
            <v-layout justify-space-between>
              <div class="headline">Company</div>
              <div>
                Balance: {{myCompany.credits}} $
                <br>Earn more
                <router-link :to="{name: 'addbalance'}">here</router-link>
              </div>
            </v-layout>
          </v-card-title>

          <v-card-text>
            <div v-if="$apollo.loading">
              <v-progress-linear indeterminate></v-progress-linear>
            </div>
            <div v-else>
              <v-text-field v-model="myCompany.name"/>
              <v-list two-line>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img src="@/assets/defaultProfile.jpg">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="myCompany.contact.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="myCompany.contact.email"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action v-if="myEmployees">
                    <select-user @selected="contactSelected" :users="myEmployees"/>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click="updateCompany">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { EventBus } from '@/utils/eventBus';

import SelectUser from '@/components/UserSelectDialog.vue';

export default {
  data() {
    return {
      myCompany: null,
    };
  },

  apollo: {
    myCompany: {
      query: require('@/graphql/justCompanyQuery.gql'),
    },
    myEmployees: {
      query: require('@/graphql/myEmployeesQuery.gql'),
      fetchPolicy: 'network-only',
      variables: {
        orderBy: 'createdAt_DESC',
        where: {
          deleted: false,
        },
      },
    },
  },

  methods: {
    contactSelected(user) {
      this.myCompany.contact = user;
    },
    updateCompany() {
      this.$apollo
        .mutate({
          mutation: require('@/graphql/updateCompanyMutation.gql'),
          variables: {
            name: this.myCompany.name,
            contact: this.myCompany.contact.id,
          },
        })
        .then(() => {
          EventBus.$emit('snackbar', {
            text: 'Company Updated',
            color: 'success',
          });
        })
        .catch(() => {
          EventBus.$emit('snackbar', {
            text: 'Could not update Company',
            color: 'error',
          });
        });
    },
  },

  components: {
    SelectUser,
  },
};
</script>
