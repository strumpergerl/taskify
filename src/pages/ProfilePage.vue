<template>
  <q-page padding>
    <div class="text-h6 q-mb-sm">Profil</div>
    <q-card>
      <q-card-section>
        <div class="text-subtitle1">{{ user?.displayName || 'Vendég' }}</div>
        <div class="text-caption">{{ user?.email }}</div>
      </q-card-section>
      <q-card-actions>
        <q-btn v-if="!isLoggedIn" label="Belépés Google-lal" icon="login" @click="signIn" />
        <q-btn v-else label="Kilépés" icon="logout" flat @click="signOut" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const user = computed(()=> auth.user)
const isLoggedIn = computed(()=> auth.isLoggedIn)
function signIn(){ auth.signInWithGoogle() }
function signOut(){ auth.signOut() }
</script>
