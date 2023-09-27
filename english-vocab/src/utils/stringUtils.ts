import type {styledLetter} from "@/types/types";

export function generateStringToken(str: string) : number[]{
    const tokenArray: number[] = []
    const entropyMultiplier: number = 100// энтропия колебания для синусоиды
    for(let i = 0; i < str.length; i++){
        const periodValue = Math.round(
            (Math.sin(i+1) + 2) // всегда положительный синус в диапазоне [1; 3]
            *entropyMultiplier
        ) // колебания [1; 3] * entropyMultiplier

        const lengthPeriodValue = Math.round(
            (Math.cos(str.length) + 2) // всегда положительный косинус в диапазоне [1; 3]
            *entropyMultiplier
        ) // колебания [1; 3] * entropyMultiplier
        tokenArray.push(
            str.charCodeAt(i)* // Юникод для буквы. Нижний регистр латиницы - [97: 122]
            lengthPeriodValue *
           periodValue
            + str.length
        )
    }
    return tokenArray
}
export function convertTokenToRgbColor(token: number) : string{
    let color = '#'
    for (let i = 0; i < 3; i++) {
        const value = (token >> (i * 8)) & 0xff
        color += value.toString(16).padStart(2, '0')
    }
    return color
}
export function createStyledLettersArray(str: string) : styledLetter[]{
    const result: styledLetter[] = []
    generateStringToken(str).forEach((token, index) => {
        const letter = str[index].toLowerCase()
        result.push({
            letter: str[index],
            color: convertTokenToRgbColor(token),
            isCapitalize: letter === 'i' ? false :
                letter === 'l' ? true :
                token%2==0,
            token
        })
    })
    return result
}