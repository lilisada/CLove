<script setup>
import { ref } from 'vue'

const currentStep = ref(0)
const showPopup = ref(true)
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped>
.router-container {
    width: 100% !important;
    height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;
}
</style>