<template>
	<div>
		<h1 class="week-title">All Series</h1>
		<div class="series-container">
			<div class="series" v-for="(series, index) in week" :key="index">
				<div class="series-inner" @click="$router.push('/series/'+series.id)">
                    <img class="series-cover" :src="series.cover.url" alt="" />
                    <div class="series-info">
                        <h1 class="series-title">{{ series.title }}</h1>
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
				.get("/manga/all")
				.then(response => {
					this.week = response.data;
				})
				.catch(err => console.log(err));
		}
	}
};
</script>

<style scoped>
.week-title {
	@apply text-xl text-center py-6 font-semibold dark:text-white;
}
.series-container {
	@apply px-4 flex flex-row flex-wrap justify-center items-stretch;
}
.series {
	@apply w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 3xl:w-1/5 p-2;
}
.series-inner:hover {
	@apply shadow-2xl scale-105 z-50
}
.series-inner {
    @apply h-full bg-white flex flex-col items-center transform transition-all duration-150 rounded-lg z-10 cursor-pointer;
	@apply dark:bg-dt-500
}
.series-info {
    @apply py-2 bottom-0 text-center bg-opacity-50 text-black w-full rounded-b-lg z-10 dark:text-white
}
.series-cover {
    @apply w-full h-72 object-cover rounded-lg z-0
}
.series-title {
    @apply font-semibold
}
</style>
