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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

function generateToken() {
  return Math.random().toString(36).substr(2)
}

function login() {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || []

  const user = storedUsers.find(
    (user) => user.email === email.value && user.password === password.value
  )

  if (user) {
    const token = generateToken()
    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpiry', Date.now() + 15 * 60 * 1000) // 15 minutos
    localStorage.setItem('loggedInUser', email.value)

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
