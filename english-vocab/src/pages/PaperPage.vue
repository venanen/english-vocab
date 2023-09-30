<template>
  <div class="paper-container">
    <ButtonGroupSelect :count-buttons="COUNT_QUESTION_IN_PAPER"
                       stepper
                       :current-step="currentQuestionInPaper"
                       :green-button="truthAnswersSet"
                       :red-button="falsyAnswersSet"
    />
    <Paper :answers-array="getWordByPaperAndQuestion.answersArray"
           :truth-answer="getWordByPaperAndQuestion.truthAnswer"
           :word="getWordByPaperAndQuestion.word"
           :means="getWordByPaperAndQuestion.means"
           @answer="onAnswer"/>
    <div class="next-btn">
      <q-btn round color="primary" icon="mdi-chevron-right" size="xl" v-if="showNextBtn" @click="nextQuestion"/>
    </div>
  </div>
</template>

<script lang='ts' setup>
import ButtonGroupSelect from "@/components/ButtonGroupSelect.vue";
import Paper from "@/components/Paper.vue";
import {useDataStore} from "@/stores/store";
import {onMounted, ref, toRefs} from "vue";
import {COUNT_QUESTION_IN_PAPER} from "@/config";
import {storeToRefs} from "pinia";

const props = defineProps({
  paperNumber: {
    type: Number,
    required: true
  }
})
const store = useDataStore()
const {
  currentQuestionInPaper,
  getWordByPaperAndQuestion,
} = storeToRefs(store)
const showNextBtn = ref(false)
const truthAnswersSet = ref(new Set())
const falsyAnswersSet = ref(new Set())
function onAnswer({isTruthAnswer, truthAnswer, realAnswer}){
  showNextBtn.value = true
  store.saveAnswer(isTruthAnswer, truthAnswer, realAnswer)
  if(isTruthAnswer){
    truthAnswersSet.value.add(currentQuestionInPaper.value)
  }else{
    falsyAnswersSet.value.add(currentQuestionInPaper.value)
  }
}
function nextQuestion(){
  currentQuestionInPaper.value++
}
onMounted(()=>{
  store.currentPaper = <number>props.paperNumber
})
</script>

<style lang='scss' scoped>
.next-btn{
  display: flex;
  justify-content: end;
  padding: 0 3em;
}
</style>