export default function ({ $axios, store, redirect  }) {
    if(!process.server){
		return $axios
			.post("/check", {
				headers: {
					Authorization: "Bearer " + store.state.token
				}
			})
			.then(response => store.commit("setAuthenticated", true))
			.catch(error => {
				console.log(error);
				if (error.response.data === "Unauthorized.") {
					store.dispatch("clearAuth");
					return redirect("/login");
				}
			});
    }
}