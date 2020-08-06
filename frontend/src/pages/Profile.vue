<template>
  <q-page class="q-pa-md bg-grey-1 text-black">
    <q-list bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>{{getUserInfo.email}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>{{getUserInfo.node_token}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>{{getUserInfo.given_name}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>{{getUserInfo.family_name}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>{{getUserInfo.location.coordinates}}</q-item-section>
      </q-item>
      <q-btn color="primary" :label="$t('get_location')" @click="locate"/>
    </q-list>
  <!--
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  -->
  </q-page>
</template>

<script>
import API from '../mixins/api-mixin.js'
export default {
  name: 'Profile',
  data () {
    return {
      googleRes: {},
      nodeRes: {}
      /*,
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
      */
    }
  },
  mixins: [API],
  created () {
    this.getData(process.env.API_URL, 'g_auth/' + this.getToken).then(function (response) {
      this.googleRes = response
      this.setNodeToken(response.nodetoken)
      this.getData(process.env.API_URL, 'user/' + response.email + '/' + response.nodetoken).then(function (response) {
        if (response.data.id === 'notFound') {
          this.setUserInfo(this.googleRes)
          this.createUser()
        } else {
          this.setUserInfo(response.data.data)
        }
      }.bind(this))
    }.bind(this))
  },
  mounted () {
    // this.geolocate()
  },
  methods: {
    // receives a place object via the autocomplete component
    /*
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    */
    locate () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showLocation)
      } else {
        console.log('Error locating position')
      }
    },
    showLocation (position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      console.log('Latitude : ' + latitude + ' Longitude: ' + longitude)
      this.location =
        {
          type: 'Point',
          coordinates: [
            latitude,
            longitude
          ]
        }
      this.setLocation(this.location)
      this.createUser()
    },
    createUser () {
      this.postData(process.env.API_URL, 'user/' + this.getUserInfo.email + '/' + this.getUserInfo.node_token, this.getUserInfo).then(function (response) {
        console.log(response)
      })
        .catch((error) => {
          console.log(error)
        })
    },
    setUserInfo (info) {
      this.$store.commit('showcase/updateUserInfo', info)
    },
    setNodeToken (token) {
      this.$store.commit('showcase/updateNodeToken', token)
    },
    setLocation (location) {
      this.$store.commit('showcase/updateLocation', location)
    }
  },
  computed: {
    getToken () {
      return this.$store.state.showcase.accessToken
    },
    getUserInfo () {
      return this.$store.state.showcase.userInfo
    }
  }
}
</script>
