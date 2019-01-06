<template>
  <v-layout column>
    <transition-group name="list" tag="p" v-if="depth<=3">
      <v-flex xs12 v-for="(q,idx) in questions" :key="q.id">
        <question-edit-card
          :subQuestion="subQuestions"
          v-model="q.question"
          :id="q.id"
          @remove="remove (idx)"
          :depth="depth"
        />
      </v-flex>
    </transition-group>
    <v-flex xs12 v-if="depth<=3">
      <v-btn @click="addQuestion" icon>
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import QuestionEditCard from '@/components/Cards/QuestionEditCard.vue';

export default {
  name: 'questions',
  props: {
    value: Array,
    subQuestions: Boolean,
    depth: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      questions: null,
    };
  },

  methods: {
    addQuestion() {
      this.questions.push({
        id:
          '_' +
          Math.random()
            .toString(36)
            .substr(2, 9),
        question: {
          question: '',
          answerTags: [],
          matchTags: [],
          distraction: 0,
          time: null,
          givenAnswers: null,
          subQuestions: [],
        },
      });
    },
    remove(idx) {
      this.questions.splice(idx, 1);
      this.questions = [...this.questions];
    },
  },

  watch: {
    questions() {
      this.$emit('input', this.questions);
    },
  },

  created() {
    this.questions = JSON.parse(JSON.stringify(this.value));
  },

  components: {
    QuestionEditCard,
  },
};
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
