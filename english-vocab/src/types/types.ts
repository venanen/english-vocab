export type styledLetter = {
    letter: string;
    color: string;
    isCapitalize: boolean;
    token?: number
}
export type questionPayload = {
    word: string;
    answersArray: string[];
    truthAnswer: number;
    means?: string[];

}