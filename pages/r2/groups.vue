<template>
    <div class=" dark:bg-dt-100">
        <div class="resp-container">
            <h1 class="page-title">Groups</h1>
            <div class="w-full flex flex-col xl:flex-row xl:space-x-2 xl:items-stretch">
                <r2-your-groups ref="groups" v-on:edit="openEdit($event)"></r2-your-groups>
                <transition name="fade">
                    <r2-group-edit v-if="showEdit" :group="editInfo" v-on:edit="editSync($event)" v-on:delete="closeEdit"></r2-group-edit>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: ['auth'],
    data() {
        return {
            showEdit: false,
            editInfo: null,
        }
    },
    methods: {
        editSync(info){
            this.$refs.groups.loadGroups();
            this.editInfo = {...info};
        },
        openEdit(data){
            this.showEdit = false;
            setTimeout(()=> {
                this.editInfo = data;
                this.showEdit = true;
            }, 500);
        },
        closeEdit(){
            this.$refs.groups.loadGroups();
            this.editInfo = null;
            this.showEdit = false;
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>