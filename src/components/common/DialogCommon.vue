<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

const refSlot = ref()
const visible = ref(true);
const emit = defineEmits(['close']);
watch(visible, () => {
    emit('close');

})

onMounted(() => {
    console.log('test common');

})

</script>
<template>
    <el-dialog v-model="visible">
        <slot ref="refSlot" />
    </el-dialog>
</template>