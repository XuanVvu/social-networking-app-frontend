<script lang="ts" setup>
import { showError, visible, errorMessage, handleClose } from '@/utils/errorHandler';

</script>
<template>
<el-dialog
    v-model="visible"
    title="Error"
    width="50%"
    align-center
    class="rounded-lg p-8"
  >
    <span class="my-8">{{ errorMessage }}</span>
    <template #footer>
      <span class="dialog-footer">
        <Button @click="handleClose"> Ok </Button>
      </span>
    </template>
  </el-dialog>

</template>
