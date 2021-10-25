<template>
	<div class="w-full">
		<div v-if="!info" class="flex flex-col xl:flex-row text-center items-center justify-center text-xl">
			<p class="xl:mr-4 dark:text-white">Loading</p>
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="bg-white dark:bg-dt-100 dark:text-white" style="display: block;" width="25px" height="25px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<circle cx="50" cy="50" fill="none" class="stroke-current" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
			<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
			</circle>
			</svg>
		</div>
		<div v-if="info" class="w-full p-4 bg-white shadow rounded-lg dark:bg-dt-300 dark:text-white">
			<h1 class="text-lg mb-2">
				Edit Group
				<span v-if="updating" class="text-sm text-yellow-600"
					>Updating...</span
				>
			</h1>
			<success-bubble v-if="success != ''" :text="success"></success-bubble>
			<error-bubble v-if="error != ''" :text="error"></error-bubble>
			<div class="form-group-inline">
				<input
					type="text"
					class="form-input"
					placeholder="Update Name"
					v-model="info.name"
				/>
				<button
					@click="updateName"
					class="btn"
					:class="[group.name !== info.name ? 'btn-yellow' : 'btn-green']"
				>
					<svg
						v-if="group.name === info.name"
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
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<svg
						v-if="group.name !== info.name"
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
				</button>
			</div>
			<div>
				<p class="font-semibold">Add Members</p>
				<lookup-select
					ref="user_select"
					url="/search/users/r2/"
					:filter="info.members"
					:spaces="false"
					v-on:selection="newMembers = $event"
				></lookup-select>
				<button @click="linkUsers" class="btn btn-block btn-theme">
					Add to {{ group.name }}
				</button>
			</div>
			<div>
				<p class="font-semibold">Members:</p>
				<p v-if="info && info.members.length == 0">
					This group has no members besides you.
				</p>
				<table class="ctable">
					<tbody>
						<tr
							v-for="member in info.members"
							:key="member.id"
							class="ctable-row"
						>
							<td class="ctable-cell wide">{{ member.name }}</td>
							<td class="ctable-cell">
								<button
									@click="kickMember(member)"
									class="btn btn-red"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="pt-2">
				<p class="font-semibold">Delete Group</p>
				<div class="w-full">
					<button
						v-if="!deletePrompt"
						@click="deleteGroup"
						class="btn w-full btn-red"
					>
						Delete Group
					</button>
					<div v-if="deletePrompt">
						<p class="text-center mb-4">
							Are you sure you want to delete
							<span class="font-semibold italic">{{
								group.name
							}}</span
							>?
						</p>
						<div class="w-full flex items-stretch">
							<button
								@click="deleteGroup"
								class="btn w-full btn-red"
							>
								Yes, Delete
							</button>
							<button
								@click="deletePrompt = false"
								class="btn w-full btn-theme"
							>
								No, Fuck go back
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["group"],
	data() {
		return {
			info: null,
			newMembers: null,
			success: "",
			error: "",
			updating: false,
			deletePrompt: false
		};
	},
	mounted() {
		this.loadMembers();
	},
	methods: {
		deleteGroup() {
			if (this.deletePrompt == false) {
				this.deletePrompt = true;
				return;
			}
			this.updating = true;
			this.$axios
				.delete("/groups/me/" + this.group.id)
				.then(response => {
					this.updating = false;
					this.$emit('delete')
				})
				.catch(error => {
					this.updating = false;
					this.success = '';
					this.error = error.response.data;
				});
		},
		syncEdit() {
			this.$emit("edit", this.info);
		},
		updateName() {
			if(this.info.name == '' || this.info.name == undefined) return;
			this.updating = true;
			this.$axios
				.put("/groups/me/" + this.group.id, {
					name: this.info.name
				})
				.then(response => {
					this.error = "";
					this.success =
						'Group "' +
						response.data.name +
						'" has been successfuly updated.';
					this.syncEdit();
					this.updating = false;
				})
				.catch(error => {
					this.success = "";
					this.error = error.response.data.name[0];
					this.updating = false;
				});
		},
		linkUsers() {
			this.updating = true;
			if(this.newMembers == null) {
				this.error = 'You must select at least 1 user.';
				this.updating = false;
				return;
			}
			this.$axios
				.post("/groups/me/" + this.group.id+"/members", {
					group_id: this.group.id,
					users: JSON.stringify(this.newMembers.map(o => o.id))
				})
				.then(response => {
					this.$refs.user_select.clearSelection();
					this.loadMembers();
					this.syncEdit();
					this.updating = false;
				})
				.catch(err => {
					this.updating = false;
				});
		},
		loadMembers() {
			this.$axios
				.get("/groups/me/" + this.group.id+"/members")
				.then(response => {
					this.info = {...this.group, members: response.data.data};
				});
		},
		kickMember(member) {
			this.updating = true;
			console.log(JSON.stringify([member.id]));
			this.$axios
				.post("/groups/me/" + this.group.id+"/members?_method=DELETE", {
					groupID: this.group.id,
					members: JSON.stringify([member.id]),
				})
				.then(() => {
					this.updating = false;
					this.info.members = this.info.members.filter(
						m => m.id != member.id
					);
				})
				.catch(error => {
					this.updating = false;
					console.log(error);
				});
		}
	}
};
</script>
