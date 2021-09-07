<template>
    <div class="sidenav" :class="[open ? '' : 'closed']">
        <img class="sidenav-logo" src="/logo.png" alt="">
        <p class="sidenav-brand">Kouhai.Work</p>
        <nav class="sidenav-links">
            <nuxt-link class="sidenav-header active" to="/">Home</nuxt-link>
            <h2 class="sidenav-header">Series</h2>
            <nuxt-link class="sidenav-link" to="/">Search Series</nuxt-link>
            <h2 class="sidenav-header">Kouhai Work</h2>
            <nuxt-link class="sidenav-link" to="/">Announcements</nuxt-link>
            <h2 class="sidenav-header">Groups</h2>
            <nuxt-link class="sidenav-link" to="/">Upload</nuxt-link>
            <nuxt-link class="sidenav-link" to="/">My Groups</nuxt-link>
            <nuxt-link class="sidenav-link" to="/">My Chapters</nuxt-link>
            <h2 class="sidenav-header">Admin</h2>
            <nuxt-link class="sidenav-link" to="/">Dashboard</nuxt-link>
            <nuxt-link class="sidenav-link" to="/">Series</nuxt-link>
            <nuxt-link class="sidenav-link" to="/">Chapters</nuxt-link>
            <nuxt-link class="sidenav-link" to="/">Users</nuxt-link>
            <nuxt-link class="sidenav-link" to="/">Groups</nuxt-link>
            <h2 class="sidenav-header">Me - {User}</h2>
            <nuxt-link class="sidenav-link" to="/">Logout</nuxt-link>
            <h2 class="sidenav-header">Account</h2>
            <nuxt-link class="sidenav-link" to="/">Login</nuxt-link>
            <nuxt-link class="sidenav-link" to="/">Register</nuxt-link>
        </nav>
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
a.sidenav-header.active  {
    @apply bg-theme scale-110 ml-2
}

.sidenav {
    @apply pb-8 absolute lg:static w-80 h-screen bg-gray-700 text-white transition-all duration-150 transform z-50;
    @apply max-h-screen overflow-y-auto overflow-x-hidden
}

.sidenav.closed {
    @apply -translate-x-full lg:-translate-x-0;
}
</style>