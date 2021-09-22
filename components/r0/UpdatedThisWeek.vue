<template>
	<div class="bg-white dark:bg-dt-300 dark:text-white">
		<h1 class="week-title">Latest Chapters</h1>
		<div class="series-container">
			<div class="series" v-for="(series, index) in week" :key="index">
				<div class="series-inner" @click="redirectToSeries(series)">
                    <img class="series-cover" :src="series.cover" alt="" />
                    <div class="series-info">
                        <h1 class="series-title">{{ series.title }}</h1>
                        <p class="series-chapter">
                            Chapter
                            {{ series.latest_chapter_number }}
                        </p>
                    </div>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['week'],
	methods: {
		redirectToSeries(series){
			window.location.replace('/series/'+series.id)
		}
	}
};
</script>

<style scoped>
.week-title {
	@apply text-xl text-center py-6 font-semibold;
}
.series-container {
	@apply px-4 flex flex-row flex-wrap justify-center items-stretch;
}
.series {
	@apply w-full md:w-1/2 lg:w-1/3 xl:w-1/4 3xl:w-1/5 p-2;
}
.series-inner:hover {
	@apply shadow-2xl z-50 scale-105
}
.series-inner {
    @apply h-full flex flex-col items-center transform transition-all duration-150 rounded-lg z-10 cursor-pointer shadow-lg;
	@apply dark:bg-dt-600 dark:text-white
}
.series-info {
    @apply py-2  bottom-0 text-center  bg-opacity-50 text-black w-full rounded-b-lg z-10 dark:text-white
}
.series-cover {
    @apply w-full h-72 object-cover rounded-lg z-0
}
.series-title {
    @apply text-lg font-semibold
}
</style>
