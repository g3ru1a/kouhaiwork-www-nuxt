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
			.post("/logout")
			.then(() => {
				this.clearAuth();
				this.$router.push("/");
			})
			.catch(error => {
				if (error.response) {
					if (error.response.data == "Unauthorized.") {
						location.reload();
						this.clearAuth();
					}
				}
			});
	},
	methods: {
		...mapActions(["clearAuth"])
	}
};
</script>
