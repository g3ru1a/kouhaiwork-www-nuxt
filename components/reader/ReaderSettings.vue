<template>
    <div class="w-full md:px-4 lg:px-0 lg:mx-auto lg:w-4/5 2xl:w-2/3 3xl:w-1/2">
        <div class="form-group-inline">
            <div @click="$router.push('/series/'+manga_id)" class="cursor-pointer w-full p-4 bg-white text-theme border border-theme flex items-center justify-center dark:bg-dt-300 dark:border-dt-theme">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <p>Series Page</p>
            </div>
            <div @click="showSettings = !showSettings" class="cursor-pointer w-full p-4 bg-theme text-white flex items-center justify-center dark:bg-dt-theme">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>{{!showSettings ? 'Show' : 'Hide'}} Settings</p>
            </div>
        </div>
        <div v-if="showSettings" class="mb-4">
            <div class="flex">
                <button @click="toggleDirection" class="mb-1 w-full btn btn-theme">Read Direction: <span class="uppercase">{{settings.direction}}</span></button>
                <button @click="toggleLights" class="mb-1 w-full btn btn-theme-inv">Lights: {{settings.dark ? 'Off' : 'On'}}</button>
            </div>
            <button @click="togglePadding" v-show="settings.direction == 'ver'" class="w-full btn btn-theme-inv">Vertical Padding: {{settings.vertical_padding ? 'On' : 'Off'}}</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['settings', 'manga_id'],
    data(){
        return {
            showSettings: false,
        }
    },
    methods: {
        updateSettings(settings){
            this.$emit('update-settings',settings);
        },
        toggleDirection(){
            let newDir;
            switch(this.settings.direction){
                case 'ltr': newDir = 'rtl'; break;
                case 'rtl': newDir = 'ver'; break;
                case 'ver': newDir = 'ltr'; break;
                default: newDir = 'ltr'; break;
            }
            this.updateSettings({
                direction: newDir,
                dark: this.settings.dark,
                vertical_padding: this.settings.vertical_padding
            });
        },
        toggleLights(){
            this.updateSettings({
                direction: this.settings.direction,
                dark: !this.settings.dark,
                vertical_padding: this.settings.vertical_padding
            });
        },
        togglePadding(){
            this.updateSettings({
                direction: this.settings.direction,
                dark: this.settings.dark,
                vertical_padding: !this.settings.vertical_padding
            });
        }
    }
}
</script>
