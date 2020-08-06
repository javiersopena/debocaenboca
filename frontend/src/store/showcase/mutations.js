export function updateToken (state, token) {
  state.accessToken = token
}
export function updateUserInfo (state, info) {
  state.userInfo.email = info.email
  const hasProperty = Object.prototype.hasOwnProperty.call(info, 'given_name')
  if (hasProperty) {
    state.userInfo.given_name = info.given_name
    state.userInfo.family_name = info.family_name
  } else {
    state.userInfo.given_name = info.firstName
    state.userInfo.family_name = info.lastName
    state.userInfo.location = info.location
  }
}
export function updateLocation (state, location) {
  state.userInfo.location = location
}
export function updateNodeToken (state, token) {
  state.userInfo.node_token = token
}
