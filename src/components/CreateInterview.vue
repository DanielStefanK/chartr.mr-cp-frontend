<template>
  <create-update-interview-dialog ref="dialog" create :questions="questions" @save="onSave"/>
</template>

<script>
import { EventBus } from '@/utils/eventBus';

import COMPANY_QUERY from '@/graphql/myCompanyQuery.gql';

import CreateUpdateInterviewDialog from './CreateUpdateDialogs/CreateUpdateInterview';

export default {
  components: {
    CreateUpdateInterviewDialog,
  },

  data() {
    return {
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
    };
  },

  methods: {
    reset() {
      this.questions = [
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
      ];
    },

    onSave(params) {
      this.$apollo
        .mutate({
          mutation: require('@/graphql/createInterviewMutation.gql'),

          variables: {
            data: params.data,
          },
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
          // eslint-disable-next-line no-console
          console.log({ id: data.createInterview.id });
          params.cb();
          this.reset();
          EventBus.$emit('snackbar', {
            text: 'Successfully created Interview!',
            color: 'success',
          });
        })
        .catch(() => {
          EventBus.$emit('snackbar', {
            text: 'could not create Interview!',
            color: 'error',
          });
        });
    },
  },
};
</script>
