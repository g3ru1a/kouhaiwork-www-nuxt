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
	$axios.onResponse(response => {
		console.log(
			"%cResponse has%c" +
				roughSizeOfObject(response.data) +
				"%cbytes.",
			"border-radius:3px 0 0 3px; padding: 2px 6px; background: #6a0dad; color: white",
			"padding: 2px 6px; background: green; color: yellow",
			"border-radius: 0 3px 3px 0; padding: 2px 6px; background: #6a0dad; color: white"
		);
	})

	$axios.onError(error => {
		const code = parseInt(error.response && error.response.status);
		if (code === 400) {
			redirect("/400");
		}
		if(code === 401){
			redirect('/login');
		}
	});
}

function roughSizeOfObject(object) {
	var objectList = [];
	var stack = [object];
	var bytes = 0;

	while (stack.length) {
		var value = stack.pop();

		if (typeof value === "boolean") {
			bytes += 4;
		} else if (typeof value === "string") {
			bytes += value.length * 2;
		} else if (typeof value === "number") {
			bytes += 8;
		} else if (
			typeof value === "object" &&
			objectList.indexOf(value) === -1
		) {
			objectList.push(value);

			for (var i in value) {
				stack.push(value[i]);
			}
		}
	}
	return bytes;
}
