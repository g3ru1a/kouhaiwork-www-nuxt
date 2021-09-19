<template>
    <div class="guidelines-container">
        <h4 class="guidelines-title">Upload Guidelines</h4>
        <p class="guidelines-subtitle text-red-400 font-semibold">Do not upload:</p>
        <p class="guidelines-item">&#8226; Western comics (e.g. Marvel)</p>
        <p class="guidelines-item">&#8226; Official releases, including raws (exceptions are sometimes made for defunct publishers)</p>
        <p class="guidelines-item">&#8226; Bulk chapters (e.g. Combining 10 chapters into 1)</p>

        <p class="guidelines-subtitle">File limits:</p>
        <p class="guidelines-item">&#8226; An image can be at most (10000 x 10000) pixels</p>
        <p class="guidelines-item">&#8226; Max file size per image is 10 MB</p>
        <p class="guidelines-item">&#8226; Supported image formats are JPG, JPEG, PNG, BMP, SVG, WEBP and GIF</p>
        <p class="guidelines-item">&#8226; Total chapter size limit is 200 MB</p>

        <p class="guidelines-subtitle">Naming conventions:</p>
        <p class="guidelines-item">&#8226; Include chapter names, if available.</p>
        <p class="guidelines-item">&#8226; Include the volume number only if the volume was officially released for purchase, leave empty otherwise.</p>
        <p class="guidelines-item">&#8226; If the title uses seasons, use the volume numbers to indicate the season.</p>
        <p class="guidelines-item">&#8226; Only put numbers or variants into the chapter and volume number fields</p>
        <p class="guidelines-item">&#8226; Use decimals (e.g. 1.5) for bonus chapters/omake/etc.</p>
        <p class="guidelines-item">&#8226; Do not zeropad volume or chapter numbers (01, 02, etc...)</p>
        <p class="guidelines-item">&#8226; For oneshots, name the chapter title "Oneshot", leave the volume blank and put the chapter number as 0.</p>
    </div>
</template>

<style scoped>
.guidelines-container {
    @apply my-8 px-4 w-full dark:text-white
}
.guidelines-title {
    @apply text-xl text-center font-semibold mb-2 mt-4
}
.guidelines-subtitle {
    @apply mt-2 text-lg
}
.guidelines-item {
    @apply pl-2 font-light
}
</style>