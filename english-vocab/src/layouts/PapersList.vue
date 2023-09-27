<template>
  <div class="start-page-container">
    <div class="header">
      Выберите билет:
    </div>
    <div class="papers-select-container">
      <ButtonGroupSelect :count-buttons="20" @click="onClick"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useQuasar} from "quasar";
import ButtonGroupSelect from "@/components/ButtonGroupSelect.vue";
import {useRouter} from "vue-router";
const router = useRouter()
function onClick(button: number): void{
  router.push(`/paper/${button}`)
}


const $q = useQuasar()



</script>

<style scoped lang="scss">
.start-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .papers-select-container{
    padding: 4em;
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }

  .header {
    font-size: 5em;
    text-align: center;

  }

}

</style>