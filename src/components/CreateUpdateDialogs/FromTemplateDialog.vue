<template>
  <v-dialog :value="value" persistent lazy width="500">
    <v-card>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12>
            <v-select label="Template" :items="options" v-model="selectedTemplate"/>
          </v-flex>
          <v-flex v-if="template">
            <v-text-field
              v-for="param in template.params"
              v-model="params[param]"
              :label="param"
              :key="param"
            />
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat @click="cancel">Cancel</v-btn>
        <v-btn color="primary" @click="submit">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false },
  },

  data() {
    return {
      selectedTemplate: null,
      params: {},
      template: null,
    };
  },

  apollo: {
    templates: {
      query: require('@/graphql/templatesQuery.gql'),
    },
  },

  computed: {
    options() {
      return this.templates
        ? this.templates.map(item => ({
            text: item.name,
            value: item.id,
          }))
        : [];
    },
  },

  watch: {
    selectedTemplate() {
      if (this.selectedTemplate) {
        this.$apollo
          .query({
            query: require('@/graphql/templateQuery.gql'),
            variables: { id: this.selectedTemplate },
          })
          .then(({ data }) => {
            this.params = {};
            data.template.params.forEach(item => {
              this.params[item] = '';
            });
            this.template = data.template;
          });
      }
    },
  },
  methods: {
    cancel() {
      this.template = null;
      this.params = {};
      this.selectedTemplate = null;
      this.$emit('input', false);
    },

    submit() {
      if (this.template && this.template.interview && this.paramsValid()) {
        this.$emit(
          'newTemplate',
          this.template.interview.map(item => {
            return this.buildQuestion(item);
          }),
        );
        this.template = null;
        this.params = {};
        this.selectedTemplate = null;
        this.$emit('input', false);
      }
    },

    buildQuestion(root) {
      return {
        ...root,
        id:
          '_' +
          Math.random()
            .toString(36)
            .substr(2, 9),
        question: this.replaceParams(root.question),
        matchTags: root.matchTags.map(item => this.replaceParams(item)),
        answerTags: root.answerTags.map(item => ({
          tag: this.replaceParams(item.tag),
          value: item.value,
        })),
        subQuestions: root.subQuestions.map(item => this.buildQuestion(item)),
      };
    },

    paramsValid() {
      return Object.keys(this.params).every(item => {
        return this.params[item] && this.params[item] !== '';
      });
    },

    replaceParams(q) {
      let string = q;
      Object.keys(this.params).forEach(item => {
        string = string.replace('$' + item, this.params[item]);
      });
      return string;
    },
  },
};
</script>
