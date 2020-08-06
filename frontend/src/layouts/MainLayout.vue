<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-green text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space ></q-space>
        <q-btn icon="home" to="/" glossy label="DeBocaEnBoca" />
        <q-toolbar-title>
          <q-breadcrumbs>
            <q-breadcrumbs-el :label="$t($route.fullPath)"></q-breadcrumbs-el>
          </q-breadcrumbs>
        </q-toolbar-title>
        <q-space ></q-space>
        <div v-if="getToken === 'error' || getToken===''">
          <Login />
        </div>
        <div v-else>
          <Logout />
        </div>
      </q-toolbar>
    </q-header>
    <q-footer elevated class="bg-green text-white text-center">
      <q-toolbar>
        <q-toolbar-title>DeBocaEnBoca</q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item>
          <LangSwitcher/>
        </q-item>
        <q-item-label
          header
          class="text-grey-8"
        >
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          v-show="link.title!=='Profile' && link.title!=='Messages' || getToken !== 'error' && getToken!==''"
        />
      </q-list>
    </q-drawer>

    <q-page-container  class="bg-beige text-white">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Login from 'components/Login.vue'
import Logout from 'components/Logout.vue'
import EssentialLink from 'components/EssentialLink.vue'
import LangSwitcher from 'components/LangSwitcher.vue'
import { mdiGoogleNearby, mdiMessageSettings, mdiFaceProfile } from '@quasar/extras/mdi-v5'

export default {
  name: 'MainLayout',
  components: {
    EssentialLink,
    LangSwitcher,
    Login,
    Logout
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Nearby',
          caption: 'Nearby.desc',
          icon: mdiGoogleNearby,
          link: '/nearby'
        },
        {
          title: 'Messages',
          caption: 'Messages.desc',
          icon: mdiMessageSettings,
          link: '/messages'
        },
        {
          title: 'Profile',
          caption: 'Myprofile.desc',
          icon: mdiFaceProfile,
          link: '/profile'
        }
      ]
    }
  },
  computed: {
    getToken () {
      return this.$store.state.showcase.accessToken
    }
  }
}
</script>
