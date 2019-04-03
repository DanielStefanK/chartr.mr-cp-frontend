<template>
  <v-btn color="error" :loading="isLoading" @click="onDelete">delete</v-btn>
</template>

<script>
import gql from 'graphql-tag';
import { EventBus } from '@/utils/eventBus';
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    onDelete() {
      this.isLoading = true;
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($id: ID!) {
              deleteInterview(id: $id) {
                id
                deleted
              }
            }
          `,

          variables: {
            id: this.id,
          },
        })
        .then(async () => {
          EventBus.$emit('snackbar', {
            text: 'Interview Deleted Successfully',
            color: 'success',
          });
          this.$router.push({ name: 'listinterviews' });
        })
        .catch(error => {
          EventBus.$emit('snackbar', {
            text: error.message,
            color: 'error',
          });
        })
        .then(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
