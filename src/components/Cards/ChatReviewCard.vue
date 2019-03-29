<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap v-for="pair in content" :key="pair.d">
        <q-a-pair :pair="pair"/>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import QAPair from './Chat/QAPair';

export default {
  components: {
    QAPair,
  },
  props: {
    content: Array,
  },
};
</script>
