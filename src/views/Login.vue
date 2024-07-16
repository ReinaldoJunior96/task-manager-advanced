<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="email" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
defineOptions({
  name: 'LoginPage'
})
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('pp@gmail.com')
const password = ref('321')
const router = useRouter()

function generateToken() {
  return Math.random().toString(36).substr(2)
}

function login() {
  let storedUsers = JSON.parse(localStorage.getItem('user')) || []

  if (storedUsers.email === email.value && storedUsers.password === password.value) {
    const token = generateToken()
    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpiry', Date.now() + 15 * 60 * 1000) // 15 minutos

    window.location.href = '/home'
  } else {
    alert('Invalid credentials')
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
