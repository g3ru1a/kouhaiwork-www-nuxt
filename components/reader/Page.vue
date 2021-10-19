<template>
	<transition appear :name="transitionEffect">
		<div class="reader-item absolute" v-show="currentPage === index">
			<img class="reader-image" :src="url" alt="" />
		</div>
	</transition>
</template>

<script>
export default {
	props: ["page", "currentPage", "index", "direction"],
	data() {
		return {
			url: ""
		};
	},
	mounted() {
		if (process.client) {
			let apiUrlWV = process.env.apiURL;
			let apiurl =
				apiUrlWV.substring(0, apiUrlWV.length - 3) + "storage/";
			this.url = apiurl + this.page.media;
		}
	},
	computed: {
		transitionEffect() {
			return this.direction === "left" ? "slide-out" : "slide-in";
		}
	}
};
</script>

<style scoped>
.reader-item {
	@apply h-screen top-0 right-0 bottom-0 left-0 flex items-center;
}

.reader-image {
	@apply mx-auto h-full object-contain;
}

.slide-in-enter-active,
.slide-in-leave-active,
.slide-out-enter-active,
.slide-out-leave-active {
	transition: all 0.3s ease-in-out;
}
.slide-in-enter {
	transform: translateX(100%);
}
.slide-in-leave-to {
	transform: translateX(-100%);
}
.slide-out-enter {
	transform: translateX(-100%);
}
.slide-out-leave-to {
	transform: translateX(100%);
}
</style>
