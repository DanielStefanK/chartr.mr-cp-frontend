<template>
  <v-dialog v-model="dialog" fullscreen lazy>
    <div slot="activator" v-if="this.$slots.default">
      <slot></slot>
    </div>
    <div slot="activator" v-else>
      <v-tooltip bottom>
        <v-btn icon slot="activator">
          <v-icon>{{create ? 'add':'edit'}}</v-icon>
        </v-btn>
        <span>{{create ? 'Create Interview':'Update Interview'}}</span>
      </v-tooltip>
    </div>

    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Interview</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="onSaveDialog">Save</v-btn>
          <interview-save-dialog @save="onSave" @cancel="onCancel" :value="dialogSave"/>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 lg6>
              <questions ref="questions" :depth="0" v-model="internalquestions"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { EventBus } from '@/utils/eventBus';
import Questions from '@/components/Questions.vue';
import InterviewSaveDialog from './InterviewSaveDialog';

export default {
  props: {
    create: Boolean,
    questions: Array,
  },

  components: {
    Questions,
    InterviewSaveDialog,
  },

  data() {
    return {
      dialog: false,
      dialogSave: false,
      internalquestions: [],
    };
  },

  methods: {
    onSaveDialog() {
      try {
        this.$refs.questions.buildQuestions(this.internalquestions);
        this.dialogSave = true;
      } catch (ex) {
        EventBus.$emit('snackbar', {
          text: ex,
          color: 'error',
        });
      }
    },

    onSave(additional) {
      try {
        const questions = this.$refs.questions.buildQuestions(
          this.internalquestions,
        );

        this.$emit('save', {
          data: {
            ...additional,
            interview: {
              create: questions,
            },
          },
          cb: () => {
            this.dialogSave = false;
            this.dialog = false;
            this.reset();
          },
        });
      } catch (ex) {
        EventBus.$emit('snackbar', {
          text: ex,
          color: 'error',
        });
      }
    },
    onCancel() {
      this.dialogSave = false;
    },

    reset() {
      this.internalquestions = [];
    },
  },

  watch: {
    questions() {
      this.internalquestions = JSON.parse(JSON.stringify(this.questions));
    },
  },

  created() {
    this.internalquestions = JSON.parse(JSON.stringify(this.questions));
  },
};
</script>
