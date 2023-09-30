import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {COUNT_QUESTION_IN_PAPER} from "@/config";
import type {questionPayload} from "@/types/types";

export const useDataStore = defineStore('store', ()=>{
    const dataJson = ref({})

    const currentPaper = ref(0)
    const currentQuestionInPaper = ref(0)
    const papersState = ref({})

    async function loadData(): Promise<object> {
/*        const cachedKeys = window.localStorage.keys().filter((val :string) => {
            return val.startsWith('dict_')
        })*/
        const defaultRuEnDict = `https://raw.githubusercontent.com/venanen/english-vocab/master/english-vocab/en-ru.json`
        const data = window.localStorage.getItem('dict_ru_en')
        if(data === null){
            const response = await fetch(defaultRuEnDict)
            let json = await response.json()
            const entries = Object.entries(json)
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
            const resObj = Object.fromEntries(entries)
            window.localStorage.setItem('dict_ru_en', JSON.stringify(resObj))
            dataJson.value = resObj
            return resObj
        }else{
            dataJson.value = JSON.parse(data)
            return JSON.parse(data)
        }
    }
    const getWordByPaperAndQuestion = computed(()=>{
        const paper = currentPaper.value
        const question = currentQuestionInPaper.value
        const startPaperQuestion: number = paper * COUNT_QUESTION_IN_PAPER
        const wordNumber = startPaperQuestion+question
        if(wordNumber > dataLength.value){
            throw new Error('Word index range error')
        }
        const entries = Object.entries(dataJson.value)
        const [answer, resObj] = entries[wordNumber]
        const {[answer]: q, ...anotherWords} = dataJson.value
        const answers =
            Object.values(anotherWords)
                .sort(()=> 0.5 - Math.random())
                .slice(0, 3)
                .map(({text}) => text)


        const truthResultPosition = answer.length % 4
        answers.splice(truthResultPosition, 0, resObj.text)
        const resultData = {
            word: answer,
            answersArray: answers,
            truthAnswer: truthResultPosition,
            means: resObj.means
        }
        console.log(answer, answers, truthResultPosition)
        return resultData
    })

    const getTruthAndFalsyAnswers = computed(()=>{
        const paper = currentPaper.value
        const question = currentQuestionInPaper.value
    })

    function saveAnswer(isTruthAnswer: boolean, trueAnswer: string, realAnswer: string){
        const paper = currentPaper.value
        const question = currentQuestionInPaper.value
        if(papersState.value[paper] instanceof Map){
            papersState.value[paper].set(question, {isTruthAnswer, trueAnswer, realAnswer})
        }else{
            papersState.value[paper] = new Map()
            papersState.value[paper].set(question, {isTruthAnswer, trueAnswer, realAnswer})
        }
    }

    const dataLength = computed(()=>{
        return Object.keys(dataJson.value)
    })
    return {dataJson, currentPaper, currentQuestionInPaper, papersState, loadData, getWordByPaperAndQuestion, saveAnswer}
})