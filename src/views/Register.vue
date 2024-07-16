<template>
  <section>
    <div class="flex flex-col bg-black gap-4 p-10">
      <input type="text" v-model="name" />
      <input type="text" v-model="email" />
      <input type="text" v-model="password" />
      <button @click="register" class="p-4 bg-red-300">Sign Up</button>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'

const name = ref()
const email = ref()
const password = ref()
defineOptions({
  name: 'RegisterPage'
})

function register() {
  localStorage.setItem(
    'user',
    JSON.stringify({
      username: name.value,
      email: email.value,
      password: password.value
    })
  )
}
</script>

<style></style>
