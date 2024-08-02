<script lang="ts" setup>
import Notification from "@/components/notifications/Notification.vue"
import { ref } from 'vue'
const drawer = ref(false)
const openDrawer = () => {
    drawer.value = true
}

defineExpose({
    openDrawer
})

</script>
<template>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <div class="py-4">
            <h1 class="text-[40px] font-bold pb-4">Thông báo</h1>
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
        </div>
    </el-drawer>
</template>