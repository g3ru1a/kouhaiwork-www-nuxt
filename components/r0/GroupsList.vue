<template>
	<div>
		<h1 class="week-title">Check out series from these Groups</h1>
		<div class="groups-container">
			<div class="groups" v-for="(group, index) in groups" :key="index">
				<div class="groups-inner" @click="redirectToGroup(group)">
                    <img class="groups-banner" :src="group.banner ? $mediaPage(group.banner) : '/pattern.jpg'" alt="" />
                    <div class="groups-info">
                        <h1 class="groups-title">{{ group.name }}</h1>
                    </div>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['groups'],
	methods: {
		redirectToGroup(group){
			window.location = '/group/'+group.id;
		}
	}
};
</script>

<style scoped>
.week-title {
	@apply text-xl text-center py-6 font-semibold dark:text-white;
}
.groups-container {
	@apply px-4 flex flex-row flex-wrap justify-center items-stretch;
}
.groups {
	@apply relative w-96 h-32 m-2;
}
.groups-inner:hover {
	@apply shadow-2xl scale-105 z-50
}
.groups-inner {
    @apply h-full bg-white flex flex-col items-center transform transition-all duration-150 rounded-lg z-10 cursor-pointer;
	@apply dark:bg-dt-500
}
.groups-info {
    @apply absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-25 text-white w-full rounded-lg z-10 dark:text-white flex items-center justify-center text-center
}
.groups-banner {
    @apply w-full h-32 object-cover rounded-lg z-0
}
.groups-title {
    @apply font-black text-2xl uppercase
}
</style>
