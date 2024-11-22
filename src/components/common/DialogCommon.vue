<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const visible = ref(false);
const dialogRef = ref<HTMLDivElement | null>(null)

// export const method = {
//     opening() {
//         visible.value = true;
//     },
//     closing() {
//         visible.value = false;
//     },
//     getElDialog() {
//         return dialogRef.value
//     }
// }

onMounted(() => {
    console.log(dialogRef);

})

</script>
<template>
    <el-dialog ref="dialogRef" v-model="visible">
        123
    </el-dialog>
</template>