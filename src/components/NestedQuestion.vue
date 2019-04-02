<template>
  <draggable
    v-if="depth<2"
    tag="div"
    bubbleScroll
    class="layout row wrap dragArea"
    :list="questions"
    :group="{ name: 'questions', pull: true, put: true }"
  >
    <v-flex
      xs12
      :class="{sm6:depth<1&&questions.length >1} "
      v-for="el in questions"
      :key="el.name"
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
              <edit-question-dialog/>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <nested-question :depth="depth+1" :questions="el.subQuestions"/>
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
    questions: {
      required: true,
      type: Array,
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  components: {
    draggable,
    EditQuestionDialog,
  },
  name: 'nestedQuestion',
};
</script>

<style>
.dragArea {
  min-height: 50px;
  outline: 1px solid;
}

.minHeight {
  min-height: 50px;
}
</style>
