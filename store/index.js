
export const state = () => ({
	user: null,
	token: null,
	authenticated: false,
});

export const mutations = {
	setUser(state, user) {
		state.user = user;
	},
	setToken(state, token) {
		state.token = token;
	},
	setAuthenticated(state, authenticated) {
		state.authenticated = authenticated;
	}
};

export const getters = {
	isRank2: (state) => {
		return state.authenticated && state.user !== null && state.user.rank >= 2;
	},
	isRank3: (state) => {
		return state.authenticated && state.user !== null && state.user.rank == 3;
	}
}

export const actions = {
	clearAuth({ commit }) {
		commit("setToken", null);
		commit("setUser", null);
		commit("setAuthenticated", false);
	}
};
