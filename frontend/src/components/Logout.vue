<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn color="white" text-color="black" :label="$t('log_out')" @click="clearToken" />
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  methods: {
    clearToken () {
      this.$store.commit('showcase/updateToken', '')
      this.$router.push('index')
    }
  }
}
</script>
