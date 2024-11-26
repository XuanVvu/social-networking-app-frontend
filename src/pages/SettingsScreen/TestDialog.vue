<script lang="ts" setup>
import { IOptionDialog } from '@/utils/useDialog';
import { onBeforeMount, onMounted } from 'vue';

const { a } = defineProps<{ a: any }>()
const opening = async () => {
    console.log('opening');

}
const closing = async () => {
    console.log('closing');

}

defineExpose({ opening, closing })

onMounted(() => {
    console.log('test component mounted');

    console.log(a);


})
onBeforeMount(() => {
    console.log('test component before mount');

})
// export const dialogMethods: IOptionDialog = { opening, closing }
</script>

<!-- <script lang="ts" setup></script> -->

<template>
    <div>aaaaa</div>
</template>