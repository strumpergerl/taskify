<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Taskify Group</q-toolbar-title>
        <q-space />
        <q-btn flat round icon="notifications" />
        <q-avatar size="28px" class="q-ml-sm">
          <img :src="user?.photoURL || 'https://placehold.co/28x28'">
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Lebegő menü gomb (Bottom Sheet-et nyit) -->
    <q-page-sticky position="bottom-right" :offset="[16,16]">
      <q-btn round size="lg" color="primary" icon="menu" @click="openNav" />
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const $q = useQuasar()
const router = useRouter()
const auth = useAuthStore()

const user = computed(() => auth.user)
const isAdmin = computed(() => auth.role === 'admin')

function openNav () {
  const actions = [
    { label: 'Pool',   icon: 'group',   id: '/pool' },
    { label: 'Saját',  icon: 'checklist', id: '/my' },
    { label: 'Shop',   icon: 'store',   id: '/shop' },
    { label: 'Profil', icon: 'person',  id: '/profile' },
  ]
  if (isAdmin.value) {
    actions.push({ label: 'Admin', icon: 'admin_panel_settings', id: '/admin/tasks' })
  }

  $q.bottomSheet({
    message: 'Navigáció',
    grid: true, // szép, ikonrácsos megjelenítés
    actions
  }).onOk(action => {
    if (action?.id) router.push(action.id)
  })
}
</script>
