<script lang="ts" setup>
import Header from '@/layouts/header/Header.vue'
import Footer from '@/layouts/footer/Footer.vue'
import Sidebar from '@/components/common/Sidebar.vue'
</script>
<template>
  <Header />
  <div class="flex pt-[110px] bg-[#fbfcfe]">
    <Sidebar />
    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>
