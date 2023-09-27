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
        another word, pelmen, hacahpuri
      </div>
      <div class="answer-container">
        <q-btn  push class="answer" v-for="word in data">{{ word }}</q-btn>
<!--        <div class="first-answer text-center answer">Word 1</div>
        <div class="second-answer text-center answer">Word 2</div>
        <div class="third-answer text-center answer">Word 3</div>
        <div class="fourth-answer text-center answer">Word45464564564</div>-->
      </div>
    </div>
<!--    <q-btn @click="$q.dark.toggle()">Hi</q-btn>-->

</template>

<script setup lang='ts'>
import {ref} from "vue";
import {createStyledLettersArray} from "@/utils/stringUtils";

const props = defineProps({
  paperNumber: {
    type: Number,
    required: true
  }
})
const word = 'highlanderb'
const useCaseForLetters = false



const styledLetters: styledLetter[] = createStyledLettersArray(word)
const data = ref(['Word 1', 'Word12312', 'wOR', 'Word1243235235'])
import {useQuasar} from "quasar";
import {styledLetter} from "@/types/types";

const $q = useQuasar()
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
    width: 100%;
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