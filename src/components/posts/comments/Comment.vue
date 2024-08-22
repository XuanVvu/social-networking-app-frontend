<script lang="ts" setup>
import { MoreFilled } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import DateTime from '@/components/common/DateTime.vue'
import callApi from '@/services/api'

const isHover = ref(false)

const currentUser = localStorage.getItem('currentUser')
const currentUserId = JSON.parse(currentUser as any).id

const { data } = defineProps<{ data: any }>()
const emit = defineEmits(['deleteCommentFromChild', 'updateCommentFromChild'])

const deleteComment = () => {
  emit('deleteCommentFromChild')
}

const updateComment = () => {
  emit('updateCommentFromChild', data.id)
}

const setHover = (value: boolean) => {
  isHover.value = value
}

const isHiddenCommentSettings = () => {
  console.log(currentUserId !== data.author.id)

  return currentUserId !== data.author.id
}
</script>
<template>
  <div
    class="flex items-start space-x-3"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <el-avatar class="w-[32px] h-[32px] mt-[8px]"> user </el-avatar>
    <div class="flex-1">
      <p class="font-semibold text-black">
        {{ data.author.firstName + ' ' + data.author.lastName }}
      </p>
      <p class="pb-1 text-sm">
        {{ data.content }}
      </p>

      <div class="flex justify-between">
        <div class="text-xs">
          <DateTime :time="data.createdAt" />
        </div>
        <el-dropdown class="" trigger="click" :hidden="currentUserId !== data.author.id">
          <MoreFilled class="w-[15px] cursor-pointer outline-none" @click="setHover(true)" />
          <template #dropdown>
            <el-dropdown-menu class="w-[200px] flex items-center">
              <el-dropdown-item class="w-full" @click="updateComment">Edit</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu class="w-[200px] flex items-center">
              <el-dropdown-item class="w-full text-red-500" @click="deleteComment"
                >Delete</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
