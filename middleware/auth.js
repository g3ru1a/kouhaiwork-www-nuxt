export default function ({ $axios, store, redirect  }) {
    return $axios.post('/check')
        .then((response) => store.commit('setAuthenticated',true))
        .catch(error => {
            if (error.response.data === "Unauthorized.") {
				store.dispatch("clearAuth");
				return redirect("/login");
			}
        })
}