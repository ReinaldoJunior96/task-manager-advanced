<template>
  <div class="notification">
    <span>{{ notification.message }}</span>
    <button @click="$emit('close', notification.id)">Close</button>
  </div>
</template>

<script setup>
defineProps(['notification'])
</script>

<style scoped>
.notification {
  background-color: #f8d7da;
  border: 1px solid #f5c2c7;
  color: #842029;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.notification button {
  background: none;
  border: none;
  color: #842029;
  cursor: pointer;
}
</style>
