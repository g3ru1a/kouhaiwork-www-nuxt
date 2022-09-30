<template>
    <div class="sidenav nobar" 
        :class="{'closed': !open}">
        
        <div class="relative cursor-pointer">
            <img @click="redirectTo('/')" class="sidenav-logo" src="/logo.png" alt="">
            <p @click="$emit('toggle_nav')" class="absolute top-0 right-0 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </p>
        </div>
        <p class="sidenav-brand">Kouhai.Work</p>
        <client-only>
        <nav class="sidenav-links">
            <a class="sidenav-header" href="/">Home</a>
            <h2 class="sidenav-header">Series</h2>
            <a class="sidenav-link" href="/search" replace>Search Series</a>
            <h2 class="sidenav-header">Kouhai Work</h2>
            <a class="sidenav-link" href="/announcements">Announcements</a>
            <a class="sidenav-link" href="/about">About Us</a>
            <a class="sidenav-link" href="https://discord.gg/8mmzDjKhg5" target="blank">Discord</a>
            <template v-if="$store.getters.isRank2">
                <h2 class="sidenav-header">Groups</h2>
                <a class="sidenav-link" href="/r2/upload">Upload</a>
                <a class="sidenav-link" href="/r2/groups">My Groups</a>
                <a class="sidenav-link" href="/r2/chapters">My Chapters</a>
                <a class="sidenav-link" href="/r2/series">Series</a>
            </template>
            <template v-if="$store.getters.isRank3">
                <h2 class="sidenav-header">Admin</h2>
                <!-- <a class="sidenav-link" href="/r3/dashboard">Dashboard</a>
                <a class="sidenav-link" href="/r3/series">Series</a>
                <a class="sidenav-link" href="/r3/chapters">Chapters</a>
                <a class="sidenav-link" href="/r3/users">Users</a>
                <a class="sidenav-link" href="/r3/groups">Groups</a> -->
            </template>
            <template v-if="$store.state.authenticated">
                <h2 class="sidenav-header">Me - {{$store.state.user.name}}</h2>
                <!-- <a class="sidenav-link" href="/r1/me">Profile</a>
                <a class="sidenav-link" href="/r1/settings">Settings</a> -->
                <a class="sidenav-link" href="/logout">Logout</a>
            </template>
            <template v-if="!$store.state.authenticated">
                <h2 class="sidenav-header">Account</h2>
                <a class="sidenav-link" href="/login">Login</a>
                <a class="sidenav-link" href="/register">Register</a>
            </template>
        </nav>
        <div class="px-8 w-full flex-1 flex flex-col items-start justify-end text-center font-semibold">
            <p>Version {{version}}</p>
            <h2 class="text-lg">Kouhai.Work &copy; 2021</h2>
        </div>
        </client-only>
    </div>
</template>

<script>
export default {
    props: {
        open: Boolean,
    },
    data(){
        return {
            version: process.env.appVersion
        }
    },
    methods: {
        redirectTo(url){
            window.location = url;
        }
    }
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
    @apply w-full  flex flex-col text-lg 
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
a.a-exact-active  {
    @apply bg-theme scale-110 ml-2 dark:bg-dt-900
}

.sidenav {
    @apply flex flex-col pb-8 fixed w-60 md:w-80 h-screen bg-gray-700 text-white transition-all duration-150 transform z-70;
    @apply max-h-screen overflow-y-auto overflow-x-hidden;
    @apply dark:bg-dt-200
}

.sidenav.closed {
    @apply -translate-x-full;
}
</style>
