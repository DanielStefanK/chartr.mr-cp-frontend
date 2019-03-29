<template>
  <v-container grid-list-md>
    <v-layout justify-start>
      <v-flex xs8>
        <v-card color="accent" mt-0>
          <p class="px-2 py-1">{{pair.q}}</p>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout
      :justify-end="!(pair.sub && pair.sub.length > 0)"
      :justify-space-between="pair.sub && pair.sub.length >0"
    >
      <template v-if="pair.sub && pair.sub.length >0">
        <v-flex xs4>
          <a @click="openSub" style="text-decoration: underline">{{open ? 'less' : 'more'}}</a>
        </v-flex>
      </template>
      <v-flex xs8>
        <v-card mt-0>
          <p class="text-xs-left px-2 py-1">{{pair.a && pair.a!== '' ? pair.a : '-'}}</p>
          <p class="py-0 my-0 pr-2 text-xs-right" style="color: grey">{{secondsSince}} seconds</p>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-for="subPair in pair.sub" :key="subPair.d">
      <v-slide-y-transition>
        <pair v-if="open" :pair="subPair"/>
      </v-slide-y-transition>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Pair',
  props: {
    pair: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      open: false,
    };
  },

  computed: {
    secondsSince() {
      return (
        (this.pair.d / 1000 + '').split('.')[0] +
        '.' +
        (this.pair.d / 1000 + '').split('.')[1].slice(0, 2)
      );
    },
  },

  methods: {
    openSub() {
      this.open = !this.open;
    },
  },
};
</script>
