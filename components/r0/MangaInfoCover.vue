<template>
	<div class="md:w-1/3 md:pr-4 relative z-10">
		<img class="cover z-10" :src="url" alt="" />
		<div class="cover-image-overlay z-10"></div>
	</div>
</template>

<script>
export default {
    props: ['url']
}
</script>

<style scoped>
.cover {
    @apply h-80s w-auto object-cover;
    @apply md:h-auto md:w-80 md:mx-auto md:border-4 md:border-white md:shadow-xl dark:border-dt-800;
}
.cover-image-overlay {
	/* background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0) 0%,
		rgba(255, 255, 255, 0) 60%,
		rgba(255, 255, 255, 0.2) 70%,
		rgba(255, 255, 255, 1) 98%
	); */
	@apply bg-gradient-to-t from-white via-nothing dark:from-dt-100 dark:via-nothing;
	@apply z-10 absolute left-0 bottom-0  w-full h-full;
	@apply md:hidden;
}

.cover-image-overlay-dark {
}
</style>