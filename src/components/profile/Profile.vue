<script lang="ts" setup>
import { ref } from 'vue';
import ListPosts from "@/components/profile/ListPosts.vue"
import ProfileImage from "@/components/profile/ProfileImage.vue"
import FriendList from "@/components/friends/FriendList.vue"

const activeName = ref('first')

</script>
<template>
  <div class="flex bg-white justify-center gap-[100px] py-[30px]">
    <div class="bg-black w-[100px] h-[100px] rounded-full">
      <img src="" alt="" />
    </div>

    <div class="max-w-[30%]">
      <div>
        <h3>xuanvu03_07</h3>
      </div>
      <div class="flex flex-col ">
        <span>2 bài viết </span>
        <div class="font-bold">Về tôi</div>
        <span class="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit ab maiores repellat fuga quasi
          facilis libero a? Fugit, fugiat ducimus.</span>
      </div>
    </div>

  </div>
  <el-tabs v-model="activeName" class="demo-tabs">
    <div class="w-[1000px]">
      <el-tab-pane label="Bài viết" name="first">
        <ListPosts />
      </el-tab-pane>
      <el-tab-pane label="Ảnh" name="second">
        <ProfileImage />
      </el-tab-pane>
      <el-tab-pane label="Bạn bè" name="third">
        <FriendList :itemPerLine=4 />
      </el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </div>
  </el-tabs>
</template>

<style>
.el-tabs__active-bar {
  top: 0;
}

.el-tabs__nav-wrap::after {
  display: none !important;
}

.el-tabs__nav-wrap::before {
  display: block;
  background-color: var(--el-border-color-light);
  top: 0;
  content: "";
  height: 2px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: var(--el-index-normal);
}

.el-tabs__nav-scroll {
  display: flex;
  justify-content: center
}

.el-tabs__content {
  display: flex;
  justify-content: center;
}
</style>
