<template>
  <q-page class="q-pa-md bg-grey-1 text-black">
    {{ $t('Nearby')}}
    <Scroll
      v-bind:rows="producers"
      v-bind:columns="columns"
    />
  </q-page>
</template>

<script>

import Scroll from 'components/Scroll.vue'
import API from '../mixins/api-mixin.js'
export default {
  data () {
    return {
      producers: [],
      columns: ['firstName', 'lastName', 'score', 'description', 'location', 'pictures']
    }
  },
  mixins: [API],
  components: {
    Scroll
  },
  created () {
    this.getData(process.env.API_URL, 'users').then(function (response) {
      this.producers = response
    }.bind(this))
  },
  methods: {
  }
}
</script>
