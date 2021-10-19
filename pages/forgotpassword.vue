<template>
	<div class="h-screen flex items-center justify-center">
		<div class="panel panel-shadow panel-compact panel-white">
			<h1 class="panel-title">Forgot Password</h1>
			<error-bubble v-show="error != ''" :text="error"></error-bubble>
			<success-bubble
				v-show="success"
				text="Reset password email sent. Make sure to check spam and junk folders too."
			></success-bubble>
			<div class="form-group">
				<input
					@keydown.space.prevent
					v-model="email"
					class="form-input"
					type="email"
					name="email"
					placeholder="Email..."
				/>
			</div>
			<button @click.prevent="recover" class="btn btn-block btn-theme">
				Submit
			</button>
			<nuxt-link class="link" to="/login">Back to login</nuxt-link>
		</div>
	</div>
</template>

<script>
import ErrorBubble from "../components/ErrorBubble.vue";
import SuccessBubble from "../components/SuccessBubble.vue";
export default {
	middleware: ["not_auth"],
	components: { ErrorBubble, SuccessBubble },
	data() {
		return {
			email: "",
			error: "",
			success: false
		};
	},
	methods: {
		recover() {
			this.$axios({
				method: "POST",
				url: "/auth/password/request",
				data: {
					email: this.email
				}
			})
				.then(() => {
					this.success = true;
					this.error = "";
				})
				.catch(error => {
					this.success = false;
					let err = error.response.data.error;
					if (err.email) this.error = err.email[0];
					if (err.message) this.error = err.message;
				});
		}
	},
    head: {
		title: 'Forgot Password | Kouhai Work', 
    }
};
</script>
