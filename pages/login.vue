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
				url: "/login",
				data: {
					email: this.email,
					password: this.password
				}
			}).then(response => {
				this.setToken(response.data.access_token);
				this.setUser(response.data.user);
				this.setAuthenticated(true);
				this.$router.push("/");
			}).catch(error => {
                console.log(error);
                if(error.response){
                    let err = error.response.data;
                    this.error = '';
                    if(err.email) this.error += err.email[0] + '<br>';
                    if(err.password) this.error += err.password[0] + '<br>';
                    if(err.message) this.error += err.message + '<br>';
                }
            })
		},
		...mapMutations(["setUser", "setToken", "setAuthenticated"])
	}
};
</script>

<style scoped></style>
