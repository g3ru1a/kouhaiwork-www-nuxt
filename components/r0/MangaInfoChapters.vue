<template>
	<div id="chapters" class="mt-2 md:px-4">
		<h1 class="header">Chapters</h1>
		<div class="chapters">
			<div 
                class="chapter"
                v-for="chap in info.chapters"
                :key="chap.id">
                <div
                    class="chapter-inner"
                    @click="redirectTo('/read/'+chap.id)"
                >
                    <p class="italic text-sm text-gray-600 dark:text-gray-200">{{prettyDate(chap.updated_at)}}</p>
                    <h2 class="number">
                        <span v-if="chap.volume" class="volume"
                            >[Vol. {{ chap.volume }}]</span
                        >
                        Chapter {{ chap.number }}
                    </h2>
                    <p>{{ chap.name }}</p>
                    <div v-if="chap.groups && chap.groups.length > 0" class="italic">
                        <p v-for="grp,i in chap.groups" :key="i">{{ (i == 0? 'By: ' : '')+grp.name+((i !== chap.groups.length-1) ? ' & ' : '')}}</p>
                    </div>
                    <p v-if="chap.groups == null || chap.groups.length == 0" class="text-sm italic">No Groups</p>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["info"],
    methods: {
		prettyDate(uglyDate) {
			let date = new Date(uglyDate);
			let options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			};
			return date.toLocaleString("en-US", options);
		},
        redirectTo(url){
            window.location = url;
        }
    }
};
</script>

<style scoped>
.chapters {
	@apply flex flex-col md:flex-row md:flex-wrap;
}
.chapter {
    @apply w-full mb-4 md:mb-2 md:p-2 md:w-1/2 lg:w-1/3
}
.chapter-inner {
	@apply rounded w-full p-4 bg-white border border-theme text-theme shadow transform transition-all duration-150 cursor-pointer;
    @apply dark:bg-dt-300
}
.chapter-inner:hover {
	@apply scale-105 bg-theme text-white;
}
.chapter-inner > .number {
	@apply font-semibold text-xl;
}
.chapter-inner > .vol {
	@apply font-semibold italic;
}
</style>
