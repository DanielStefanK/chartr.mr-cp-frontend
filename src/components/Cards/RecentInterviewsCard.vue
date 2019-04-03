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
      <template v-else-if="myInterviews? myInterviews.length > 0 : false">
        <tiny-interview-list :loading="$apollo.loading" :interviews="myInterviews"/>
      </template>
      <template v-else>
        No interviews create one
        <router-link :to="{name: 'listinterviews'}">here</router-link>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import TinyInterviewList from '../Lists/TinyInterviewList';

export default {
  components: {
    TinyInterviewList,
  },

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
    myInterviews: {
      query: require('@/graphql/myInterviewsQuery.gql'),
      variables() {
        return {
          orderBy: 'createdAt_DESC',
          where: {
            deleted: false,
          },
          first: 5,
          skip: 0,
        };
      },
    },
  },
};
</script>
