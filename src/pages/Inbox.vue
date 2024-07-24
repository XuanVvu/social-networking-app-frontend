<script lang="ts" setup>
import Messages from "@/components/messages/Messages.vue"
import Sidebar from "@/components/messages/Sidebar.vue"
</script>

<template>
    <div class="flex">
        <Sidebar />
        <div class="flex-1">

            <Messages />
        </div>
    </div>
</template>
