<template>
	<div class="">
		<div class="results-settings">
			<button class="result-button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
					/>
				</svg>
			</button>
			<button class="result-button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z"
					/>
				</svg>
			</button>
		</div>

		<div class="results" :class="[view_grid ? 'grid' : 'list']">
			<div class="result" v-for="result in results" :key="result.id">
				<div class="result-inner">
					<img class="result-image" :src="result.cover.url" alt="" />
					<div class="result-info">
                        <div class="result-info-inner">
                            <h1 class="title">{{ result.title }}</h1>
                            <p class="count">{{result.chapters_count}} Chapters</p>
                            <p class="summary">{{ result.synopsis }}</p>
                        </div>
                        <nuxt-link :to="`/series/${result.id}`" class="result-action">Read More</nuxt-link>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		results: Array
	},
	data() {
		return {
			view_grid: true
		};
	}
};
</script>

<style scoped>
.results {
	@apply flex z-10;
}
.results.grid {
	@apply flex-wrap items-start justify-center;
}

.result {
	@apply p-2 w-full md:w-1/2 ;
}

.result-inner {
	@apply flex items-center justify-evenly bg-white shadow-lg max-h-64 dark:bg-dt-300 rounded;
}
.result-image {
	@apply w-36 lg:w-48 h-64 object-cover rounded-l
}
.result-info {
    @apply w-full flex flex-col h-64 
}
.result-info-inner {
	@apply p-3 flex-1 flex flex-col items-start justify-start overflow-y-scroll z-10;
}
.result-info-inner > .title {
    @apply mb-1 font-semibold  z-10 lg:text-lg
}
.result-info-inner > .count {
    @apply mb-1 text-sm z-10 italic lg:text-base
}
.result-info-inner > .summary {
    @apply mb-1 text-xs z-10 text-justify lg:text-sm
}

.result-action {
    @apply bg-theme px-2 py-2 text-white z-20 w-full justify-self-end text-center rounded-br dark:bg-dt-theme
}

.results-settings {
	@apply mb-4 flex items-center justify-end;
}
.result-button {
	@apply mx-1 px-2 py-2 text-white bg-theme transform rotate-90 dark:bg-dt-theme;
}
.result-button:hover {
	@apply bg-theme-dark scale-95;
}
</style>
