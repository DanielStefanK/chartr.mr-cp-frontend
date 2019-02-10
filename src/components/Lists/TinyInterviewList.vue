<template>
  <v-data-table
    :headers="headers"
    hide-actions
    :items="interviews"
    :loading="loading"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>
        <router-link
          :to="{name: 'interviewDetails', params: {id: props.item.id}}"
        >{{ props.item.name }}</router-link>
      </td>

      <td class="text-xs-right">{{ props.item.results.length }}</td>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    interviews: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Results',
          align: 'right',
          sortable: false,
          value: 'results',
        },
      ],
    };
  },
};
</script>
