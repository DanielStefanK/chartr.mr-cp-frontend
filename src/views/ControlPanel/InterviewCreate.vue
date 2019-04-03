<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-layout row wrap justify-center>
              <v-flex xs4>
                <draggable
                  tag="div"
                  :list="copyList"
                  :group="{ name: 'clone', pull: 'clone', put: false }"
                  :clone="clone"
                >
                  <v-card>
                    <p class="title text-xs-center pa-3" :key="copyList[0].id">New Question</p>
                  </v-card>
                </draggable>
              </v-flex>
              <v-flex xs4>
                <v-btn @click="add">add</v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn @click="onSaveDialog">Save</v-btn>
                <interview-save-dialog
                  @save="onSaveInterview"
                  @cancel="onCancel"
                  :value="dialogSave"
                />
                <v-btn flat @click="dialogTempalte = true">from template</v-btn>
                <from-template-dialog v-model="dialogTempalte" @newTemplate="fromTemplate"/>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <p class="title">Interview</p>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <nested-question :value="questions" @input="input"/>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { EventBus } from '@/utils/eventBus';

import COMPANY_QUERY from '@/graphql/myCompanyQuery.gql';
import Draggable from 'vuedraggable';
import NestedQuestion from '@/components/NestedQuestion';
import cloneDeep from 'lodash/cloneDeep';

import InterviewSaveDialog from '@/components/CreateUpdateDialogs/InterviewSaveDialog';

import FromTemplateDialog from '@/components/CreateUpdateDialogs/FromTemplateDialog';

export default {
  components: {
    Draggable,
    NestedQuestion,
    InterviewSaveDialog,
    FromTemplateDialog,
  },

  data() {
    return {
      dialogSave: false,
      dialogTempalte: false,
      copyList: [
        {
          id: 123,
          question: 'New Question',
        },
      ],
      questions: [],
    };
  },

  methods: {
    clone(i) {
      return {
        ...i,
        id:
          '_' +
          Math.random()
            .toString(36)
            .substr(2, 9),
        subQuestions: [],
        time: null,
        distraction: 0,
        answerTags: [{ tag: 'goodTag', value: 100 }],
        matchTags: ['matchme'],
      };
    },
    add() {
      this.questions = [
        ...this.questions,
        this.clone({ question: 'New Question' }),
      ];
    },
    input(q) {
      this.questions = [...q];
    },
    onSaveDialog() {
      this.dialogSave = true;
    },
    onSaveInterview(additional) {
      const questions = this.buildQuestions(this.questions);
      console.log(questions);

      this.$apollo
        .mutate({
          mutation: require('@/graphql/createInterviewMutation.gql'),
          variables: {
            data: {
              ...additional,
              interview: {
                create: questions,
              },
            },
          },
          refetchQueries: ['myInterviews', 'myInterviewsConnection'],
          update: (
            store,
            {
              data: {
                createInterview: { newBalance },
              },
            },
          ) => {
            const data = store.readQuery({
              query: COMPANY_QUERY,
            });
            data.myCompany.credits = newBalance;
            store.writeQuery({ query: COMPANY_QUERY, data });
          },
        })
        .then(({ data }) => {
          this.dialogSave = false;
          this.dialog = false;
          EventBus.$emit('snackbar', {
            text: 'Successfully created Interview!',
            color: 'success',
          });
          this.$router.push({
            name: 'interviewDetails',
            params: { id: data.createInterview.id },
          });
        })
        .catch(() => {
          EventBus.$emit('snackbar', {
            text: 'could not create Interview!',
            color: 'error',
          });
        });
    },
    onCancel() {
      this.dialogSave = false;
    },
    buildQuestions(q, no = 0, sub = false) {
      console.log(q);
      return q.map(question => {
        return {
          number: no++,
          question: question.question,
          distraction: question.distraction,
          time: question.time,
          matchTags: sub
            ? {
                set: question.matchTags,
              }
            : [],
          givenAnswers: null,
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
    fromTemplate(qs) {
      this.questions = cloneDeep(qs);
    },
  },
};
</script>

<style>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
