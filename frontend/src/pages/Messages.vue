<template>
  <q-page class="q-pa-md bg-grey-1 text-black">
    {{ $t('Messages')}}
    <Scroll
      v-bind:rows="messages"
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
      messages: [],
      columns: ['from', 'message'],
      userId: 'InlzRWC14oWyAI45XzCQ'
    }
  },
  mixins: [API],
  components: {
    Scroll
  },
  created () {
    this.getData(process.env.API_URL, 'messages/' + this.userId).then(function (response) {
      this.messages = response
    }.bind(this))
  }
}
</script>
