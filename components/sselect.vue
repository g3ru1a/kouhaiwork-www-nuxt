<template>
	<div
		class="relative w-full"
        v-click-outside="clickedOutside"
	>
		<div
			@click="
				focusedInp ? (open = true) : (open = !open);
				if (!open) search = '';
			"
			class="p-3 w-full bg-white shadow flex justify-between cursor-pointer rounded dark:bg-dt-700"
		>
			<input
				ref="search"
				v-model="search"
				v-show="open"
				type="text"
				class="w-full h-full focus:outline-none dark:bg-dt-700"
				:placeholder="`Search for ${title}`"
				@focus="focusedInp = true"
				@blur="focusedInp = false"
			/>
			<p
				v-show="!open && (selection == null || selection.length == 0)"
				class="text-gray-400 italic truncate"
			>
				Select {{ title }}
			</p>
			<p v-if="!open && selection != null" class="truncate">
				<span>{{
					multiple
						? selection.map(e => e.name).join(", ")
						: selection.name
				}}</span>
				<!-- <span v-show="multiple" v-for="sel in selection" :key="sel.id">{{ sel.name }}, </span> -->
			</p>
			<svg
				v-show="!open"
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
					d="M19 9l-7 7-7-7"
				/>
			</svg>
			<svg
				v-show="open"
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
					d="M5 15l7-7 7 7"
				/>
			</svg>
		</div>
		<div
			v-show="open && options && options.length > 0"
			class="mt-1 absolute flex flex-col rounded bg-white dark:bg-dt-300 shadow-lg w-full max-h-40 overflow-y-scroll z-50"
		>
			<p
				class="px-4 py-2 text-gray-800 dark:text-white text-left italic"
				v-if="filteredOptions.length == 0"
			>
				No {{title.toLowerCase()}} match '{{ search }}'
			</p>

			<button
				v-for="opt in filteredOptions"
				:key="opt.id"
				@click.prevent="select(opt)"
				class="option"
				:class="{ selected: isSelected(opt) }"
			>
				{{ opt.name }}
				<span v-show="isSelected(opt)" class="float-right">
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
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</span>
			</button>
		</div>

		<div v-if="multiple" v-show="open" class="absolute tag-container-centered mt-44 z-50">
			<div
				v-show="search == '' && multiple"
				v-for="opt in selection"
				:key="opt.id"
				@click.prevent="select(opt)"
				class="tag-sp tag-theme"
			>
				<p>{{ opt.name }}</p>
				<span class="text-sm float-right">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
	props: {
		title: String,
		options: Array,
		multiple: {
			type: Boolean,
			default: false
		},
		preselection: Object | Array
	},
	data() {
		return {
			open: false,
			selection: null,
			selection_length: 0,
			focusedInp: false,
			search: ""
		};
	},
	mounted(){
		console.log(this.preselection);
		if(this.preselection != undefined){
			if(Array.isArray(this.preselection)){
				for(let i = 0; i < this.preselection.length; i++){
					let opt = this.options.find(e => e.id == this.preselection[i]);
					this.select(opt);
				}
			}else{
				this.select(this.options.find(e => e.id == this.preselection));
				console.log('seleeect');
			}
				this.open = false;
		}
	},
	methods: {
		select(opt) {
			if (this.multiple) {
				if (this.selection == null) this.selection = [];
				//If already selected
				if (this.selection.find(e => e.id == opt.id)) {
					this.selection = this.selection.filter(e => e.id != opt.id);
				} else {
					this.selection.push(opt);
				}
				this.search = "";
			} else {
				this.selection = opt;
				this.open = !this.open;
				this.search = "";
			}
		},
		isSelected(opt) {
			if (this.multiple) {
				if (this.selection) {
					if (this.selection.find(e => e.id == opt.id)) return true;
					else return false;
				} else return false;
			} else return this.selection && opt.id == this.selection.id;
		},
		clickedOutside() {
			this.open = false;
		}
	},
	watch: {
		selection: function(val) {
			this.$forceUpdate();
			this.$emit('sel_change', val);
		}
	},
	computed: {
		filteredOptions() {
			this.selection_length;
			if (this.search == "") {
				return this.options;
				// return this.options.filter(o => {
				//     return this.multiple && this.selection ? this.selection.find(e => e.id == o.id) == undefined : true;
				// });;
			}
			return this.options.filter(o => {
				// if(this.multiple && this.selection && this.selection.find(e => e.id == o.id)) {
				//     return false;
				// }
				return o.name.toLowerCase().includes(this.search.toLowerCase());
			});
		}
	},
	directives: {
		clickOutside: vClickOutside.directive
	}
};
</script>

<style scoped>
.option {
	@apply px-4 py-2 text-left bg-white dark:bg-dt-300 dark:text-white;
}

.option.selected {
	@apply bg-theme-light dark:bg-dt-700;
}

.option:hover,
.option.selected:hover {
	@apply bg-theme text-white dark:bg-dt-700;
}
</style>
