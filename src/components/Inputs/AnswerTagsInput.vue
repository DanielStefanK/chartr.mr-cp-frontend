<template>
  <v-layout row wrap>
    <v-flex xs12 md4>
      <v-text-field
        v-model="tag"
        label="Tag"
        @keyup.enter="add" />
    </v-flex>
    <v-flex xs12 md6>
      <v-slider
        :min="-200"
        :max="200"
        @keyup.enter="add"
        v-model="matchAmount"
        append-icon="thumb_up"
        prepend-icon="thumb_down"
        thumb-label
      />
    </v-flex>
    <v-flex xs12 md2>
      <v-btn @click="add">add</v-btn>
    </v-flex>
    <v-flex>
      <transition-group name="list">
        <v-chip
          class="list-item"
          @input="remove(idx)"
          close
          v-for="(item, idx) in internalTags"
          :key="item.tag"
        >
          <v-avatar class="primary lighten-3">{{item.value}}</v-avatar>
          {{item.tag}}
        </v-chip>
      </transition-group>
    </v-flex>
  </v-layout>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      tag: '',
      matchAmount: 100,
      internalTags: [],
    };
  },

  created() {
    this.internalTags = cloneDeep(this.value);
  },

  watch: {
    value: {
      handler() {
        this.internalTags = cloneDeep(this.value);
      },
      deep: true,
    },
  },

  methods: {
    add() {
      if (this.tag === '') {
        return;
      }
      const addItem = {
        tag: this.tag,
        value: this.matchAmount,
      };
      const found = this.internalTags.findIndex(item => {
        return item.tag === this.tag;
      });

      if (found >= 0) {
        this.remove(found);
      }

      this.tag = '';
      this.matchAmount = 100;

      this.internalTags.push(addItem);
      this.$emit('input', this.internalTags);
    },

    remove(idx) {
      this.internalTags.splice(idx, 1);
      this.$emit('input', this.internalTags);
    },
  },
};
</script>

<style>
.list-item {
  transition: all 0.5s;
}
.list-enter, .list-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
