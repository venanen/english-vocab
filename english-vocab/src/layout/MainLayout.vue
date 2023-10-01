<template>
  <div class="main-layout-container">
    <q-bar dark class="bg-primary">
      <q-btn dense flat  icon="mdi-home" class="text-white" to="/"></q-btn>
      <RouterLink  to="/papers" custom v-slot="{ navigate }">
        <div @click="navigate" class="cursor-pointer text-white">
          Билеты
        </div>
      </RouterLink>
      <RouterLink  to="/all" custom v-slot="{ navigate }">
        <div @click="navigate" class="cursor-pointer text-white">
          Все подряд
        </div>
      </RouterLink>

      <q-space/>
      <q-btn dense flat  icon="mdi-lightbulb-outline" class="text-white" @click="quasar.dark.toggle()"></q-btn>
    </q-bar>
    <div class="main-layout">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useQuasar} from "quasar";

const quasar = useQuasar()
</script>

<style scoped lang="scss">
.main-layout-container{

}
</style>