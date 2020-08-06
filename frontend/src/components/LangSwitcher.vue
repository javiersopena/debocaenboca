<template>
  <!-- ...... -->
  <q-select
    v-model="lang"
    :options="langOptions"
    :label="getLabel"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />
  <!-- ...... -->
</template>

<script>
export default {
  data () {
    return {
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'spa', label: 'Spanish' }
      ]
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = lang
    }
  },
  computed: {
    getLabel () {
      return this.$i18n.t('LangSwitcher')
    }
  }
}
</script>
