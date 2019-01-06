<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex sm12 md12>
        <v-card>
          <v-card-title>
            <div class="headline">Create Template</div>
          </v-card-title>

          <v-card-text>
            <!-- TODO: validation -->
            <v-layout row wrap>
              <v-flex xs12 sm6 cmd4>
                <v-text-field
                  :disabled="isLoading"
                  v-model="name"
                  name="template-name"
                  label="Name"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="params"
                  label="Parameter that can be subsituted"
                  chips
                  clearable
                  multiple
                >
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      :selected="data.selected"
                      close
                      @input="remove(data.item)"
                    >{{ data.item }}</v-chip>
                  </template>
                </v-combobox>
              </v-flex>
              <v-flex xs12>
                <questions :depth="0" v-model="questions"/>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <!-- TODO: make it work -->
            <v-btn color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Questions from '@/components/Questions.vue';

export default {
  data() {
    return {
      name: '',
      params: [],
      questions: [
        {
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
            givenAnswers: [],
            subQuestions: [],
          },
        },
      ],
      isLoading: false,
    };
  },

  methods: {
    remove(item) {
      this.params.splice(this.params.indexOf(item), 1);
      this.params = [...this.params];
    },
  },

  components: {
    Questions,
  },
};
</script>
