<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {useDataStore} from "@/stores/store";
import {useQuasar} from "quasar";
const store = useDataStore()
store.loadData()
window.q = useQuasar()
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
