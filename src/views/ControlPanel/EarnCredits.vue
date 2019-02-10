<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex sm12 md8>
        <v-card>
          <v-card-title>
            <div class="headline">Earn Credits</div>
          </v-card-title>
          <v-card-text>
            <v-layout column>
              <v-flex>
                <v-select
                  :disabled="loading"
                  :items="options"
                  v-model="price"
                  label="Select"
                  hide-details
                  prepend-inner-icon="attach_money"
                  single-line
                ></v-select>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn :loading="loading" color="primary" @click="checkout">request credits</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag';

import COMPANY_QUERY from '@/graphql/myCompanyQuery.gql';

export default {
  data() {
    return {
      options: [10, 25, 50, 100, 500],
      price: 50,
      loading: false,
    };
  },
  methods: {
    checkout() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($amount: Int!) {
              addCredits(amount: $amount)
            }
          `,

          variables: {
            amount: this.price,
          },

          update: (store, { data: { addCredits } }) => {
            const data = store.readQuery({
              query: COMPANY_QUERY,
            });
            data.myCompany.credits = addCredits;
            store.writeQuery({ query: COMPANY_QUERY, data });
          },
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
