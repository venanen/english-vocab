<template>
  <div class="start-page-container">
    <div class="header">
      Welcome!
    </div>
    <div class="button-container">
      <router-link to="/papers">
        <q-btn size="xl" color="primary" class="button mr-3"  push>Билеты</q-btn>
      </router-link>
      <router-link to="/all">
        <q-btn size="xl" color="secondary" class="button" push>Все подряд</q-btn>
      </router-link>
    </div>
  </div>

</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.start-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;


  .header {
    font-size: 5em;
    text-align: center;

  }

  .button-container {
    .button {
      margin: 20px 20px;
    }
  }
}
</style>