<template>
  <div class="home-container">
    <h1>Welcome, {{ username }}</h1>
    <button @click="logout">Logout</button>
    <section>
      <TaskComponentVue />
    </section>
  </div>
</template>

<script setup>
import TaskComponentVue from '@/components/TaskComponent.vue'
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'HomePage'
})

const username = ref('')
const token = ref(null)
let tokenRenewalInterval = null

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiry')
  clearInterval(tokenRenewalInterval)
  window.location.href = '/'
  // router.push({ name: 'login' })
}

function generateToken() {
  return Math.random().toString(36).substr(2)
}

function renewToken() {
  token.value = generateToken()
  localStorage.setItem('token', token)
  localStorage.setItem('tokenExpiry', Date.now() + 15 * 60 * 1000)
}

function checkToken() {
  const tokenExpiry = localStorage.getItem('tokenExpiry')
  if (token.value !== null || !tokenExpiry || Date.now() > tokenExpiry) {
    logout()
  } else {
    tokenRenewalInterval = setInterval(renewToken, 15 * 60 * 1000)
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []
    const loggedUser = localStorage.getItem('loggedInUser')
    const user = storedUsers.find((user) => user.email === loggedUser)
    token.value = localStorage.getItem('token')
    if (storedUsers) {
      username.value = user.username
    } else {
      logout()
    }
  }
}

onMounted(() => {
  checkToken()
})

onUnmounted(() => {
  clearInterval(tokenRenewalInterval)
})
</script>

<style scoped>
.home-container {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}
</style>
