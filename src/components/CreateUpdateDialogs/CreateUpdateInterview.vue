<template>
  <v-dialog v-model="dialog" width="500">
    <div slot="activator" v-if="this.$slots.default">
      <slot></slot>
    </div>
    <div slot="activator" v-else>
      <v-tooltip bottom>
        <v-btn icon slot="activator">
          <v-icon>{{create ? 'add':'edit'}}</v-icon>
        </v-btn>
        <span>{{create ? 'Create Interview':'Update Interview'}}</span>
      </v-tooltip>
    </div>

    <v-card>
      <v-card-title primary-title>
        <div>
          <div class="headline">Interview</div>
        </div>
      </v-card-title>
      <v-card-text>TODO</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    create: Boolean,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
