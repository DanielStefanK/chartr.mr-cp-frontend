<template>
  <v-card color="grey lighten-3" class="elevation-3">
    <v-card-text>
      <v-text-field v-model="question.question" name="question" label="Question" type="text"></v-text-field>
      <v-expansion-panel popout expand>
        <v-expansion-panel-content>
          <template slot="header">Additional</template>
          <v-card>
            <v-card-text>
              <!-- TODO: Validation -->
              <v-combobox
                v-model="question.answerTags"
                label="Good answer tags"
                chips
                clearable
                multiple
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    @input="removeAnswerTags(data.item)"
                  >{{ data.item }}</v-chip>
                </template>
              </v-combobox>
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
                v-model="question.time"
                name="time"
                label="Time in seconds"
                type="number"
              ></v-text-field>
              <v-combobox
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
              </v-combobox>
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
export default {
  name: 'QuestionEditCard',
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

  beforeCreate: function() {
    this.$options.components.Questions = require('@/components/Questions.vue').default;
  },
};
</script>
