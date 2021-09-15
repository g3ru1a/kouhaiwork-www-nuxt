<template>
    <div class="reader">
        <div class="reader-inner">
            <client-only>
                <reader-page
                    v-for="(page,index) in chapter.pages"
                    :page="page"
                    :key="`item-${index}`" 
                    :current-page="currentPage" 
                    :index="index"
                    :direction="slide_direction">
                </reader-page>
            </client-only>

            <reader-controls
                v-on:prev-page="prevPage($event)" 
                v-on:next-page="nextPage($event)"
                :chapter="chapter"
                :settings="settings"
                :pageCounter="`${currentPage+1}/${chapter.pages.length}`">
            </reader-controls>
        </div>
    </div>
</template>

<script>
export default {
    props: ['chapter', 'settings', 'next_id', 'prev_id'],
    data() {
        return {
            currentPage: 0,
            slide_direction: 'left'
        }
    },
    methods: {
        setCurrentPage(index){
            this.currentPage = index;
        },
        nextPage(skip = false){
            console.log(skip);
            if(this.currentPage === this.chapter.pages.length - 1 && this.next_id !== null){
                this.$router.push("/read/" + this.next_id);
                return;
            }else if(this.currentPage === 0 && this.next_id === null){
                this.$router.push('/series/'+this.chapter.manga_id)
            }
            let ind = this.currentPage < this.chapter.pages.length - 1 ? this.currentPage + 1 : this.chapter.pages.length -1;
            if(skip) ind = this.chapter.pages.length - 1;
            this.setCurrentPage(ind);
            this.slide_direction = this.settings.direction === "rtl" ? 'left' : 'right';
        },
        prevPage(skip = false){
            console.log(skip);
            if(this.currentPage === 0 && this.prev_id !== null){
                this.$router.push("/read/" + this.prev_id);
                return;
            }else if(this.currentPage === 0 && this.prev_id === null){
                this.$router.push('/series/'+this.chapter.manga_id)
            }
            let ind = this.currentPage > 0 ? this.currentPage - 1 : 0;
            if(skip) ind = 0;
            this.setCurrentPage(ind);
            this.slide_direction = this.settings.direction === "rtl" ? 'right' : 'left';
        }
    },

}
</script>

<style scoped>
.reader {
    @apply z-40 min-h-screen flex justify-center items-center;
}

.reader-inner {
    @apply min-h-screen relative w-screen my-auto overflow-hidden;
}
</style>