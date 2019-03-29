<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <template slot="activator">
        <v-btn color="primary">links</v-btn>
      </template>

      <v-card>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-flex xs12>
              <a class="body-2">{{link}}</a>
            </v-flex>
            <qrcode-vue :value="link" size="400"></qrcode-vue>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  components: {
    QrcodeVue,
  },

  props: {
    link: String,
  },

  data() {
    return {
      dialog: false,
    };
  },
};
</script>
