<template>
	<div class="md:p-2 md:w-2/3">
		<h1 class="title z-50">{{ info.title }}</h1>
		<div class="tag-container-np">
			<p class="tag-lg status">{{ info.status }}</p>
			<p class="tag-lg chapters">{{ info.chapters.length }} Chapters</p>
		</div>
		<div class="w-full flex space-x-1">
			<button @click="toggleInfo" class="btn-tall btn-block btn-theme-inv md:hidden">
				Chapters
			</button>
			<nuxt-link 
                v-if="info.chapters && info.chapters.length > 0"
                :to="`/read/${info.chapters[0].id}`" 
                class="btn-tall btn-block btn-theme">
				Start Reading
			</nuxt-link>
		</div>
		<div>
            <h2 class="header">Synopsis</h2>
            <p class="mb-2">{{ info.synopsis }}</p>
            <template v-if="(info.authors && info.authors.length > 0) || (info.artists && info.artists.length > 0)">
                <div class="flex items-start justify-evenly">
                    <div
                        v-if="info.authors && info.authors.length > 0"
                        class="w-full text-left flex flex-col"
                    >
                        <h2 class="header">Authors</h2>
                        <div class="tag-container-np">
                            <p
                                v-for="author,index in info.authors"
                                :key="index"
                                class="tag-lg tag-theme"
                            >
                                {{ author }}
                            </p>
                        </div>
                    </div>
                    <div
                        v-if="info.artists && info.artists.length > 0"
                        class="w-full text-left flex flex-col"
                    >
                        <h2 class="header">Artists</h2>
                        <div class="tag-container-np">
                            <p
                                v-for="artist,index in info.artists"
                                :key="index"
                                class="tag-lg tag-theme"
                            >
                                {{ artist }}
                            </p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="info.groups_arr.length > 0">
                <h2 class="header">Brought to you by</h2>
                <div class="tag-container-np">
                    <p
                        v-for="(group, index) in info.groups_arr"
                        :key="index"
                        class="tag-lg tag-theme"
                    >
                        {{ group }}
                    </p>
                </div>
            </template>
            <template v-if="info.genres && info.genres.length > 0">
                <h2 class="header">Genres</h2>
                <div class="tag-container-np">
                    <p
                        v-for="genre,index in info.genres"
                        :key="index"
                        class="tag-lg tag-theme"
                    >
                        {{ genre }}
                    </p>
                </div>
            </template>

            <template v-if="info.themes && info.themes.length > 0">
                <h2 class="header">Themes</h2>
                <div class="tag-container-np">
                    <p
                        v-for="theme,index in info.themes"
                        :key="index"
                        class="tag-lg tag-theme"
                    >
                        {{ theme }}
                    </p>
                </div>
            </template>

            <template v-if="info.demographics && info.demographics.length > 0">
                <h2 class="header">Demographics</h2>
                <div class="tag-container-np">
                    <p
                        v-for="demographic,index in info.demographics"
                        :key="index"
                        class="tag-lg tag-theme"
                    >
                        {{ demographic }}
                    </p>
                </div>
            </template>
            <template v-if="info.alternative_titles && info.alternative_titles.length > 0">
                <h2 class="header">Alternative Names</h2>
                <div class="flex flex-col w-full text-left">
                    <h2
                        v-for="(name, index) in info.alternative_titles"
                        :key="index"
                    >
                        {{ name }}
                    </h2>
                </div>
            </template>
        </div>
	</div>
</template>

<script>
export default {
    props: ['info'],
    data() {
        return {
            show_info: true,
        }
    },
    methods: {
        toggleInfo(){
            document.getElementById("chapters").scrollIntoView({behavior: 'smooth'});
        }
    }
}
</script>

<style scoped>
p {
	@apply text-justify;
}
.title {
	@apply mb-2 text-5xl font-semibold;
}
.tag-lg.status {
	@apply border-l-2 border-green-400 rounded-l capitalize;
}
.tag-lg.chapters {
	@apply border-l-2 border-black rounded-l;
}
</style>