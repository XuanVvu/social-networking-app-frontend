<script lang="ts" setup>
const { roleFriend } = defineProps<{ roleFriend: number }>()

</script>

<template>
    <div class="bg-white border p-5 rounded-lg flex flex-col items-center justify-center gap-4 w-[240px]">
        <img src="" alt="" class="w-[190px] h-[230px] bg-black">
        <div>User name</div>
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
</template>