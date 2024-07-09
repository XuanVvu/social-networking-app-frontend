<script setup lang="ts"></script>

<template>
  <div class="bg-white border rounded-lg p-4 shadow-md max-w-xl mx-auto">
    <div class="flex items-center mb-4">
      <img
        class="w-10 h-10 rounded-full mr-4"
        src="https://cdn.kwork.com/pics/t3/23/23861753-1669731023.jpg"
        alt="Profile Picture"
      />
      <textarea
        type="text"
        placeholder="What's on your mind?"
        class="flex-1 border rounded px-4 py-2 focus:outline-none"
      />
    </div>
    <div class="flex justify-around text-gray-600">
      <button class="flex items-center space-x-1 hover:text-gray-900">
        <span class="text-red-500"><i class="fas fa-video"></i></span>
        <span>Live Video</span>
      </button>
      <button class="flex items-center space-x-1 hover:text-gray-900">
        <span class="text-green-500"><i class="fas fa-image"></i></span>
        <span>Photo/Video</span>
      </button>
      <button class="flex items-center space-x-1 hover:text-gray-900">
        <span class="text-orange-500"><i class="fas fa-smile"></i></span>
        <span>Feeling/Activity</span>
      </button>
    </div>
  </div>
</template>
<style scoped></style>
