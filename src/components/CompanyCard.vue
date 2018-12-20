<template>
  <div>
    <v-layout :reverse="$vuetify.breakpoint.xsOnly" :column="$vuetify.breakpoint.xsOnly" wrap>
      <v-flex xs12 sm7>
        <v-card-title primary-title>
          <div v-if="$apollo.loading">Loading...</div>
          <div v-else>
            <div class="headline">{{me.company.name}}</div>
            <div>Contact: {{me.company.contact.name}} ({{me.company.contact.email}})</div>
            <div>Employees: {{me.company.employees.length}}</div>
            <div>Interviews: {{me.company.interviews.length}}</div>
          </div>
        </v-card-title>
      </v-flex>
      <v-flex xs12 sm5 pt-3>
        <v-img :src="businessImg" height="125px" contain></v-img>
      </v-flex>
    </v-layout>
    <v-card-actions>
      <v-spacer/>
      <v-btn icon>
        <!--TODO: route to edit company-->
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      businessImg: require('@/assets/business.svg'),
    };
  },

  apollo: {
    me: gql`
      query {
        me {
          id
          company {
            id
            name
            employees {
              id
            }
            interviews {
              id
            }
            contact {
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
