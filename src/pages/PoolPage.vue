<template>
  <q-page padding>
    <div class="text-h6 q-mb-sm">Pool</div>
    <q-banner class="q-mb-md" dense>
      Itt jelennek meg a csoport közös feladatai (felvehető/claim).
    </q-banner>
    <q-input v-model="q" outlined dense placeholder="Keresés…" class="q-mb-sm" />
    <q-list bordered separator>
      <q-item v-for="i in 3" :key="i">
        <q-item-section>Demo task #{{ i }}</q-item-section>
        <q-item-section side>
          <q-btn dense unelevated icon="download" label="Felveszem" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
    import { ref } from 'vue'
    const q = ref('')
</script>
