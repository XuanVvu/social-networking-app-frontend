<script lang="ts" setup>
import { computed } from 'vue';


const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])


const dialogStatus = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})


const cancelDialog = () => {
    emit('update:modelValue', false)

}

const submitDialog = () => {
    emit('update:modelValue', false)

} 
</script>
<template>
    <el-dialog v-model="dialogStatus" title="Warning" width="30%" align-center>
        <span>Open the dialog from the center from the screen</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancelDialog">Cancel</el-button>
                <el-button type="primary" @click="submitDialog">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>

</template>