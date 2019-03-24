<template>
  <div>
    <v-card-title primary-title>
      <div>
        <div class="headline">Recent Results</div>
      </div>
    </v-card-title>
    <v-card-text>
      <div v-if="$apollo.loading">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
      <template v-else-if="myResults? myResults.length > 0 : false">
        <tiny-results-list :loading="$apollo.loading" :results="myResults"/>
      </template>
      <template v-else>No Results yet</template>
    </v-card-text>
  </div>
</template>

<script>
import TinyResultsList from '../Lists/TinyResultsList.vue';

export default {
  components: {
    TinyResultsList,
  },

  data() {
    return {
      businessImg: require('@/assets/business.svg'),
    };
  },

  apollo: {
    myResults: {
      query: require('@/graphql/myResultsQuery.gql'),
      variables() {
        return {
          orderBy: 'createdAt_DESC',
          first: 5,
          skip: 0,
        };
      },
    },
  },
};
</script>
