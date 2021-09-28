<template>
	<div v-if="latest" class="banner">
		<div class="banner-info">
			<p class="banner-nc">New Chapter</p>
			<a :href="`/series/${latest.id}`" class="banner-title">{{ latest.title }}</a>
			<div class="tag-container banner-tags">
				<span
					class="tag"
					v-for="(tag, index) in latest.tags"
					:key="index"
					>{{ tag }}</span
				>
			</div>
			<p class="banner-synopsis">{{ latest.synopsis }}</p>
			<div class="banner-action">
				<a class="banner-button" :href="`/read/${latest.latest_chapter.id}`">
					Check It Out
				</a>
				<p class="banner-ch">
					<span class="text-theme-dark dark:text-theme"
						>Chapter
						{{
							latest.latest_chapter.number
						}}</span
					>
					• {{ latest.status }}
				</p>
			</div>
		</div>
		<img class="banner-cover" :src="latest.cover" alt="" />
	</div>
</template>

<script>
export default {
	props: ['latest'],
};
</script>

<style scoped>
.banner {
	@apply 2xl:w-2/3 3xl:w-3/5 2xl:mx-auto mb-4 px-4 py-2 text-center flex items-center flex-col-reverse md:flex-row md:text-left;
	@apply dark:text-white
}
.banner-nc {
	@apply my-2 text-xl font-semibold text-center md:text-left;
}
.banner-title {
	@apply mb-2 lg:mb-4 text-3xl xl:text-4xl xl:text-5xl font-bold text-theme-dark dark:text-theme;
}
.banner-tags {
	@apply hidden md:block;
}
.banner-action {
	@apply mt-4 md:mt-6 w-full flex flex-row items-center justify-evenly md:justify-start;
}
.banner-button {
	@apply px-4 py-2 bg-black text-white rounded transition-all duration-150 dark:bg-dt-500;
}
.banner-button:hover {
	@apply bg-gray-800 shadow-lg
}
.banner-ch {
	@apply capitalize md:ml-10;
}
.banner-cover {
	@apply md:mx-4 md:mt-2 w-48 xl:w-64 2xl:w-72 h-auto object-cover border-4 border-white dark:border-dt-950 shadow-lg;
}
.banner-info {
	@apply  md:mx-4 w-full;
}
.banner-synopsis {
	@apply hidden lg:block text-left;
}
</style>
