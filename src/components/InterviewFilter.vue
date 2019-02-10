<template>
  <v-expansion-panel v-model="filter">
    <v-expansion-panel-content>
      <div slot="header">Filter</div>
      <v-card>
        <v-card-text>
          <form @submit.prevent="submit">
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <v-text-field label="Name" v-model="internalFilter.name"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Creator Name" v-model="internalFilter.creator"/>
                </v-flex>
                <v-flex>
                  <v-select :items="activeOptions" v-model="internalFilter.active"></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn flat @click="resetFilter">Reset</v-btn>
          <v-btn @click="submit" color="primary">Search</v-btn>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import isEqual from 'lodash/isEqual';

const getDefault = () => ({
  name: '',
  creator: '',
  active: 'all',
});

export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      internalFilter: {
        name: '',
        creator: '',
        active: 'all',
      },
      filter: null,

      activeOptions: [
        ...['all', 'active', 'inactive'].map(item => ({
          text: item.charAt(0).toUpperCase() + item.slice(1),
          value: item,
        })),
      ],
    };
  },

  computed: {
    isFilterEmpty() {
      return isEqual(this.value, getDefault());
    },
  },

  methods: {
    submit() {
      this.$emit('input', {
        ...this.internalFilter,
      });
      this.filter = null;
    },

    resetFilter() {
      this.internalFilter = getDefault();
      this.submit();
    },
  },
};
</script>
