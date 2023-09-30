<template>
  <div class="btn-select">
    <q-btn v-for="(index, button) in props.countButtons" :color="getBtnColor(button)"
           @click="onClick(button)"
           :disable="stepper && button > currentStep"
           :class="{'button': true, currentStep: stepper && currentStep===button}">{{ button+1 }}</q-btn>
  </div>
</template>

<script setup lang='ts'>
  import {defineStore} from "pinia";

  const props = defineProps({
    countButtons: {
      type: Number,
      required: true
    },
    greenButton: {
      type: Set,
      default: new Set([])
    },
    redButton: {
      type: Set,
      default: new Set([])
    },
    blueButton: {
      type: Set,
      default: new Set([])
    },
    stepper: {
      type: Boolean,
      default: false
    },
    currentStep: {
      type: Number,
      default: -1
    }
  })
  const emit = defineEmits(['click'])
  function onClick(button: number): void{
    emit('click', button)
  }
  function getBtnColor(btn: number): string|undefined{
    if(props.currentStep === btn){
      return 'primary'
    }
    if(props.greenButton.has(btn)){
      return 'positive'
    }
    if(props.redButton.has(btn)){
      return 'negative'
    }
    if(props.blueButton.has(btn)){
      return 'primary'
    }
    return undefined
  }
</script>

<style scoped lang='scss'>
.button{
  margin: 5px;
}
.btn-select{
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
}
</style>