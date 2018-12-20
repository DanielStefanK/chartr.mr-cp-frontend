<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <v-card color="accent darken-3" class="white--text" height="100%">
          <company-card/>
        </v-card>
      </v-flex>
      <v-flex sm12 md6>
        <v-card height="100%">
          <employees-card/>
        </v-card>
      </v-flex>
      <v-flex sm12 md6>
        <v-card height="100%">
          <recent-interviews-card/>
        </v-card>
      </v-flex>
      <v-flex sm12 md6>
        <v-card height="100%">
          <recent-results-card/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CompanyCard from '@/components/CompanyCard';
import EmployeesCard from '@/components/EmployeesCard';
import RecentInterviewsCard from '@/components/RecentInterviewsCard';
import RecentResultsCard from '@/components/RecentResultsCard';

export default {
  components: {
    CompanyCard,
    EmployeesCard,
    RecentInterviewsCard,
    RecentResultsCard,
  },
};
</script>
