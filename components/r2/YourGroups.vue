<template>
	<div class="w-full mb-4 p-4 bg-white">
		<h1 class="mb-2 text-lg ">
			Your Groups
			<span v-if="updating" class="text-sm text-yellow-600"
				>Processing...</span
			>
		</h1>
		<success-bubble v-if="success != ''" :text="success"></success-bubble>
		<error-bubble v-if="error != ''" :text="error"></error-bubble>
		<div class="form-group-inline">
			<input
				v-model="newGroup"
				type="text"
				class="form-input"
				placeholder="New Group Name..."
			/>
			<button @click="createGroup" class="btn btn-green">
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
		<div v-if="groups.length > 0">
			<table class="ctable">
				<tbody>
					<tr
						v-for="group in groups"
						:key="group.id"
						class="ctable-row"
					>
						<td class="ctable-cell wide">{{ group.name }}</td>
						<td
							v-if="group.owner_id == $store.state.user.id"
							class="ctable-cell"
						>
							<button
								@click="openEdit(group)"
								class="btn text-theme hover:text-theme-dark"
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
										d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
									/>
								</svg>
							</button>
						</td>
						<td
							v-if="group.owner_id != $store.state.user.id"
							class="ctable-cell"
						>
							<button
								@click="leaveGroup(group)"
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
	</div>
</template>

<script>
export default {
	data() {
		return {
			groups: [],
			newGroup: "",
			success: "",
			error: "",
			updating: false
		};
	},
	mounted() {
		this.loadGroups();
	},
	methods: {
		openEdit(data) {
			this.$emit("edit", data);
		},
		loadGroups() {
			this.updating = true;
			this.groups = [];
			this.$axios
				.get("/me/groups")
				.then(response => {
					this.updating = false;
					this.groups = response.data;
				})
				.catch(err => {
					this.updating = false;
					alert(err);
				});
		},
		createGroup() {
			this.updating = true;
			this.$axios
				.post("/groups/create", {
					name: this.newGroup
				})
				.then(response => {
					this.updating = false;
					this.error = "";
					this.newGroup = "";
					this.success =
						'Group "' +
						response.data.name +
						'" has been successfuly created.';
					this.loadGroups();
					setTimeout(() => (this.success = ""), 5000);
				})
				.catch(error => {
					this.updating = false;
					this.success = "";
					this.error = error.response.data.name[0];
					setTimeout(() => (this.error = ""), 5000);
				});
		},
		leaveGroup(group) {
			this.updating = true;
			this.$axios
				.post("/me/groups/leave/" + group.id)
				.then(() => {
					this.loadGroups();
				})
				.catch(error => {
					this.updating = false;
					this.success = "";
					this.error = error.response.data;
				});
		}
	}
};
</script>
