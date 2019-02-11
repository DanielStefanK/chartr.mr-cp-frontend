<template>
  <v-container>
    <v-layout>
      <v-flex lg10 sm12>
        <v-card>
          <template v-if="$apollo.loading || !interview">
            <v-progress-linear indeterminate/>
          </template>
          <template v-else>
            <v-card-title>
              <v-layout justify-space-between>
                <div class="headline noStyleLink">
                  Interview
                  <a :href="link" target="_blank">
                    <v-icon>input</v-icon>
                  </a>
                  </div>
                //TODO: delete/edit button
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <v-card>
                    <v-card-title>
                      <h4>Name: &nbsp;</h4>
                      {{ interview.name }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content>Creator:</v-list-tile-content>
                        <v-list-tile-content
                          class="align-end text-xs-right"
                        >{{ interview.creator.name }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Created At:</v-list-tile-content>
                        <v-list-tile-content
                          class="align-end text-xs-right"
                        >{{ formatDate(interview.createdAt) }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Active Until:</v-list-tile-content>
                        <v-list-tile-content
                          class="align-end text-xs-right"
                        >{{ formatDate(interview.activeUntil) }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Deleted:</v-list-tile-content>
                        <v-list-tile-content class="align-end text-xs-right">
                          <v-icon
                            :color="interview.deleted ? 'success' : 'error'"
                          >{{interview.deleted ? 'check_circle': 'cancel'}}</v-icon>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Limit Results:</v-list-tile-content>
                        <v-list-tile-content class="align-end text-xs-right">{{ interview.limit }}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  // TODO: show results
                </v-flex>
              </v-layout>
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
    interview: {
      query: require('@/graphql/interviewQuery.gql'),
      variables() {
        return { id: this.id };
      },
    },
  },

  computed: {
    link() {
      return process.env.VUE_APP_INTERVIEW_URL + '#/interview/' + this.id;
    },
  },

  methods: {
    formatDate(date) {
      return moment(date).format('MM.DD.YYYY, h:mm:ss a');
    },
  },
};
</script>

<style scoped>
.noStyleLink a {
  text-decoration: none;
}
</style>
