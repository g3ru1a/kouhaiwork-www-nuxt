// import store from 'vuex'

export default function({ $axios, store, redirect }) {
	$axios.onRequest(config => {
		console.log(
			"%cMaking request to %c" + config.url,
			"border-radius:3px 0 0 3px; padding: 2px 6px; background: #6a0dad; color: white",
			"border-radius: 0 3px 3px 0; padding: 2px 6px; background: green; color: yellow"
		);
        $axios.setHeader('Authorization', 'Bearer ' + store.state.token);
	});

	$axios.onError(error => {
		const code = parseInt(error.response && error.response.status);
		if (code === 400) {
			redirect("/400");
		}
	});
}
