<template>
  <q-page class="flex flex-center q-pa-md bg-grey-10 text-white">
    <q-btn color="purple" @click="reload()">
      <label> {{ $t('Update') }} </label>
    </q-btn>
    <q-list dark bordered separator style="max-width: 318px">
      <q-item clickable v-ripple>
        <q-item-section>API_URL</q-item-section>
        <q-item-section>{{api}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>MODE</q-item-label>
          <q-item-label>{{mode}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      api: process.env.API_URL,
      mode: process.env.MODE
    }
  },
  mounted () {
    this.showNotif()
  },
  methods: {
    reload () {
      location.reload(true)
    },
    showNotif () {
      this.$q.notify({
        message: this.$t('turn_off_adblocker'),
        color: 'purple'
      })
    }
  }
}
</script>
