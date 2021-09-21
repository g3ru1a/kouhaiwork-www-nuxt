<template>
	<div class="w-full absolute h-full inline-block top-0 z-80">
		<div
			id="horizontal_controls"
			class="w-full h-full flex flex-col items-center justify-end"
		>
			<!-- Left Right Controls -->
			<div
				class="h-full w-full flex flex-row items-stretch justify-evenly"
			>
				<div @click="prev(false)" class="w-full"></div>
				<div @click="next(false)" class="w-full"></div>
			</div>
			<!-- Bottom Controls -->
			<div
				class="absolute mb-4 w-full flex flex-row items-end justify-center transition-all duration-300"
				:class="{ 'opacity-0': visible === false }"
				@mouseover="visible = true"
				@mouseleave="hideControlsTime()"
			>
				<button @click="prev(true)" class="btn btn-theme mx-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					@click="prev(false)"
					class="btn btn-theme"
					style="border-top-right-radius: 0; border-bottom-right-radius: 0"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<p
					class="px-4 py-2 text-center bg-theme text-white dark:bg-dt-theme"
				>
					<span class="hidden md:inline-block"
						>Ch. {{ chapter.number }} | Page</span
					>
					<span class="md:hidden">Ch. {{ chapter.number }} | </span>
					<span class="">{{ pageCounter }}</span>
				</p>
				<button
					@click="next(false)"
					class="btn btn-theme"
					style="border-top-left-radius: 0; border-bottom-left-radius: 0"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
				<button @click="next(true)" class="btn btn-theme mx-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 5l7 7-7 7M5 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["chapter", "settings", "pageCounter"],
	data() {
		return {
			visible: true,
			autoHideTimeout: null
		};
	},
	mounted() {
		if (this.$route.query.keep_scroll) {
			document.getElementById("horizontal_controls").scrollIntoView();
		}
	},
	beforeUnmount() {
		clearTimeout(this.autoHideTimeout);
	},
	beforeMount() {
		window.addEventListener("keyup", this.handleKeys);
		window.addEventListener("scroll", this.handleScroll);
	},
	beforeDestroy() {
		window.removeEventListener("keyup", this.handleKeys);
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
		next(skip = false) {
			if (this.settings.direction == "ltr") this.$emit("next-page", skip);
			else this.$emit("prev-page", skip);
		},
		prev(skip = false) {
			if (this.settings.direction == "ltr") this.$emit("prev-page", skip);
			else this.$emit("next-page", skip);
		},
		hideControlsTime(duration = 1000) {
			clearTimeout(this.autoHideTimeout);
			this.autoHideTimeout = setTimeout(() => {
				this.visible = false;
			}, duration);
		},
		showControls() {
			this.visible = true;
			this.hideControlsTime();
		},
		handleKeys(e) {
			console.log(e);
			//Right Arrow Key
			if (e.keyCode === 39 && e.ctrlKey === false) this.next(false);
			//Left Arrow Key
			if (e.keyCode === 37 && e.ctrlKey === false) this.prev(false);
			//Right Arrow Key + Ctrl
			if (e.keyCode === 39 && e.ctrlKey === true) this.next(true);
			//Left Arrow Key + Ctrl
			if (e.keyCode === 37 && e.ctrlKey === true) this.prev(true);
		},
		handleScroll(e) {
			let st = window.pageYOffset || document.documentElement.scrollTop;
			let scrollMaxY =
				window.scrollMaxY ||
				document.documentElement.scrollHeight -
					document.documentElement.clientHeight;
			if (st >= scrollMaxY) {
				this.visible = true;
				this.hideControlsTime(2000);
			}
		}
	}
};
</script>
