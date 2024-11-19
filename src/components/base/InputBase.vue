<script setup lang="ts">
import { Component, computed } from 'vue'

const props = defineProps<{
  modelValue: string
  icon?: Component
  type?: string
  placeholder: string
}>()
const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const isPasswordType = computed(() => props.type === 'password')
</script>

<template>
  <el-input
    :type="type ? type : 'text'"
    :placeholder="placeholder"
    :prefix-icon="props.icon"
    v-model="inputValue"
    size="large"
    v-bind="isPasswordType ? { 'show-password': true } : {}"
  />
</template>

<style lang="scss">
.el-form-item--default .el-form-item__error {
  padding-top: 5px !important;
}

.el-input .el-input__wrapper {
  padding: 5px 15px;
}
</style>
