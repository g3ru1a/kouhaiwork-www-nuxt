<template>
    <div>
        <div class="resp-container">
            <h1 class="page-title">New Series</h1>
            <div v-if="!uploading" class="panel panel-white">
                <p class="mb-2">Basic Info</p>
                <div class="form-group">
                    <error-bubble v-if="error.title" :text="error.title[0]"></error-bubble>
                    <input v-model="info.title" type="text" class="form-input" placeholder="Series Name...">
                </div>
                <div class="form-group">
                    <error-bubble v-if="error.synopsis" :text="error.synopsis[0]"></error-bubble>
                    <textarea v-model="info.synopsis" type="text" class="form-input" placeholder="Series Synopsis..."></textarea>
                </div>
                <div class="form-group">
                    <error-bubble v-if="error.status" :text="error.status[0]"></error-bubble>
                    <sselect 
                        title="Status"
						:options="statuses"
						v-on:sel_change="info.status = $event;"
						:multiple="false"></sselect>
                </div>
                <div class="form-group">
                    <p>Series Type</p>
                    <div class="btn-group">
                        <button 
                            @click="info.origin = 'jp'"
                            class="btn btn-block" 
                            :class="{'btn-theme': info.origin == 'jp', 'btn-theme-inv': info.origin != 'jp'}">Manga</button>
                        <button 
                            @click="info.origin = 'ch'"
                            class="btn btn-block" 
                            :class="{'btn-theme': info.origin == 'ch', 'btn-theme-inv': info.origin != 'ch'}">Manhua</button>
                        <button 
                            @click="info.origin = 'kr'"
                            class="btn btn-block" 
                            :class="{'btn-theme': info.origin == 'kr', 'btn-theme-inv': info.origin != 'kr'}">Manhwa</button>
                    </div>
                </div>
                <div class="form-group">
                    <p class="mb-2">Cover</p>
                    <error-bubble v-if="error.cover" :text="error.cover[0]" class="rounded-b mb-2"></error-bubble>
                    <img @click="$refs.cover_inp.click()" class="mb-2 mx-auto h-72 w-48 object-cover" :src="coverPreview ? coverPreview : '/img-place.jpg'" alt="">
                    <button @click="$refs.cover_inp.click()" class="btn btn-block btn-theme flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>Upload</button>
                    <input @change="onCoverChange" ref="cover_inp" type="file" class="hidden">
                </div>
                <div class="form-group">
                    <h1>Additional Titles</h1>
                    <div class="form-group-inline">
                        <input v-model="addTitleInput" type="text" class="form-input" placeholder="Title...">
                        <button @click="addTitle" class="btn btn-green">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                    <div class="px-2 py-1 flex items-center justify-between border-b border-b-gray" v-for="title,i in info.alternative_titles" :key="i">
                        <p>{{title}}</p>
                        <button @click="removeTitle(title)" class="btn btn-red">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <MangaTagInput
                    title="Genres"
                    newUrl="/groups/manga/genres"
					:options="genres"
					v-on:sel_change="info.genres = $event;"
                    v-on:up_complete="loadSelectOptions()"
					:multiple="true">
                </MangaTagInput>
                <MangaTagInput 
                    title="Demographics"
                    newUrl="/groups/manga/demographics"
					:options="demographics"
					v-on:sel_change="info.demographics = $event;"
                    v-on:up_complete="loadSelectOptions()"
					:multiple="true">
                </MangaTagInput>
                <MangaTagInput 
                    title="Themes"
					:options="themes"
                    newUrl="/groups/manga/themes"
					v-on:sel_change="info.themes = $event;"
                    v-on:up_complete="loadSelectOptions()"
					:multiple="true">
                </MangaTagInput>
                <MangaTagInput 
                    title="Authors"
					:options="authors"
                    newUrl="/groups/manga/authors"
					v-on:sel_change="info.authors = $event;"
                    v-on:up_complete="loadSelectOptions()"
					:multiple="true">
                </MangaTagInput>
                <MangaTagInput 
                    title="Artists"
					:options="artists"
                    newUrl="/groups/manga/artists"
					v-on:sel_change="info.artists = $event;"
                    v-on:up_complete="loadSelectOptions()"
					:multiple="true">
                </MangaTagInput>
                <div class="form-group">
                    <button @click="createSeries" class="btn btn-block btn-theme">Create</button>
                </div>
                <div class="form-group text-center italic">
                    <p>Make sure to double check all the information</p>
                </div>
            </div>
            <div v-if="uploading" class="flex flex-col text-center items-center justify-center text-xl">
                <div class="w-full relative px-1">
                    <div class="overflow-hidden h-6 mb-4 text-xs text-center flex rounded bg-theme-light z-20">
                        <div :style="`width:${uploadPerc}%`" class="shadow-none flex text-center whitespace-nowrap text-white justify-center bg-theme-dark transition-all duration-150">
                    </div>
                    <div class="absolute text-white h-6 pin flex items-center justify-center z-30" style="color:white; mix-blend-mode: difference;">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="dark:bg-dt-100 dark:text-white" style="display: block;" width="15px" height="15px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" class="stroke-current" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                            </circle>
                            </svg>
                            <p class="mx-1 py-1 dark:text-white"> Creating Series {{uploadPerc}}%</p>
                        </div>
                    </div>
                </div>
                <p v-if="success" class="text-base">Creation Complete! Redirecting...</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: ['auth'],
    data() {
        return {
            uploading: false,
            success: false,
            info: {
                title: '',
                synopsis: '',
                status: null,
                origin: 'jp',
                cover: null,
                alternative_titles: [],
                genres: [],
                demographics: [],
                themes: [],
                authors: [],
                artists: [],
            },
            statuses: [
                {id: 0, name: 'Ongoing'},
                {id: 1, name: 'Finished'},
				{ id: 2, name: "Axed/Dropped" }
            ],
            genres: [],
            demographics: [],
            themes: [],
            authors: [],
            artists: [],
            addTitleInput: '',
            coverPreview: null,
            uploadPerc: 50,
            error: '',
        }
    },
    mounted() {
        this.loadSelectOptions();
    },
    methods: {
        createSeries(){
            this.uploading = true;
            this.success = false;
            this.uploadPerc = 0;
            let formData = new FormData();
            if(this.info.title) formData.append('title', this.info.title);
            if(this.info.synopsis) formData.append('synopsis', this.info.synopsis);
            if(this.info.status) formData.append('status', this.info.status.name.toLowerCase());
            if(this.info.origin) formData.append('origin', this.info.origin);
            if(this.info.cover) formData.append('cover', this.info.cover);
            if(this.info.alternative_titles && this.info.alternative_titles.length > 0) formData.append('alternative_titles', JSON.stringify(this.info.alternative_titles));
            if(this.info.genres && this.info.genres.length > 0) formData.append('genres', JSON.stringify(this.info.genres));
            if(this.info.themes && this.info.themes.length > 0) formData.append('themes', JSON.stringify(this.info.themes));
            if(this.info.demographics && this.info.demographics.length > 0) formData.append('demographics', JSON.stringify(this.info.demographics));
            if(this.info.authors && this.info.authors.length > 0) formData.append('authors', JSON.stringify(this.info.authors));
            if(this.info.artists && this.info.artists.length > 0) formData.append('artists', JSON.stringify(this.info.artists));
            this.$axios.post('/groups/mangas', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: event => {
                    this.uploadPerc = Math.round(
                        (event.loaded * 100) / event.total
                    );
                },
            }).then(response => {
                console.log(response.data);
                this.error = {};
                // this.uploading=false;
                this.success = true;
                setTimeout(() => this.$router.push('/r2/series'), 2000)
            })
            .catch(error => {
                console.log(error.response.data)
                if(error){
                    if(error.response){
                        this.error = error.response.data;
                    }
                }
                this.uploading=false;
            })
        },
        loadSelectOptions(){
            this.$axios
				.get("/manga/genres")
				.then(resp => (this.genres = resp.data.data.map(e => e={
                    id: e[0],
                    name: e[1],
                })))
				.catch(err => console.log(err.response));
			this.$axios
				.get("/manga/themes")
				.then(resp => (this.themes = resp.data.data.map(e => e={
                    id: e[0],
                    name: e[1],
                })))
				.catch(err => console.log(err.response));
			this.$axios
				.get("/manga/demographics")
				.then(resp => (this.demographics = resp.data.data.map(e => e={
                    id: e[0],
                    name: e[1],
                })))
				.catch(err => console.log(err.response));
            this.$axios
				.get("/manga/authors")
				.then(resp => (this.authors = resp.data.data.map(e => e={
                    id: e[0],
                    name: e[1],
                })))
				.catch(err => console.log(err.response));
			this.$axios
				.get("/manga/artists")
				.then(resp => (this.artists = resp.data.data.map(e => e={
                    id: e[0],
                    name: e[1],
                })))
				.catch(err => console.log(err.response));
        },
        addTitle(){
            this.info.alternative_titles.push(this.addTitleInput);
            this.addTitleInput = '';
        },
        removeTitle(title){
            this.info.alternative_titles = this.info.alternative_titles.filter(e => e !== title);
        },
        onCoverChange(e){
            let file = e.target.files[0];
            this.info.cover = file;
            this.coverPreview = URL.createObjectURL(file);
        },
		mediaPage(pageurl) {
			let apiUrlWV = process.env.apiURL;
			let apiurl =
				apiUrlWV.substring(0, apiUrlWV.length - 3) + "storage/";
			return apiurl + pageurl;
		}
    }
}
</script>