<template>
  <v-container>
    <v-layout>
      <v-flex md8 sm12>
        <v-card>
          <v-card-title>
            <v-layout justify-space-between>
              <div class="headline">Results</div>
              <!-- TODO: Add filter -->
            </v-layout>
          </v-card-title>

          <v-card-text>
            <results-list/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ResultsList from '@/components/Lists/ResultsList.vue';

export default {
  components: {
    ResultsList,
  },
};
</script>
