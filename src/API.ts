import { shffleChoices } from './utils'
export {}



export type Props = {
    totalQuestions: number, 
    difficulty: string
}

export type Question = {

    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string

}

export type ALLQuestions = Question & { answers: string[] }

export enum Difficulty {
    EASY = "easy", 
    MEDIUM = "medium", 
    HARD = "hard"
}

export const fetchQuestions = async (totalQuestion:number, difficulty:Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=10&type=multiple`

    const data = await (await fetch(endpoint)).json(); 
    console.log(data, 'data');
    
    return data.results.map((choice:Question) => (
        {
            ...choice, 
            answers: shffleChoices([...choice.incorrect_answers, choice.correct_answer])
        }
    ))
    
}