const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const state = {
  user: {},
  authenticated: false
};

const getters = {
  user: state => state.user,
  authenticated: state => state.authenticated
};

const mutations = {
  LOGIN(state, userPayload) {
    state.user = {
      id: userPayload.id,
      firstName: userPayload.firstName,
      lastName: userPayload.lastName,
      email: userPayload.email
    };
    state.authenticated = true;
  },
  LOGOUT(state) {
    state.user = {};
    state.authenticated = false;
    localStorage.setItem('userInfo',"");
  }
};

const actions = {
  login({ commit }, options) {
    commit(LOGIN, options);
  },
  logout({ commit }, options) {
    commit(LOGOUT, options);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
