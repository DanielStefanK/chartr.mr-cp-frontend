<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog">
      <template slot="activator">
        <v-btn fab small color="primary">
          <v-icon dark>edit</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Edit Question</v-card-title>

        <v-card-text>
              <v-text-field
                v-model="q.question"
                name="question"
                label="Question"
              ></v-text-field>
              <answer-tags-input v-model="q.answerTags"/>
              <v-combobox
                v-if="subQuestion"
                v-model="q.matchTags"
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
                v-model="q.distraction"
                label="Distraction Level"
                step="1"
                max="10"
                ticks
              />
              <v-text-field
                clearable
                v-model="q.time"
                name="time"
                label="Time in seconds"
                type="number"
              ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AnswerTagsInput from './Inputs/AnswerTagsInput';

export default {
  components: {
    AnswerTagsInput,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
    subQuestion: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      dialog: false,
      q: {
        question: '',
        answerTags: [],
        matchTags: [],
        distraction: 0,
        time: null,
        id: 1,
      },
    };
  },
  created() {
    this.q = JSON.parse(JSON.stringify(this.question));
  },
  watch: {
    question: {
      handler() {
        this.q = JSON.parse(JSON.stringify(this.question));
      },
      deep: true,
    },
  },

  methods: {
    save() {
      this.dialog = false;
      this.$emit('save', this.q);
    },
    delete() {
      this.dialog = false;
      this.$emit('delete');
    },
  },
};
</script>
