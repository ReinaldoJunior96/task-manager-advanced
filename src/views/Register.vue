<template>
  <section>
    <div class="flex flex-col bg-black gap-4 p-10">
      <input type="text" v-model="name" placeholder="Name" />
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="register" class="p-4 bg-red-300">Sign Up</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

defineOptions({
  name: 'RegisterPage'
})

function register() {
  // Recupera a lista de usuários existente ou inicializa uma nova lista
  let users = JSON.parse(localStorage.getItem('users')) || []

  // Adiciona o novo usuário à lista
  users.push({
    username: name.value,
    email: email.value,
    password: password.value
  })

  // Salva a lista atualizada de volta no localStorage
  localStorage.setItem('users', JSON.stringify(users))

  // Limpa os campos de entrada
  name.value = ''
  email.value = ''
  password.value = ''
}
</script>

<style>
/* Adicione seus estilos aqui, se necessário */
</style>
