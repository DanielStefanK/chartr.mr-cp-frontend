<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-layout row wrap justify-center>
              <v-flex xs6>
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
              <v-flex xs6>
                <v-btn @click="add">add</v-btn>
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
            <v-container grid-list-md class="dragArea">
              <draggable
                :list="questions"
                bubbleScroll
                tag="div"
                class="layout row wrap"
                :group="{ name: 'questions', pull: true, put: true }"
              >
                <v-flex xs12 v-for="el in questions" :key="el.id">
                  <v-card color="blue-grey lighten-3">
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
                        </v-flex>
                        <v-spacer/>
                        <v-flex>
                          <edit-question-dialog/>
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                    <v-card-text>
                      <nested-question :questions="el.subQuestions"/>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </draggable>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Draggable from 'vuedraggable';
import NestedQuestion from '@/components/NestedQuestion';
import EditQuestionDialog from '@/components/EditQuestionDialog';

export default {
  components: {
    Draggable,
    NestedQuestion,
    EditQuestionDialog,
  },

  data() {
    return {
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
        answerTags: [],
        matchTags: [],
      };
    },
    add() {
      this.questions.push(this.clone({ question: 'New Question' }));
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
