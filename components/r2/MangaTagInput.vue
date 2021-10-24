<template>
	<div class="form-group">
		<h1>{{title}}</h1>
        <error-bubble v-if="!showSelect" :text="errorText"></error-bubble>
		<div class="flex flex-row items-stretch">
			<sselect
                v-show="showSelect"
				:title="title"
				:options="options"
				v-on:sel_change="change($event);"
				:multiple="multiple ? multiple : false"
                :preselection="preselection ? preselection : undefined"
			></sselect>
            <div class="w-full" v-show="!showSelect">
                <form class="w-full" @submit.prevent="addItem()">
                <input  v-model="newItemInput" type="text" class="form-input" :placeholder="`New ${title}...`">
            </form>
            </div>
			<div v-show="showSelect">
				<button @click="openInput()" class="h-full btn btn-green">
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
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</button>
			</div>
            <div v-show="!showSelect" class="flex flex-row items-stretch">
                <button @click="addItem()" class="h-full btn transition-all duration-150" 
                    :class="{'btn-yellow': !uploading && !complete, 'btn-theme': uploading && !complete, 'btn-green': !uploading && complete && !error, 'btn-red': !uploading && complete && error}">

					<svg v-show="!uploading && !complete" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <svg v-show="uploading && !complete" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <svg v-show="!uploading && complete && !error" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg v-show="!uploading && complete && error" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
				</button>
				<button v-show="!uploading && !complete" @click="hideInput()" class="h-full btn btn-red">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import ErrorBubble from '../ErrorBubble.vue';
export default {
    components: { ErrorBubble },
    props: ['title', 'options', 'multiple', 'newUrl', 'preselection'],
    data() {
        return {
            showSelect: true,
            newItemInput: '',
            errorText: null,
            uploading: false,
            complete: false,
            error: false,
        }
    },
    methods: {
        addItem(){
            this.uploading = true;
            this.complete = false;
            this.$axios.post(this.newUrl, {
                name: this.newItemInput
            }).then((response) => {
                this.errorText = null;
                this.uploading = false;
                this.complete = true;
                setTimeout(() => {
                    this.complete = false;
                }, 1500);
                this.$emit('up_complete', true);
                this.newItemInput = '';
            }).catch((err)=>{
                this.uploading = false;
                this.complete = true;
                this.error = true;
                setTimeout(() => {
                    this.complete = false;
                    this.error = false;
                }, 1500);
                if(err.response){
                    this.errorText = err.response.data.error.errors.name[0];
                }
            });
        },
        openInput(){
            this.showSelect = false;

        },
        hideInput(){
            this.showSelect = true;

        },
        change(data){
            this.$emit('sel_change', data);
        }
    }
}
</script>
