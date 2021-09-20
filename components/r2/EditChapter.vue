<template>
	<div>
		<div v-if="loaded" v-show="!uploading" class="panel panel-white">
			<div class="form-group">
                <error-bubble v-if="errors.group" :text="errors.group"></error-bubble>
				<sselect
					title="Groups"
					:options="groups_list"
					v-on:sel_change="group = $event"
                    :preselection="info.group_id"
					:multiple="false"
				></sselect>
			</div>
            <error-bubble v-if="errors.number" :text="errors.number"></error-bubble>
			<div class="form-group-inline">
				<input
					v-model="volume"
					type="number"
					class="form-input"
					placeholder="Volume Number (Optional)"
				/>
				<input
					v-model="number"
					type="number"
					class="form-input"
					placeholder="Chapter Number"
				/>
			</div>
			<div class="form-group">
				<input
					v-model="name"
					class="form-input"
					type="text"
					placeholder="Chapter Name (Optional)"
				/>
			</div>
			<!-- page input -->
			<div class="form-group">
                <error-bubble v-if="errors.pages" :text="errors.pages"></error-bubble>
                <p class="mb-2 text-center text-sm italic">Only add pages if you want to change or re-order them.(Adding pages will replace existing ones)</p>
				<button
					@click="$refs.page_input.click()"
					class="btn btn-block btn-theme-inv flex justify-center"
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
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
						/>
					</svg>
					Upload Pages
				</button>
				<input
					@change="onImageInputChange"
					class="hidden"
					type="file"
					ref="page_input"
					multiple
				/>
			</div>
			<div class="form-image-container">
				<draggable
					class="dragArea image-preview-container "
					v-model="order_array"
					group="pages"
					@start="drag = true"
					@end="drag = false"
				>
					<div
						v-for="(element, index) in order_array"
						:key="index"
						class="image-preview-box"
					>
						<img class="image-preview" :src="element.url" />
						<div class="image-preview-overlay">
							<p class="image-preview-number">{{ index + 1 }}</p>
							<div class="image-preview-icon-box">
								<i
									class="image-preview-icon fas fa-arrows-alt"
								></i>
							</div>
							<p class="image-preview-name">
								{{ element.fileName }}
							</p>
						</div>
					</div>
				</draggable>
			</div>
			<!-- w/page input -->
			<div class="form-group">
				<button @click="update(false)" class="btn btn-block btn-theme">
					Update
				</button>
			</div>
			<div class="form-group">
				<button @click="deleteChapter" v-show="!deletePrompt" class="btn btn-block btn-red">Delete</button>
				<div v-show="deletePrompt">
					<p class="mb-2 text-center">Are you sure you want to delete the chapter?</p>
					<div class="btn-group noborder">
						<button @click="deleteChapter" class="btn btn-block btn-red">Delete</button>
						<button @click="deletePrompt = false" class="btn btn-block btn-theme">Didn't mean to do that</button>
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="uploading"
			class="flex flex-col text-center items-center justify-center text-xl"
		>
			<div class="w-full relative px-1">
				<div
					class="overflow-hidden h-6 mb-4 text-xs text-center flex rounded bg-theme-light z-20"
				>
					<div
						:style="`width:${uploadPerc}%`"
						class="shadow-none flex text-center whitespace-nowrap text-white justify-center bg-theme-dark transition-all duration-150"
					></div>
					<div
						class="absolute text-white h-6 pin flex items-center justify-center z-30"
						style="color:white; mix-blend-mode: difference;"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							class="dark:bg-dt-100 dark:text-white"
							style="display: block;"
							width="15px"
							height="15px"
							viewBox="0 0 100 100"
							preserveAspectRatio="xMidYMid"
						>
							<circle
								cx="50"
								cy="50"
								fill="none"
								class="stroke-current"
								stroke-width="10"
								r="35"
								stroke-dasharray="164.93361431346415 56.97787143782138"
							>
								<animateTransform
									attributeName="transform"
									type="rotate"
									repeatCount="indefinite"
									dur="1s"
									values="0 50 50;360 50 50"
									keyTimes="0;1"
								></animateTransform>
							</circle>
						</svg>
						<p class="mx-1 py-1 dark:text-white">
							Uploading Series {{ uploadPerc }}%
						</p>
					</div>
				</div>
			</div>
			<p v-if="success" class="text-base">
				Upload Complete! Redirecting...
			</p>
		</div>
	</div>
</template>

<script>
import draggable from "vuedraggable";

export default {
	components: { draggable },
	data() {
		return {
			uploading: false,
			success: false,
			loaded: false,
			series_list: [],
			groups_list: [],
			group: null,
			volume: "",
			number: "",
			name: "",
			pages: null,
			order_array: null,
            uploadPerc: 50,
            errors: {},
            info: null,
			deletePrompt: false,
		};
	},
	async mounted() {
		await this.loadData();
        this.number = this.info.number;
        this.name = this.info.name;
        this.volume = this.info.volume;
	},
	methods: {
		deleteChapter() {
			if(!this.deletePrompt) {
				this.deletePrompt = true;
				return;
			}
            this.uploading = true;
			this.$axios.delete('/mangas/'+this.$route.params.id, {}, {
				onUploadProgress: event => {
                    this.uploadPerc = Math.round(
                        (event.loaded * 100) / event.total
                    );
                },
			})
			.then(()=>{
            	this.uploading = false;
                this.$router.push('/r2/chapters/');
			})
			.catch(err => {
            	this.uploading = false;
				console.log(err);
			});
		},
		update(keep) {
            this.uploading = true;
            this.success = false;
            let formData = new FormData();
            if(this.info.manga_id) formData.append('manga_id', this.info.manga_id);
            if(this.volume) formData.append('volume', this.volume);
            if(this.name) formData.append('chapter_name', this.name);
            if(this.number) formData.append('chapter', this.number);
            else {
                this.errors = {
                    number: 'Can\'t upload without a chapter number specified.'
                };
                this.uploading = false;
                return;
            }
            if(this.group) formData.append('group_id', this.group.id);
            else {
                this.errors = {
                    group: 'Can\'t upload without a group selected.'
                };
                this.uploading = false;
                return;
            }
            if(this.order_array){
                let order = [];
                for(var j = 0; j < this.order_array.length; j++){
                    order.push(this.order_array[j].id);
                }
                formData.append('order', JSON.stringify(order));
                let totalSize = 0;
                for(var i = 0; i < this.pages.length; i++ ){
                    let page = this.pages[i];
                    let mbSize = page.size / 1024 / 1024;
                    if(mbSize > 10){
                        this.errors = {
                            pages: 'Page: ' + page.name + ' is too big (max 10MB).'
                        };
                        this.uploading = false;
                        return;
                    }
                    totalSize += mbSize;
                    if(totalSize > 200) {
                        this.errors = {
                            pages: 'Pages total size is too big (max 200MB).'
                        };
                        this.uploading = false;
                        return;
                    }
                    formData.append('pages[' + i + ']', page);
                }
            }
            this.$axios.post('/chapter/update/'+this.info.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: event => {
                    this.uploadPerc = Math.round(
                        (event.loaded * 100) / event.total
                    );
                },
            }).then(response => {
                console.log(response.data);
                this.errors = {};
                // this.uploading=false;
                this.success = true;
                setTimeout(() => {
                    this.$router.push('/r2/chapters/');
                }, 2000);
            })
            .catch(error => {
                console.log(error.response.data)
                if(error){
                    if(error.response){
                        this.errors = {
                            number: error.response.data.chapter ? error.response.data.chapter[0] : null,
                            pages: error.response.data.pages ? error.response.data.pages[0] : null,
                        }
                        if(this.errors.series){
                            this.errors.series = this.errors.series.replace('manga id', 'series');
                        }
                    }
                }
                this.uploading=false;
            })
        },
		onImageInputChange(e) {
			let files = e.target.files;
			this.pages = files;
			this.order_array = [];
			for (let i = 0; i < files.length; i++) {
				console.log(files[i]);
				this.order_array.push({
					id: i,
					url: URL.createObjectURL(files[i]),
					fileName: files[i].name
				});
			}
			console.log(this.order_array);
			console.log(this.pages);
		},
		async loadData() {
            await this.$axios
                .get('/r2/chapter/'+this.$route.params.id)
                .then(resp => {
                    this.info = resp.data;
                })
				.catch(err => console.log(err.response));
			await this.$axios
				.get("/r2/manga/all")
				// .get('/manga/genres')
				.then(resp => {
					this.series_list = resp.data.map(
						o => (o = { ...o, name: o.title })
					);
				})
				.catch(err => console.log(err.response));
			await this.$axios
				.get("/me/groups/owner")
				.then(
					resp => (
						(this.groups_list = resp.data), (this.loaded = true)
					)
				)
				.catch(err => console.log(err.response));
		},
		log: function() {
			console.log(this.order_array);
		}
	}
};
</script>

<style scoped>
.form-image-container {
	@apply mb-2;
}
.image-preview-container {
	@apply w-full flex flex-row items-center justify-center flex-wrap;
}
.image-preview {
	@apply w-full h-auto shadow-lg;
}
.image-preview-overlay {
	@apply absolute flex flex-col w-full top-0 bottom-0 left-0 right-0 text-center py-1 text-white opacity-75;
}
.image-preview-icon-box {
	@apply w-full h-full flex flex-col items-center justify-center;
}
.image-preview-icon {
	@apply text-3xl bg-black rounded-full p-2;
}
.image-preview-name {
	@apply w-full text-center py-1 bg-black text-white justify-self-end;
}
.image-preview-number {
	@apply text-center py-1 bg-black text-white;
}
.image-preview-box {
	@apply w-1/2 p-1 relative overflow-hidden md:w-1/5 md:mr-1;
}
</style>
