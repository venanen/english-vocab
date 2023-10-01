<template>
  <main-layout class="all-layout">
    <div class="layout-center">


    <div class="all-question-container">
      <div class="status">Вопрос: {{ currentQuestionAll+1 }}/{{ dataLength }}
        <span class="text-positive"> Верно: {{ truthQuestionAll.length }};</span>
        <span class="text-negative">Неверно: {{ falsyQuestionAll.length }}.</span>
        <q-space/>
        <div class="go-to-question-text"  v-if="!goToQuestionShow">
          <q-btn push @click="goToQuestionShow = true">Перейти к вопросу</q-btn>
        </div>
        <q-input dense outlined hide-hint v-model="goToQuestionModel" class="go-to-question" label="Номер вопроса" v-else>
          <template v-slot:append>
            <q-btn round dense flat icon="mdi-close" @click="goToQuestionShow = false" />
            <q-btn round dense flat icon="mdi-check" @click="goToQuestion" />

          </template>
        </q-input>
      </div>
      <div class="paper">
        <Paper :answers-array="answersArray"
               :truth-answer="truthAnswer"
               :word="word"
               :means="means"
               @answer="onAnswer"/>
        <div class="next-btn">
          <q-btn round color="primary" icon="mdi-chevron-right" size="xl" v-if="showNextBtn" @click="nextQuestion"/>
        </div>
      </div>
    </div>
    </div>
  </main-layout>
</template>
<script setup lang="ts">

import MainLayout from "@/layout/MainLayout.vue";
import {useDataStore} from "@/stores/store";
import {useRouter} from "vue-router";
import {ref} from "vue";
import type {Ref} from "vue"
import {questionPayload} from "@/types/types";
import {storeToRefs} from "pinia";
import Paper from "@/components/Paper.vue";
import {onMounted} from "vue";


const store = useDataStore()
const router = useRouter()
const {getWordByPaperAndQuestion, dataLength} = store
const word: Ref<string> = ref('')
const answersArray: Ref<string[]> = ref([])
const truthAnswer: Ref<number> = ref(0)
const means: Ref<string[] | undefined> = ref([])
const showNextBtn = ref(false)

const goToQuestionShow = ref(false)

const goToQuestionModel = ref('')

const {currentQuestionAll, truthQuestionAll, falsyQuestionAll} = storeToRefs(store)



function onAnswer({isTruthAnswer, truthAnswer, realAnswer}: { isTruthAnswer: boolean, truthAnswer: string, realAnswer: string }): void {
  if(isTruthAnswer){
    truthQuestionAll.value.push({word: word.value, truthAnswer})
  }else{
    falsyQuestionAll.value.push({word: word.value, truthAnswer, realAnswer})
  }
  showNextBtn.value = true
}
function nextQuestion(){
  currentQuestionAll.value++
  loadWord()
  showNextBtn.value = false
  store.saveData()
}
function loadWord() {
  const resultObj: questionPayload = getWordByPaperAndQuestion(0, currentQuestionAll.value)
  word.value = resultObj.word
  answersArray.value = resultObj.answersArray
  truthAnswer.value = resultObj.truthAnswer
  means.value = resultObj.means
}
function goToQuestion(){
  currentQuestionAll.value = Number(goToQuestionModel.value)
  goToQuestionShow.value = false
  loadWord()
  showNextBtn.value = false
  store.saveData()
}
onMounted(()=>{
  loadWord()
})

</script>
<style scoped lang="scss">
.layout-center{
  display: flex;
  justify-content: center;
}
.status{
  font-size: 1.4em;
  display: flex;
  align-items: center;
}
.go-to-question{

}
@media screen and (min-width: 1024px) {
  .all-question-container {
    width: 40vw;
  }
}
.next-btn {
  display: flex;
  justify-content: end;
  padding: 0 3em;
}
</style>