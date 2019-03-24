<template>
  <v-container>
    <v-layout>
      <v-flex lg10 sm12>
        <v-card>
          <template v-if="$apollo.loading || !result">
            <v-progress-linear indeterminate/>
          </template>
          <template v-else>
            <v-card-title>
              <v-layout justify-space-between>
                <div class="headline noStyleLink">Result</div>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12 md6>
                    <v-card>
                      <v-card-title>
                        <h4>Name: &nbsp;</h4>
                        {{ result.name }}
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-list-tile>
                          <v-list-tile-content>E-Mail:</v-list-tile-content>
                          <v-list-tile-content class="align-end text-xs-right">{{ result.email }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Created At:</v-list-tile-content>
                          <v-list-tile-content
                            class="align-end text-xs-right"
                          >{{ formatDate(result.createdAt) }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Interview:</v-list-tile-content>
                          <v-list-tile-content class="align-end text-xs-right">
                            <router-link
                              :to="{name: 'interviewDetails', params: {id: result.interview.id}}"
                            >{{ result.interview.name }}</router-link>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>Score:</v-list-tile-content>
                          <v-list-tile-content class="align-end text-xs-right">{{ result.score }}</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>
                  <v-flex xs12>//TODO: display interview</v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  apollo: {
    result: {
      query: require('@/graphql/resultQuery.gql'),
      variables() {
        return { id: this.id };
      },
    },
  },

  methods: {
    formatDate(date) {
      return moment(date).format('MM.DD.YYYY, h:mm:ss a');
    },
  },
};
</script>