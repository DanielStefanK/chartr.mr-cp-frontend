<template>
  <v-card color="grey" class="elevation-3 black--text">
    <v-card-text>
      <v-text-field v-model="question.question" name="question" label="Question" type="text"></v-text-field>
      <v-expansion-panel expand>
        <v-expansion-panel-content>
          <template slot="header">Additional</template>
          <v-card>
            <v-card-text>
              <!-- TODO: Validation -->
              <answer-tags-input v-model="question.answerTags"/>
              <v-combobox
                v-if="subQuestion"
                v-model="question.matchTags"
                label="Match tags"
                chips
                clearable
                multiple
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    @input="removeMatchTags(data.item)"
                  >{{ data.item }}</v-chip>
                </template>
              </v-combobox>
              <v-slider
                v-model="question.distraction"
                label="Distraction Level"
                step="1"
                max="10"
                ticks
              />
              <v-text-field
                clearable
                v-model="time"
                name="time"
                label="Time in seconds"
                type="number"
              ></v-text-field>
              <!-- ** <v-combobox
                v-model="question.givenAnswers"
                label="Given Answers"
                chips
                clearable
                multiple
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    @input="removeGivenAnswers(data.item)"
                  >{{ data.item }}</v-chip>
                </template>
              </v-combobox>-->
              <questions :depth="depth+1" subQuestions v-model="question.subQuestions"/>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn icon ripple @click="remove">
        <v-icon color="error lighten-1">delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AnswerTagsInput from '../Inputs/AnswerTagsInput';

export default {
  name: 'QuestionEditCard',

  components: {
    AnswerTagsInput,
  },

  props: {
    value: Object,
    subQuestion: Boolean,
    depth: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      question: {
        question: '',
        answerTags: [],
        matchTags: [],
        distraction: 0,
        time: null,
        givenAnswers: [],
        subQuestions: [],
      },
    };
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
    removeAnswerTags(item) {
      this.question.answerTags.splice(
        this.question.answerTags.indexOf(item),
        1,
      );
      this.question.answerTags = [...this.question.answerTags];
    },
    removeMatchTags(item) {
      this.question.matchTags.splice(this.question.matchTags.indexOf(item), 1);
      this.question.matchTags = [...this.question.matchTags];
    },
    removeGivenAnswers(item) {
      this.question.givenAnswers.splice(
        this.question.givenAnswers.indexOf(item),
        1,
      );
      this.question.givenAnswers = [...this.question.givenAnswers];
    },
  },
  watch: {
    question: {
      handler() {
        this.$emit('input', this.question);
      },
      deep: true,
    },
  },

  computed: {
    time: {
      get() {
        return this.question.time;
      },
      set(val) {
        this.question.time = Number.parseInt(val);
      },
    },
  },

  beforeCreate: function() {
    this.$options.components.Questions = require('@/components/Questions.vue').default;
  },
};
</script>
