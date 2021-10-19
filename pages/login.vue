<template>
	<div class="h-screen flex items-center justify-center">
		<form @submit.prevent="login" class="panel panel-shadow panel-compact panel-white">
			<h1 class="panel-title">Login</h1>
			<error-bubble v-show="error != ''" :text="error"></error-bubble>
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
			<div class="form-group">
				<input
                    @keydown.space.prevent
					v-model="password"
					class="form-input"
					type="password"
					name="password"
					placeholder="Password..."
				/>
			</div>
			<button @click.prevent="login" class="btn btn-block btn-theme">
				Submit
			</button>
            <nuxt-link class="link" to="/forgotpassword">Forgot your Password?</nuxt-link>
		</form>
	</div>
</template>

<script>
import ErrorBubble from "../components/ErrorBubble.vue";
import { mapMutations } from "vuex";

export default {
    middleware: ['not_auth'],
	components: { ErrorBubble },
	data() {
		return {
			email: "",
			password: "",
			error: ""
		};
	},
	methods: {
		login() {
			this.$axios({
				method: "POST",
				url: "/auth/login",
				data: {
					email: this.email,
					password: this.password
				}
			}).then(response => {
				this.setToken(response.data.data.access_token);
				this.setUser(response.data.data.user);
				this.setAuthenticated(true);
				window.location.href = "/";
			}).catch(error => {
                console.log(error.response);
                if(error.response){
                    let err = error.response.data.error;
                    this.error = '';
                    if(err.message) this.error += err.message + '<br>';
                    if(err.errors.email) this.error += err.errors.email[0] + '<br>';
                    if(err.errors.password) this.error += err.errors.password[0] + '<br>';
                }
            })
		},
		...mapMutations(["setUser", "setToken", "setAuthenticated"])
	},
    head: {
		title: 'Login | Kouhai Work', 
    }
};
</script>

<style scoped></style>
