<script lang="ts" setup>
import { ref } from 'vue'
import ImageBox from './ImageBox.vue'

const { data } = defineProps<{ data: any }>()
const isOpenImageDetail = ref(false)
const imgUrl = ref()
const clickImage = (url: any) => {
  isOpenImageDetail.value = true
  imgUrl.value = url
}
</script>

<template>
  <div style="min-height: calc(100vh - 395px)">
    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="item of data"
        class="cursor-pointer hover:opacity-90"
        @click="clickImage(item.url)"
      >
        <ImageBox :url="item.url" />
      </div>
    </div>
    <el-empty v-if="data.length === 0" description="Chưa có ảnh" />
  </div>

  <el-dialog v-model="isOpenImageDetail" class="h-[90vh] w-[80vw] p-0 image-detail" align-center>
    <div class="flex items-center bg-black h-full">
      <img
        class="object-contain p-2 w-full h-full"
        :src="`http://localhost:3000${imgUrl}`"
        alt="Post Image"
      />
    </div>
  </el-dialog>
</template>

<style>
.image-detail header {
  display: none;
}
</style>
