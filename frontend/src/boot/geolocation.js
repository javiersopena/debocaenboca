// import something here
import VueGeolocation from 'vue-browser-geolocation'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ Vue }) => {
  Vue.use(VueGeolocation)
}
