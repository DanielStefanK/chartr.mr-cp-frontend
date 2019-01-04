<template>
  <v-container>
    <v-layout>
      <v-flex md8 sm12>
        <v-card>
          <v-card-title>
            <v-layout justify-space-between>
              <div class="headline">Interviews</div>
              <!-- TODO: Add filter -->
            </v-layout>
          </v-card-title>

          <v-card-text>
            <interview-list/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import InterviewList from '@/components/Lists/InterviewList.vue';

export default {
  components: {
    InterviewList,
  },
};
</script>
