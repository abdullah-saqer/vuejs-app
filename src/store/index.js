import Vue from 'vue'
import Vuex from 'vuex'

import message from '@/store/modules/message'
import user from '@/store/modules/user'
Vue.use(Vuex)

export const store = new Vuex.Store({
	modules: {
		message,
		user
	}
})
