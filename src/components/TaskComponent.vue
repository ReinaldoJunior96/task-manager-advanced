<template>
  <section class="flex flex-col gap-6">
    <!-- Input para adicionar novas tarefas -->
    <div class="flex items-center justify-between gap-6">
      <input class="bg-blue-100" type="text" v-model="newTask" placeholder="Enter new task" />
      <input class="bg-blue-100" type="datetime-local" v-model="newTaskDeadline" />
      <button @click="addTask" class="p-2 bg-green-300">New</button>
    </div>

    <!-- Campo de busca -->
    <div class="flex items-center justify-between gap-6">
      <input class="bg-blue-100" type="text" v-model="searchQuery" placeholder="Search tasks" />
    </div>

    <!-- Filtros para exibir todas, completas ou incompletas -->
    <div class="flex gap-4">
      <button @click="setFilter('all')" :class="{ 'bg-blue-200': filter === 'all' }">All</button>
      <button @click="setFilter('completed')" :class="{ 'bg-blue-200': filter === 'completed' }">
        Completed
      </button>
      <button @click="setFilter('incomplete')" :class="{ 'bg-blue-200': filter === 'incomplete' }">
        Incomplete
      </button>
    </div>

    <!-- Lista de tarefas filtradas -->
    <div
      v-for="(task, index) in filteredTasks"
      :key="index"
      class="flex items-center justify-between gap-6"
    >
      <input type="checkbox" v-model="task.completed" @change="saveTasks" />
      <div class="flex-1">
        <span
          v-if="!task.editing"
          @click="editTask(index)"
          :class="{ 'line-through': task.completed }"
          >{{ task.task }}</span
        >
        <input
          v-else
          type="text"
          v-model="task.task"
          @blur="saveEdit(task)"
          @keyup.enter="saveEdit(task)"
        />
      </div>
      <span>{{ task.deadline }}</span>
      <button @click="removeTask(index)" class="p-2 bg-red-300">Delete</button>
    </div>

    <!-- Notificações personalizadas -->
    <div class="notifications-container">
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @close="removeNotification(notification.id)"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Notification from './Notification.vue'

const newTask = ref('')
const newTaskDeadline = ref('')
const tasks = ref([])
const filter = ref('all')
const searchQuery = ref('')
const notifications = ref([])
const loggedInUser = ref('')
let notificationInterval = null

// Computed property para filtrar as tarefas com base no filtro atual e na busca
const filteredTasks = computed(() => {
  let filtered = tasks.value

  if (filter.value === 'completed') {
    filtered = filtered.filter((task) => task.completed)
  } else if (filter.value === 'incomplete') {
    filtered = filtered.filter((task) => !task.completed)
  }

  if (searchQuery.value.trim() !== '') {
    filtered = filtered.filter((task) =>
      task.task.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

// Função para iniciar o intervalo de verificação das notificações
function startNotificationCheck() {
  if (notificationInterval) {
    clearInterval(notificationInterval)
  }
  notificationInterval = setInterval(checkDeadlines, 1000) // Verificar a cada minuto
}

// Função para verificar os prazos das tarefas
function checkDeadlines() {
  const now = new Date().getTime()
  tasks.value.forEach((task) => {
    if (!task.completed) {
      const taskDeadline = new Date(task.deadline).getTime()
      const timeDifference = taskDeadline - now
      if (timeDifference > 0 && timeDifference <= 5 * 60 * 1000) {
        // 5 minutos
        addNotification(task.task)
      }
    }
  })
}

// Função para adicionar uma notificação
function addNotification(taskName) {
  console.log('aaa')
  const id = Date.now()
  notifications.value.push({
    id,
    message: `The task "${taskName}" is due in less than 5 minutes!`
  })
}

// Função para remover uma notificação
function removeNotification(id) {
  notifications.value = notifications.value.filter((notification) => notification.id !== id)
}

function loadTasks() {
  const userEmail = localStorage.getItem('loggedInUser')
  loggedInUser.value = userEmail
  tasks.value = JSON.parse(localStorage.getItem(`tasks_${userEmail}`)) || []
}

function saveTasks() {
  if (loggedInUser.value) {
    localStorage.setItem(`tasks_${loggedInUser.value}`, JSON.stringify(tasks.value))
  }
}

function addTask() {
  if (newTask.value.trim() !== '' && newTaskDeadline.value.trim() !== '') {
    tasks.value.push({
      task: newTask.value,
      deadline: newTaskDeadline.value,
      editing: false,
      completed: false
    })
    newTask.value = ''
    newTaskDeadline.value = ''
    saveTasks()
  }
}

function removeTask(index) {
  tasks.value.splice(index, 1)
  saveTasks()
}

function editTask(index) {
  tasks.value[index].editing = true
}

function saveEdit(task) {
  task.editing = false
  saveTasks()
}

function setFilter(newFilter) {
  filter.value = newFilter
}

onMounted(() => {
  loadTasks()
  startNotificationCheck()
})

onUnmounted(() => {
  if (notificationInterval) {
    clearInterval(notificationInterval)
  }
})
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
.bg-blue-200 {
  background-color: #bfdbfe;
}
.notifications-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
