<script lang="ts" setup>
import Header from '@/layouts/header/Header.vue'
import Sidebar from '@/components/common/Sidebar.vue'
import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';

const route = useRoute();

const hideSidebarList = ['Inbox'];
const isHideSidebar = ref(false);

watchEffect(() => {
  isHideSidebar.value = hideSidebarList.includes(route.name as string);
})

</script>
<template>
  <Header />
  <div class="flex pt-[80px] bg-[#fbfcfe]">
    <Sidebar v-if="!isHideSidebar"/>
    <div :class="`flex-1 ${!isHideSidebar ? 'ms-72' :  ''}`">
      <router-view></router-view>
    </div>
  </div>
</template>
