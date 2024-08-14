<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { TabsPaneContext } from 'element-plus/es/components/tabs/src/constants'
import { useRoute } from 'vue-router'
import useNavigation from '@/composables/useNavigation';

const route = useRoute()
const roleFriend = ref(2)
const { navigateTo } = useNavigation()
const activeName = ref('')
const handleClick = (tab: TabsPaneContext) => {
  switch (tab.props.name) {
    case 'first':
      navigateTo('/profile/posts')
      break
    case 'second':
      activeName.value = 'second'
      navigateTo('/profile/images')
      break
    case 'third':
      activeName.value = 'third'
      navigateTo('/profile/friends')

      break
    default:
      break
  }
}

onMounted(() => {
  switch (route.name) {
    case 'Posts':
      activeName.value = 'first'
      break;
    case 'Images':
      activeName.value = 'second'
      break;
    case 'ProfileFriends':
      activeName.value = 'third'
      break;
  }
})



</script>
<template>
  <div class="flex bg-white justify-center gap-[100px] py-[30px]">
    <div class="bg-black w-[200px] h-[200px] rounded-full">
      <img src="" alt="" />
    </div>

    <div class="max-w-[30%]">
      <div class="flex justify-between pb-5">
        <h3 class="font-bold text-xl">xuanvu03_07</h3>
        <span class="text-lg">2 bài viết </span>
      </div>
      <div class="font-bold text-xl">Về tôi</div>
      <div class="mb-5">
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit ab maiores repellat fuga
          quasi facilis libero a? Fugit, fugiat ducimus.</span>

      </div>
      <div class="text-white font-semibold">
        <button class=" bg-blue-600 px-5 py-2 rounded-2xl" v-if="roleFriend === 0">
          Kết bạn

        </button>
        <button class=" bg-slate-600 px-5 py-2 rounded-2xl" v-if="roleFriend === 1">
          Chấp nhận

        </button>
        <button class=" bg-red-600 px-5 py-2 rounded-2xl" v-if="roleFriend === 2">
          Gỡ kết bạn

        </button>

      </div>
    </div>
  </div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Bài viết" name="first">
      <router-view></router-view>
    </el-tab-pane>
    <el-tab-pane label="Ảnh" name="second">
      <div class="w-[1000px]">

        <router-view></router-view>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Bạn bè" name="third">
      <div class="w-[1000px]">
        <router-view></router-view>

      </div>
    </el-tab-pane>

  </el-tabs>
</template>

<style>
.el-tabs {
  display: block;
}

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
  content: '';
  height: 2px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: var(--el-index-normal);
}

.el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}

.el-tabs__content {
  display: flex;
  justify-content: center;
}

.el-tabs__item {
  padding-top: 18px;
  font-size: 16px;
}
</style>
