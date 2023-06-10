export const state = () => ({
  auth: 'anonynous',
  user: null,
  token: null,
  loading: false
})
export const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  },
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}
