<script setup lang="ts">
const { label } = defineProps<{ label: string }>()

</script>
<template>
    <div class="p-[60px]" style="height: calc(100vh - 80px)">
        <div class="bg-white px-6 py-12 border mb-8 flex items-center justify-between">
            <h1 class="font-bold text-2xl">{{ $t(label) }}</h1>
        </div>
        <div class="bg-white py-5 px-4 border mb-4">
            <slot />
        </div>
    </div>
</template>