<template>
  <v-dialog :value="value" persistent lazy width="500">
    <v-card>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-text-field v-model="name" name="interview-name" label="Name" type="text"></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              v-model="limitModel"
              name="limit"
              label="Limit amout of results"
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-menu v-model="menu1" :close-on-content-click="false" full-width max-width="290">
              <v-text-field slot="activator" :value="formattedData" label="Active until" readonly></v-text-field>
              <v-date-picker
                v-model="activeUntil"
                @change="menu1 = false"
                :min="moment ().toISOString().substr(0, 10)"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12>Cost: {{cost}} Credits</v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn flat @click="onCancel">Cancel</v-btn>
        <v-btn color="primary" @click="onSubmit">Purchase</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    value: Boolean,
  },
  data() {
    return {
      menu1: false,
      name: '',
      limit: 100,
      activeUntil: moment(moment())
        .add(10, 'days')
        .toISOString()
        .substr(0, 10),
    };
  },

  computed: {
    formattedData() {
      return this.activeUntil
        ? moment(this.activeUntil).format('dddd, MMMM Do YYYY')
        : '';
    },
    cost() {
      return Math.max(
        10,
        Math.round(
          (this.limit * moment(this.activeUntil).diff(moment(), 'days')) / 10,
        ),
      );
    },

    limitModel: {
      get() {
        return this.limit;
      },
      set(val) {
        this.limit = Number.parseInt(val);
      },
    },
  },

  methods: {
    moment() {
      return moment();
    },

    onSubmit() {
      this.$emit('save', {
        name: this.name,
        activeUntil: moment(this.activeUntil).toISOString(),
        limit: this.limit,
      });
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>
