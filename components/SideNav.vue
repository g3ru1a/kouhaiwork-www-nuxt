<template>
    <div class="sidenav nobar" 
        :class="{'closed': !open}">
        
        <nuxt-link to="/" class="relative">
            <img class="sidenav-logo" src="/logo.png" alt="">
            <p @click="$emit('toggle_nav')" class="absolute top-0 right-0 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </p>
        </nuxt-link>
        <p class="sidenav-brand">Kouhai.Work</p>
        <client-only>
        <nav class="sidenav-links">
            <nuxt-link class="sidenav-header" to="/">Home</nuxt-link>
            <h2 class="sidenav-header">Series</h2>
            <nuxt-link class="sidenav-link" to="/search">Search Series</nuxt-link>
            <h2 class="sidenav-header">Kouhai Work</h2>
            <nuxt-link class="sidenav-link" to="/announcements">Announcements</nuxt-link>
            <template v-if="$store.getters.isRank2">
                <h2 class="sidenav-header">Groups</h2>
                <nuxt-link class="sidenav-link" to="/r2/upload">Upload</nuxt-link>
                <nuxt-link class="sidenav-link" to="/r2/groups">My Groups</nuxt-link>
                <nuxt-link class="sidenav-link" to="/r2/chapters">My Chapters</nuxt-link>
            </template>
            <template v-if="$store.getters.isRank3">
                <h2 class="sidenav-header">Admin</h2>
                <nuxt-link class="sidenav-link" to="/r3/dashboard">Dashboard</nuxt-link>
                <nuxt-link class="sidenav-link" to="/r3/series">Series</nuxt-link>
                <nuxt-link class="sidenav-link" to="/r3/chapters">Chapters</nuxt-link>
                <nuxt-link class="sidenav-link" to="/r3/users">Users</nuxt-link>
                <nuxt-link class="sidenav-link" to="/r3/groups">Groups</nuxt-link>
            </template>
            <template v-if="$store.state.authenticated">
                <h2 class="sidenav-header">Me - {{$store.state.user.name}}</h2>
                <nuxt-link class="sidenav-link" to="/r1/me">Profile</nuxt-link>
                <nuxt-link class="sidenav-link" to="/r1/settings">Settings</nuxt-link>
                <nuxt-link class="sidenav-link" to="/logout">Logout</nuxt-link>
            </template>
            <template v-if="!$store.state.authenticated">
                <h2 class="sidenav-header">Account</h2>
                <nuxt-link class="sidenav-link" to="/login">Login</nuxt-link>
                <nuxt-link class="sidenav-link" to="/register">Register</nuxt-link>
            </template>
        </nav>
        </client-only>
    </div>
</template>

<script>
export default {
    props: {
        open: Boolean,
    },
}
</script>

<style scoped>
.sidenav-logo {
    @apply mt-4 w-36 mx-auto
}
.sidenav-brand {
    @apply mb-4 text-xl text-center font-semibold uppercase
}
.sidenav-links {
    @apply w-full flex flex-col text-lg 
}
.sidenav-link {
    @apply px-8 py-1.5 transition-all duration-150 transform
}
.sidenav-header {
    @apply px-6 py-2.5 font-bold transition-all duration-150 transform
}
.sidenav-link:hover,
a.sidenav-header:hover,
.sidenav-link.active,
a.sidenav-header.active,
a.nuxt-link-exact-active  {
    @apply bg-theme scale-110 ml-2 dark:bg-dt-900
}

.sidenav {
    @apply pb-8 fixed w-60 md:w-80 h-screen bg-gray-700 text-white transition-all duration-150 transform z-70;
    @apply max-h-screen overflow-y-auto overflow-x-hidden;
    @apply dark:bg-dt-200
}

.sidenav.closed {
    @apply -translate-x-full;
}
</style>