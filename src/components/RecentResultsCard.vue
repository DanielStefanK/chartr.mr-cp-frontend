<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline">Recent Results</div>
      </div>
    </v-card-title>
    <v-card-text>
      <div v-if="$apollo.loading">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
      <template v-else-if="myCompany? myCompany.results.length > 0 : false">
        <!--TODO: show results and link to all results-->
        //results list
      </template>
      <template v-else>No Results yet</template>
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
          results(
            orderBy: createdAt_DESC
            where: { deleted: false }
            first: 5
          ) {
            id
            createdAt
            name
            email
            score
          }
        }
      }
    `,
  },
};
</script>
