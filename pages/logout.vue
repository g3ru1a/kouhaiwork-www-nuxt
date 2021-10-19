<template>
	<div>
		Logging out...
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    middleware: ['auth'],
	mounted() {
		this.$axios
			.post("/auth/logout")
			.then(() => {
				this.clearAuth();
				window.location.href = "/";
			})
			.catch(error => {
				if (error.response) {
					window.location.href = "/";
					this.clearAuth();
				}
			});
	},
	methods: {
		...mapActions(["clearAuth"])
	}
};
</script>
