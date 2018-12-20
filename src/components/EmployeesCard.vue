<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline">Employees</div>
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
      <v-btn icon>
        <!--TODO: route to edit employees-->
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import gql from 'graphql-tag';
import UserList from './UserList';

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
    me: gql`
      query {
        me {
          id
          name
          email
          company {
            id
            employees {
              id
              name
              email
            }
          }
        }
      }
    `,
  },

  components: {
    UserList,
  },
};
</script>
