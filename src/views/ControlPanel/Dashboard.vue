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
import CompanyCard from '@/components/Cards/CompanyCard';
import EmployeesCard from '@/components/Cards/EmployeesCard';
import RecentInterviewsCard from '@/components/Cards/RecentInterviewsCard';
import RecentResultsCard from '@/components/Cards/RecentResultsCard';

export default {
  components: {
    CompanyCard,
    EmployeesCard,
    RecentInterviewsCard,
    RecentResultsCard,
  },
};
</script>
