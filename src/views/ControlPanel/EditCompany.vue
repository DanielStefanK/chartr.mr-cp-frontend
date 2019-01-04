<template>
  <v-container>
    <v-layout>
      <v-flex md8 sm12>
        <v-card>
          <v-card-title>
            <v-layout justify-space-between>
              <div class="headline">Company</div>
            </v-layout>
          </v-card-title>

          <v-card-text>
            <div v-if="$apollo.loading">
              <v-progress-linear indeterminate></v-progress-linear>
            </div>
            <div v-else>
              <v-text-field v-model="myCompany.name"/>
              <v-list two-line>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img src="@/assets/defaultProfile.jpg">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="myCompany.contact.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="myCompany.contact.email"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <!-- TODO: add change dialog -->
                    <v-btn icon ripple @click="changeContact (user)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <!-- TODO: make it work -->
            <v-btn color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      myCompany: null,
    };
  },

  apollo: {
    myCompany: {
      query: require('@/graphql/justCompanyQuery.gql'),
    },
  },

  methods: {
    changeContact() {},
  },
};
</script>
