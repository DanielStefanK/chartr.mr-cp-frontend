<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline">Recent Interviews</div>
      </div>
    </v-card-title>
    <v-card-text>
      <div v-if="$apollo.loading">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
      <template v-else-if="myCompany? myCompany.interviews.length > 0 : false">
        <!--TODO: show the interviews and link to them and to all-->
        //interview list
      </template>
      <template v-else>No interviews create one
        <!--TODO: route to edit createInterview-->
        <router-link :to="{name: 'dashboard'}">here</router-link>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      businessImg: require('@/assets/business.svg'),
    };
  },

  computed: {
    employees() {
      if (!this.me) return [];
      return this.me.company.employees.filter(user => user.id !== this.me.id);
    },
  },

  apollo: {
    myCompany: gql`
      query {
        myCompany {
          id
          interviews(
            orderBy: createdAt_DESC
            where: { deleted: false }
            first: 5
          ) {
            id
            name
            results {
              id
            }
            creator {
              id
              name
              email
            }
          }
        }
      }
    `,
  },
};
</script>
