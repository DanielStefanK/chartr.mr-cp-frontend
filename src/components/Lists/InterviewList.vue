<template>
  <v-data-table
    :headers="headers"
    :items="myInterviews ? myInterviews : []"
    :loading="$apollo.loading"
    :pagination.sync="pagination"
    :total-items="myInterviewsConnection ? myInterviewsConnection.aggregate.count : 0"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ formatDate(props.item.activeUntil) }}</td>
      <td class="text-xs-right">{{ props.item.creator.name }}</td>
      <td class="text-xs-right">{{ formatDate(props.item.createdAt) }}</td>
      <td class="text-xs-right">{{ props.item.results.length }}</td>
      <td class="text-xs-right">
        <v-icon
          :color="isActive (props.item) ? 'success' : 'error'"
        >{{isActive (props.item) ? 'check_circle': 'cancel'}}</v-icon>
      </td>
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

    active: {
      type: String,
      default: 'all',
    },
    creator: {
      type: String,
      default: '',
    },
  },

  apollo: {
    $deep: true,
    myInterviews: {
      query: require('@/graphql/myInterviewsQuery.gql'),
      variables() {
        return this.vars;
      },
    },
    myInterviewsConnection: {
      query: require('@/graphql/myInterviewsConnectionQuery.gql'),
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
        { text: 'Active until', align: 'center', value: 'activeUntil' },
        { text: 'Creator', sortable: false, align: 'center', value: 'creator' },
        { text: 'Created At', align: 'center', value: 'createdAt' },
        { text: 'Results', sortable: false, align: 'center', value: 'results' },
        { text: 'Active', sortable: false, align: 'right', value: 'deleted' },
      ],
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 5, // -1 for All
        sortBy: 'name',
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
        ...(this.creator && this.creator !== ''
          ? { creator: { name_contains: this.creator } }
          : {}),
        ...(this.active && this.active === 'active'
          ? { deleted: false, activeUntil_gt: new Date() }
          : {}),
        ...(this.active && this.active === 'inactive'
          ? { OR: [{ deleted: true }, { activeUntil_lt: new Date() }] }
          : {}),
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
