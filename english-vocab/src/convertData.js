const fs = require('fs')
const d = fs.readFileSync('most-used-en-words.json')
const data = JSON.parse(d)
async function getData(word){
    try{
    const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20230915T100637Z.457a13a8a6b1d405.e1b1cbc1c9f4ad45ab67a41b2de87321f505e35c&lang=en-ru&text=${word}`)
    let json = await response.json()
    const wordData = json['def'][0]['tr'][0]
    const text = wordData['text']
    const means = wordData.mean === undefined || !Array.isArray(wordData.mean)? [] : wordData.mean.map(val => val.text)
        console.log(json)
        return {text, means}
    }catch (e) {
        console.error(e)
    }
}
//getData('hello').then(console.log)
/*for(let word in dataResult){
    //getData(word).then(val => res.push(res))
}*/
async function translateData(){
    const iterations = Math.floor(data.length / 100)
    const res = {}
    for(let i = 0; i<=iterations; i++){

        const tempData = data.slice(i*100, i*100+100-1)
        for(let v of tempData){
            const arr = JSON.parse(fs.readFileSync('en-ru.json'))
            const data = await getData(v)
            arr[v] = data
            fs.writeFileSync('en-ru.json', JSON.stringify(arr))
        }
        console.log('Get iteration', i*100, i*100+100-1, tempData.length)
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
//translateData()
//fs.writeFileSync('en-ru.json', JSON.stringify(dataResult))
const arr = JSON.parse(fs.readFileSync('en-ru.json'))
console.log(Object.keys(arr).length)