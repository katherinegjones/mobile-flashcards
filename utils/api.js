import AsyncStorage from '@react-native-async-storage/async-storage'
import { shuffleDeck } from './helpers'

const DECK_STORAGE_KEY = 'MobileFlashcards:deck'


export function getDecks() {
    //AsyncStorage.clear()
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    //.then((results) => console.log("Received results: ", JSON.parse(results)))
}

export function getShuffledDeck(title){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        const deck = data[title].questions
        const shuffled = shuffleDeck(deck)
        const newData = {
            ...data,
            [title]: {
                questions: shuffled
            }
        }

        return data[title].questions
    })
}

export function saveDeckTitle(title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        //console.log(data)
            AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
                [title]: {
                    questions: []
                    }
                }))
        }
    )  
    }

    


export function addCardToDeck( title, question, answer ){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        const obj = {
            question: question,
            answer: answer
        }
        const newData = {
            ...data,
            [title] : {
                questions: data[title].questions ? data[title].questions.concat(obj) : obj
            }
        }
        
        console.log(newData)
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(newData))
    })
}