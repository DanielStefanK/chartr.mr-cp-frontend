<template>
  <draggable
    v-if="depth<3"
    tag="div"
    bubbleScroll
    class="layout row wrap dragArea"
    :list="clonedQuestions"
    :group="{ name: 'questions', pull: true, put: true }"
  >
    <v-flex
      xs12
      :class="{sm6:depth<1&&clonedQuestions.length >1} "
      v-for="el in clonedQuestions"
      :key="el.id"
    >
      <v-card :color=" depth%2==1 ? 'blue-grey lighten-3' : 'blue-grey darken-2'">
        <v-card-title>
          <v-layout justify-space-between>
            <v-flex shrink>
              <p class="title">
                {{el.question}}
                <v-tooltip bottom>
                  <template slot="activator">
                    <v-icon color="success" dark>info</v-icon>
                  </template>
                  <span>
                    <p>time: {{el.time ? el.time : '-'}}&nbsp;</p>
                    <p>distaction: {{el.distraction}}</p>
                    <v-flex xs6>
                      <v-chip v-for="c in el.answerTags" :key="c.tag">
                        <v-avatar class="teal">{{c.value}}</v-avatar>
                        {{c.tag}}
                      </v-chip>
                    </v-flex>
                  </span>
                </v-tooltip>
              </p>
              <v-chip v-for="c in el.matchTags" :key="c">{{c}}</v-chip>
            </v-flex>
            <v-flex>
              <edit-question-dialog :question="el" :subQuestion="depth>0" @save="save"/>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <nested-question :depth="depth+1" v-model="el.subQuestions"/>
        </v-card-text>
      </v-card>
    </v-flex>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import EditQuestionDialog from '@/components/EditQuestionDialog';

export default {
  props: {
    value: {
      required: true,
      type: Array,
    },
    depth: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      clonedQuestions: [],
    };
  },
  created() {
    this.clonedQuestions = JSON.parse(JSON.stringify(this.value));
  },
  watch: {
    clonedQuestions: {
      handler() {
        this.$emit('input', this.clonedQuestions);
      },
      deep: true
    },
  },
  components: {
    draggable,
    EditQuestionDialog,
  },
  methods: {
    save(q) {
      const index = this.clonedQuestions.findIndex(i => {
        return q.id === i.id;
      });
      this.clonedQuestions[index] = q;
      this.$emit('input', this.clonedQuestions);
    },
  },
  name: 'nestedQuestion',
};
</script>

<style>
.dragArea {
  min-height: 100px;
  outline: 1px solid;
}

.minHeight {
  min-height: 100px;
}
</style>
