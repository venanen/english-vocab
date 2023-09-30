<template>
    <div class="paper-container">
      <div class="word text-center">
        <div v-for="letter in styledLetters"

             :data-color="letter.color"
             :data-capitalize="letter.isCapitalize"
             :data-token="letter.token"
        >
          <div class="letter" :class="{'letter-lowercase': !letter.isCapitalize && useCaseForLetters,  'letter-uppercase': letter.isCapitalize && useCaseForLetters,
              }"
          >{{letter.letter}}</div>
          <div class="border" :style="{'border-bottom': `20px solid ${letter.color}`}"></div>

        </div>
      </div>
      <div class="means text-center">
        {{ means.join(', ') }}
      </div>
      <div class="answer-container">
        <q-btn  push class="answer" :color="getBtnColor(key)" v-for="( word, key) in answersArray" @click="answer(key)">{{ word }}</q-btn>
<!--        <div class="first-answer text-center answer">Word 1</div>
        <div class="second-answer text-center answer">Word 2</div>
        <div class="third-answer text-center answer">Word 3</div>
        <div class="fourth-answer text-center answer">Word45464564564</div>-->
      </div>
    </div>
<!--    <q-btn @click="$q.dark.toggle()">Hi</q-btn>-->

</template>

<script setup lang='ts'>
import {ref, watch} from "vue";
import {createStyledLettersArray} from "@/utils/stringUtils";
import {useQuasar} from "quasar";
import {styledLetter} from "@/types/types";
const props = defineProps({
  word: {
    type: String,
    required: true
  },
  answersArray: {
    type: Array,
    required: true
  },
  means: {
    type: Array,
    default: []
  },
  truthAnswer: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['answer'])
const useCaseForLetters = false
const redButton = ref(5)
const greenButton = ref(5)
function answer(button: number): void{
  if(button ===  <number>props.truthAnswer){
    greenButton.value = button
  }else{
    redButton.value = button
    greenButton.value = <number>props.truthAnswer
  }
  emit('answer', {
    isTruthAnswer: button ===  <number>props.truthAnswer,
    truthAnswer: props.answersArray?.[props.truthAnswer],
    realAnswer: props.answersArray?.[button]
  })
}
function getBtnColor(btn: number): string|undefined{
  if(btn === greenButton.value){
    return 'positive'
  }
  if(btn === redButton.value){
    return 'negative'
  }
  return undefined
}

const styledLetters = ref(createStyledLettersArray(props.word))
const data = ref(['Word 1', 'Word12312', 'wOR', 'Word1243235235'])
watch(props, ()=>{
  console.log('Trgger word')
  styledLetters.value = createStyledLettersArray(props.word)
  redButton.value = 5
  greenButton.value = 5
})
</script>

<style scoped lang='scss'>
$letter-size: 5em;
.letter{
  font-weight: 300;
  font-size: $letter-size;
}
.letter-lowercase{
  text-transform: lowercase;
}
.letter-uppercase{
  text-transform: uppercase;
}
.word{

  line-height: 1;
  display: flex;
  justify-content: center;
}
.means{
  opacity: 0.7;
}
.answer{
  font-size: 1em;
  margin: 10px;
  transition: 0.7s !important;
}
@media screen  and (max-width: 1024px){
  .answer-container {
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
      "first-answer"
      "second-answer"
      "third-answer"
      "fourth-answer";
  }
  .answer{

  }
}
@media screen  and (min-width: 1023px){
  .answer-container {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "first-answer second-answer"
      "third-answer fourth-answer";
    margin-top: 50px;
  }
}
.answer-container {
  display: grid;
  gap: 0 0;
  margin-top: 20px;
}
.first-answer { grid-area: first-answer; }
.second-answer { grid-area: second-answer; }
.third-answer { grid-area: third-answer; }
.fourth-answer { grid-area: fourth-answer; }

</style>