<template>
  <q-btn v-for="button in props.countButtons" :color="getBtnColor(button)" @click="onClick(button)" class="button">{{ button }}</q-btn>
</template>

<script setup lang='ts'>
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
  })
  const emit = defineEmits(['click'])
  function onClick(button: number): void{
    emit('click', button)
  }
  function getBtnColor(btn: number): string|undefined{
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
</style>