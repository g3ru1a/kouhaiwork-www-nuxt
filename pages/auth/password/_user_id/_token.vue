<template>
    <div class="h-screen flex items-center justify-center">
		<div class="panel panel-shadow panel-compact panel-white">
			<h1 class="panel-title">Reset Password</h1>
			<error-bubble v-show="error != ''" :text="error"></error-bubble>
            <p v-show="success != ''" class="form-success">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: inline;" width="20px" height="20px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#fff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
                </svg>
                Password reset successfully. Redirecting...
            </p>
			<div class="form-group">
				<input
                    @keydown.space.prevent
					v-model="password"
					class="form-input"
					type="password"
					name="password"
					placeholder="New Password..."
				/>
			</div>
			<div class="form-group">
				<input
                    @keydown.space.prevent
					v-model="password_confirmation"
					class="form-input"
					type="password"
					name="password_confirmation"
					placeholder="Confirm Password..."
				/>
			</div>
			<button @click.prevent="resetPassword" class="btn btn-block btn-theme">
				Submit
			</button>
		</div>
	</div>
</template>

<script>
import ErrorBubble from "~/components/ErrorBubble.vue";
import { mapMutations } from "vuex";

export default {
    middleware: ['not_auth'],
	components: { ErrorBubble },
	data() {
		return {
			password: "",
			password_confirmation: "",
			error: "",
            success: "",
		};
	},
	methods: {
		resetPassword() {
			this.$axios({
				method: "POST",
				url: "/password/reset",
				data: {
                    user_id: this.$route.params.user_id,
                    token: this.$route.params.token,
					password: this.password,
					password_confirmation: this.password_confirmation,
				}
			}).then(response => {
				this.success = 'Password reset successfully. Redirecting...';
                this.error = '';
                let router = this.$router;
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
			}).catch(error => {
                console.log(error);
                if(error.response){
                    let err = error.response.data;
                    this.error = '';
                    if(err.password) this.error += err.password[0] + '<br>';
                    if(err.message) this.error += err.message + '<br>';
                }
            })
		},
		...mapMutations(["setUser", "setToken", "setAuthenticated"])
	}
};
</script>