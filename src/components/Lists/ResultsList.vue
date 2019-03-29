<template>
  <v-data-table
    :headers="headers"
    :items="myResults ? myResults : []"
    :loading="$apollo.loading"
    :pagination.sync="pagination"
    :total-items="myResultsConnection ? myResultsConnection.aggregate.count : 0"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>
        <router-link
          :to="{name: 'resultDetails', params: {id: props.item.id}}"
        >{{ props.item.name }}</router-link>
      </td>
      <td class="text-xs-right">{{ props.item.email }}</td>
      <td class="text-xs-right">{{ formatDate(props.item.createdAt) }}</td>
      <td class="text-xs-right">{{ props.item.score }}</td>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },

    email: {
      type: String,
      default: '',
    },

    interviewId: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },
  },

  apollo: {
    $deep: true,
    myResults: {
      query: require('@/graphql/myResultsQuery.gql'),
      variables() {
        return this.vars;
      },
    },
    myResultsConnection: {
      query: require('@/graphql/myResultsConnectionQuery.gql'),
      variables() {
        return { where: this.vars.where };
      },
      deep: true,
    },
  },

  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { text: 'E-Mail', align: 'center', value: 'email' },
        { text: 'Created At', align: 'center', value: 'createdAt' },
        { text: 'Score', align: 'right', value: 'score' },
      ],
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 10, // -1 for All
        sortBy: 'score',
      },
    };
  },
  computed: {
    vars: {
      get() {
        let object = {};

        object = Object.assign({}, object, {
          where: {
            ...this.filter,
            interview: {
              id: this.interviewId,
            },
          },
          ...(this.pagination.sortBy
            ? {
                orderBy:
                  this.pagination.sortBy +
                  (this.pagination.descending ? '_DESC' : '_ASC'),
              }
            : {}),
          ...(this.pagination.rowsPerPage !== -1
            ? {
                first: this.pagination.rowsPerPage,
                skip: this.pagination.rowsPerPage * (this.pagination.page - 1),
              }
            : {}),
        });
        return object;
      },
    },

    filter() {
      return {
        ...(this.name && this.name !== '' ? { name_contains: this.name } : {}),
        ...(this.email && this.email !== ''
          ? { email: { name_contains: this.email } }
          : {}),
        // TODO: add score greater than filter
      };
    },
  },

  methods: {
    formatDate(date) {
      return moment(date).format('MM.DD.YYYY, h:mm:ss');
    },

    isActive(item) {
      return (
        !item.deleted &&
        item.results.length <= item.limit &&
        Date.now() < new Date(item.activeUntil)
      );
    },
  },
};
</script>
