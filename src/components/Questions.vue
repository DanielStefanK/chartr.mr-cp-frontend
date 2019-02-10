<template>
  <v-layout column>
    <transition-group name="list" tag="p" v-if="depth<=2">
      <v-flex xs12 v-for="(q,idx) in questions" :key="q.id" mb-3>
        <question-edit-card
          :subQuestion="subQuestions"
          v-model="q.question"
          :id="q.id"
          @remove="remove (idx)"
          :depth="depth"
        />
      </v-flex>
    </transition-group>
    <v-flex xs12 v-if="depth<=2">
      <v-tooltip bottom>
        <v-btn slot="activator" @click="addQuestion" icon>
          <v-icon>add</v-icon>
        </v-btn>
        <span>{{depth === 0 ? 'Add Question':'Add Sub-Question'}}</span>
      </v-tooltip>
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
    return {};
  },

  computed: {
    questions: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit('input', newVal);
      },
    },
  },

  methods: {
    buildQuestions(questions, no = 0, sub = false) {
      return questions.map(({ question }) => {
        this.checkValidity(question, sub);

        return {
          number: no++,
          question: question.question,
          distraction: question.distraction,
          time: question.time,
          matchTags: {
            set: question.matchTags,
          },
          givenAnswers: {
            set: question.givenAnswers,
          },
          answerTags: {
            create: question.answerTags,
          },
          subQuestions:
            question.subQuestions && question.subQuestions.length > 0
              ? {
                  create: this.buildQuestions(question.subQuestions, no, true),
                }
              : [],
        };
      });
    },

    checkValidity(q, sub) {
      if (!q.question || q.question === '') {
        throw 'Question cannot be empty';
      }

      if (!q.answerTags || q.answerTags.length === 0) {
        throw 'Answer Tags cannot be empty';
      }

      if (q.time && !Number.isInteger(q.time)) {
        throw 'Time must be a number';
      }

      if (sub && (!q.matchTags || q.matchTags.length === 0)) {
        throw 'Match tags of subquestion cannot be empty';
      }
    },

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
