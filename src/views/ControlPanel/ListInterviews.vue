<template>
  <v-container>
    <v-layout>
      <v-flex lg10 sm12>
        <v-card>
          <v-card-title>
            <v-layout justify-space-between>
              <div class="headline">Interviews</div>
              <v-tooltip bottom>
                <v-btn icon slot="activator" :to="{name: 'interviewcreate'}">
                  <v-icon>add</v-icon>
                </v-btn>
                <span>Create Interview</span>
              </v-tooltip>
            </v-layout>
          </v-card-title>

          <v-card-text>
            <interview-filter v-model="filter"/>
            <interview-list v-bind="filter"/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import InterviewList from '@/components/Lists/InterviewList.vue';
import InterviewFilter from '@/components/InterviewFilter.vue';

export default {
  components: {
    InterviewList,
    InterviewFilter,
  },
  data() {
    return {
      filter: {
        name: '',
        creator: '',
        active: 'active',
      },
    };
  },
};
</script>
