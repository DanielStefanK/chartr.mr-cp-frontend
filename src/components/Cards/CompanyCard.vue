<template>
  <div>
    <v-layout :reverse="$vuetify.breakpoint.xsOnly" :column="$vuetify.breakpoint.xsOnly" wrap>
      <v-flex xs12 sm7>
        <v-card-title primary-title>
          <div v-if="$apollo.loading || !myCompany">Loading...</div>
          <div v-else>
            <div class="headline">{{myCompany.name}}</div>
            <div>Contact: {{myCompany.contact.name}} ({{myCompany.contact.email}})</div>
            <div>Employees: {{myCompany.employees.length}}</div>
            <div>Interviews: {{myCompany.interviews.length}}</div>
            <div>Balance: {{myCompany.credits}}$</div>
          </div>
        </v-card-title>
      </v-flex>
      <v-flex xs12 sm5 pt-3>
        <v-img :src="businessImg" height="125px" contain></v-img>
      </v-flex>
    </v-layout>
    <v-card-actions>
      <v-spacer/>
      <v-btn icon @click="$router.push ({name: 'editcompany'})">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      businessImg: require('@/assets/business.svg'),
    };
  },

  apollo: {
    myCompany: require('@/graphql/myCompanyQuery.gql'),
  },
};
</script>
