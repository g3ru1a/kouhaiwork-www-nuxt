<template>
    <div>
        <p class="m-2 text-center">Verifying Token...</p>
        <p v-if="success != ''" class="m-2 text-center text-green-500">Account Verified. Redirecting...</p>
        <p v-if="success != ''" class="w-full text-center transform scale-50">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(241, 242, 243); display: block;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#1d0e0b" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
            </svg>
        </p>
        <p v-if="error != ''" class="m-2 text-center text-red-400">{{error}}</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            success: '',
            error: '',
        }
    },
    mounted() {
        this.$axios.post(`/verify/${this.$route.params.user_id}/${this.$route.params.token}`)
        .then(response => {
            this.success = response.data.message;
            let router = this.$router;
            setTimeout(function(){
                router.push('/login');
            }, 5000);
        })
        .catch(error => {
            this.error = error.response.data.message;
        });
    }
}
</script>