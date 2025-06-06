export const state = () => ({
	user: null,
	token: null,
	authenticated: false,
	reader_settings: {
		dark: false,
		direction: "ltr",
		vertical_padding: false
	},
	dark_theme: false,
	vert_reader_drawer_open: false,
	sidebar_open: false,
	use_cookies: false,
	acknowledged_cookies: false,
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
	},
	setReaderSettings(state, settings) {
		state.reader_settings = settings;
	},
	toggleDarkTheme(state) {
		state.dark_theme = !state.dark_theme;
	},
	setVertReaderDrawer(state, open) {
		state.vert_reader_drawer_open = open;
	},
	setSideBarOpen(state, open){
		state.sidebar_open = open;
	},
	setUseCookies(state, use){
		state.use_cookies = use;
	},
	setAcknowledgedCookies(state, ack){
		state.acknowledged_cookies = ack;
	}
};

export const getters = {
	isRank2: state => {
		return (
			state.authenticated && state.user !== null && state.user.rank >= 2
		);
	},
	isRank3: state => {
		return (
			state.authenticated && state.user !== null && state.user.rank == 3
		);
	}
};

export const actions = {
	clearAuth({ commit }) {
		commit("setToken", null);
		commit("setUser", null);
		commit("setAuthenticated", false);
	},
	setReaderSettingsA({ commit }, settings) {
		commit("setReaderSettings", settings);
	}
};
