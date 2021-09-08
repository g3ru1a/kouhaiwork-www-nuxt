<template>
	<div class="week-section">
		<h1 class="week-title">New Chapters Released This Week</h1>
		<div class="series-container">
			<div class="series" v-for="(series, index) in week" :key="index">
				<div class="series-inner">
                    <img class="series-cover" :src="series.cover.url" alt="" />
                    <div class="series-info">
                        <h1 class="series-title">{{ series.title }}</h1>
                        <p class="series-chapter">
                            Chapter
                            {{ series.chapters[series.chapters.length - 1].number }}
                        </p>
                    </div>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			week: null
		};
	},
	mounted() {
		this.loadData();
	},
	methods: {
		async loadData() {
			await this.$axios
				.get("/manga/week")
				.then(response => {
					this.week = response.data;
				})
				.catch(err => console.log(err));
		}
	}
};
</script>

<style scoped>
.week-section {
	@apply bg-white pb-4;
}
.week-title {
	@apply text-xl text-center py-6 font-semibold;
}
.series-container {
	@apply px-4 flex flex-row flex-wrap justify-center;
}
.series {
	@apply w-full md:w-1/2 lg:w-1/3 xl:w-1/4 3xl:w-1/5 p-2;
}
.series-inner:hover {
	@apply shadow-2xl z-50 scale-105
}
.series-inner {
    @apply relative flex flex-col items-center transform transition-all duration-150 rounded-lg z-10 cursor-pointer
}
.series-info {
    @apply py-2 absolute bottom-0 text-center bg-black bg-opacity-50 text-white w-full rounded-b-lg z-10
}
.series-cover {
    @apply w-full h-72 object-cover rounded-lg z-0
}
.series-title {
    @apply text-lg font-semibold
}
</style>
