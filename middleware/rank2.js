export default function({ $axios, store, redirect }) {
	if (!process.server) {
        if(store.state.user.rank < 2) return redirect("/");
	}
}
