<template>
	<div v-click-outside="clickedOutside">
		<div class="relative w-full">
            <div class="tag-container">
                <div v-for="sel in selection" :key="sel.id" @click="select(sel)" class="tag-sp items-center">
                    <p>{{sel.name}}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3+" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                </div>
            </div>
			<div class="form-group-inline">
				<input
					v-model="input"
					type="text"
					class="form-input"
					placeholder="Search..."
                    @focus="open=true"
				/>
				<button @click="search" class="btn btn-theme">
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
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
			<div v-if="open" class="-mt-4 absolute w-full max-h-48 overflow-y-scroll bg-white shadow">
				<div v-if="searching" class="px-4 py-2">
					<p class="italic text-gray-600">Searching...</p>
				</div>
				<div v-if="!searching && results.message" class="px-4 py-2">
					<p class="italic text-gray-600">{{ results.message }}</p>
				</div>
				<div v-if="!searching && Array.isArray(results)">
					<div
						v-for="result in results"
						:key="result.id"
						@click="select(result)"
						class="w-full flex justify-between px-4 py-2 hover:bg-theme hover:text-white cursor-pointer"
                        :class="{'bg-theme-light text-theme-dark': isSelected(result)}"
					>
						<p>{{ result.name }}</p>
						<svg
							v-if="isSelected(result)"
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
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import vClickOutside from 'v-click-outside'
export default {
	props: ["url", "spaces", "filter"],
	data() {
		return {
			input: "",
			results: [],
			selection: [],
			cancel: null,
            open: false,
			searching: false,
		};
	},
	watch: {
		input: function(val) {
			console.log(val);
			if (this.spaces == false) val = val.replace(" ", "");
			else val = val.splice(" ").join("_");
			this.input = val;
			this.search();
            this.open = true;
		},
        selection: function(val){
            if(this.selection.length > 0) this.$emit('selection', val);
            else this.$emit('selection', null);
        }
	},
	methods: {
		search() {
			this.searching = true;
			if (this.cancel !== null) this.cancel();
			let nct = null;
			this.$axios({
				method: "GET",
				url: this.url + this.input,
				cancelToken: new axios.CancelToken(function executor(c) {
					nct = c;
				})
			})
				.then(response => {
					this.searching = false;
					//Cancel the cancel token
					this.cancel = null;
					nct = null;
					this.results = response.data;
                    if(this.filter){
                        this.results = this.results.filter(e => !this.filter.map(o => o.id).includes(e.id));
                    }
				})
				.catch(err => {
					console.log(err.response)
					this.searching = false;
				});

			this.cancel = nct;
		},
		select(opt) {
			if (this.selection.map(e => e.id).includes(opt.id)) {
				this.selection = this.selection.filter(e => e.id !== opt.id);
			} else this.selection.push(opt);
		},
		isSelected(opt) {
			if (this.selection.map(e => e.id).includes(opt.id)) return true;
			else return false;
		},
		clickedOutside() {
			this.open = false;
		},
        clearSelection(){
            this.open = false;
            this.selection = [];
            this.input = '';
            this.results = [];
        }
	},
	directives: {
		clickOutside: vClickOutside.directive
	}
};
</script>
