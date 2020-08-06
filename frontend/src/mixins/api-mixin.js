export default {
  data () {
    return {
    }
  },
  methods: {
    getData: function (target, arg) {
      return new Promise((resolve, reject) => {
        fetch(target + arg)
          .then(function (response) {
            // CHECK RESPONSE
            if (response.ok) {
              return response.json()
            } else {
              throw response.ok
            }
          })
          .then(function (response) {
            // SUCCESS
            resolve(response)
          })
          .catch((error) => {
            // ERROR
            reject(new Error(error.message))
            console.warn('API call failed')
          })
      })
    },
    postData: function (target, arg, data) {
      return new Promise((resolve, reject) => {
        fetch(target + arg, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data })

        }).then(function (response) {
          // CHECK RESPONSE
          if (response.ok) {
            return response
          } else {
            throw Error
          }
        })
          .then(function (response) {
            // SUCCESS
            resolve(response)
          })
          .catch((error) => {
            // ERROR
            reject(new Error(error.message))
            console.warn('API call failed')
          })
      })
    }
  }
}
