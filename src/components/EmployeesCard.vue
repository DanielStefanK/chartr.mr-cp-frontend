<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline">Recent Employees</div>
      </div>
    </v-card-title>
    <v-card-text>
      <div v-if="$apollo.loading">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
      <user-list v-else :users="employees" :me="me"/>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn icon @click="$router.push ({name: 'editemployees'})">
        <!--TODO: route to edit employees-->
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UserList from './UserList';

export default {
  data() {
    return {
      businessImg: require('@/assets/business.svg'),
    };
  },

  computed: {
    employees() {
      if (!this.myEmployees || !this.me) return [];
      return this.myEmployees.filter(
        user => user.id !== this.me.id && !user.deleted,
      );
    },
  },

  apollo: {
    myEmployees: {
      query: require('@/graphql/myEmployeesQuery.gql'),
      variables: {
        first: 5,
        orderBy: 'createdAt_ASC',
        where: {
          deleted: false,
        },
      },
    },
    me: {
      query: require('@/graphql/MeQuery.gql'),
    },
  },

  components: {
    UserList,
  },
};
</script>
