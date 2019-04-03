<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" persistent>
      <template slot="activator">
        <v-btn fab small class="elevation-5" color="primary">
          <v-icon>edit</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Edit Question</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="q.question"
            name="question"
            label="Question"
            :error-messages="validationErrors('q.question',
                    {
                      required: 'Please enter a question',
                    })"
          ></v-text-field>
          <answer-tags-input
            v-model="q.answerTags"
            :error-messages="validationErrors('q.answerTags',
                    {
                      mustHaveLength: 'Please enter at least one match tag',
                    })"
          />
          <v-combobox
            v-if="subQuestion"
            v-model="q.matchTags"
            label="Match tags"
            :error-messages="validationErrors('q.matchTags',
                    {
                      mustHaveLengthSub: 'Please enter at least one match tag',
                    })"
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
          <v-slider v-model="q.distraction" label="Distraction Level" step="1" max="10" ticks/>
          <v-text-field clearable v-model="time" name="time" label="Time in seconds" type="number"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="cancel">cancel</v-btn>
          <v-btn color="error" flat @click="onDelete">delete</v-btn>
          <v-btn color="primary" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import validationMixins from '@/mixins/validationHelper';

import AnswerTagsInput from './Inputs/AnswerTagsInput';

const mustHaveLength = value => Array.isArray(value) && value.length > 0;

const mustHaveLengthSub = (value, vm) =>
  vm.subQuestion ? Array.isArray(value) && value.length > 0 : true;

export default {
  components: {
    AnswerTagsInput,
  },
  mixins: [validationMixins],
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
  validations: {
    q: {
      question: {
        required,
      },
      answerTags: {
        mustHaveLength,
      },
      matchTags: {
        mustHaveLengthSub,
      },
    },
  },
  computed: {
    time: {
      get() {
        return this.q.time;
      },
      set(newVal) {
        const num = Number.parseInt(newVal);
        if (newVal && newVal !== '0' && num !== 0 && !Number.isNaN(num)) {
          this.q.time = num;
        } else {
          this.q.time = null;
        }
      },
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
      if (!this.$v.$invalid) {
        this.dialog = false;
        this.$emit('save', this.q);
      } else {
        this.$v.$touch();
      }
    },
    onDelete() {
      this.dialog = false;
      this.$emit('delete');
    },
    removeMatchTags(item) {
      this.q.matchTags.splice(this.q.matchTags.findIndex(i => i === item), 1);
    },
    cancel() {
      this.dialog = false;
      this.q = JSON.parse(JSON.stringify(this.question));
    },
  },
};
</script>
