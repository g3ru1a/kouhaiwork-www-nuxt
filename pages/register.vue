<template>
	<div class="h-screen flex items-center justify-center">
		<div class="panel panel-shadow panel-compact panel-white">
			<h1 class="panel-title">Register</h1>
			<error-bubble v-show="error != ''" :text="error"></error-bubble>
            <success-bubble v-show="success != ''" :text="success"></success-bubble>
			<div class="form-group">
				<input
                    v-model="email"
					@keydown.space.prevent
					class="form-input"
					type="email"
					name="email"
					placeholder="Email..."
				/>
			</div>
			<div class="form-group">
				<input
                    v-model="username"
					@keydown.space.prevent
					class="form-input"
					type="text"
					name="username"
					placeholder="Username..."
				/>
			</div>
			<div class="form-group">
				<input
                    v-model="password"
					@keydown.space.prevent
					class="form-input"
					type="password"
					name="password"
					placeholder="Password..."
				/>
			</div>
			<div class="form-group">
				<input
                    v-model="password_confirmation"
					@keydown.space.prevent
					class="form-input"
					type="password"
					name="password"
					placeholder="Password Confirmation..."
				/>
			</div>
			<button @click.prevent="register" class="btn btn-block btn-theme">Submit</button>
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
			username: "",
			password: "",
			password_confirmation: "",
			error: "",
            success: ""
		};
	},
	methods: {
		register() {
			this.$axios({
				method: "POST",
				url: "/auth/register",
				data: {
					email: this.email,
					name: this.username,
					password: this.password,
					password_confirmation: this.password_confirmation
				}
			})
				.then(response => {
                    this.error = "";
					this.email = "";
					this.username = "";
					this.password = "";
					this.password_confirmation = "";
					this.success =
						"Successfully registered, we sent a verification email to: " +
						response.data.user.email +
						". Click the link in the email to confirm your account.";
				})
				.catch(error => {
					let err = error.response.data.error;
                    this.success = "";
					this.error = "";
					if (err.message) this.error += err.message + "<br>";
					if (err.errors.name) this.error += err.errors.name[0] + "<br>";
					if (err.errors.email) this.error += err.errors.email[0] + "<br>";
					if (err.errors.password) this.error += err.errors.password[0] + "<br>";
				});
		}
	},
    head: {
		title: 'Register | Kouhai Work', 
    }
};
</script>

<style scoped></style>
