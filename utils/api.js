import AsyncStorage from '@react-native-async-storage/async-storage'
import { shuffleDeck } from './helpers'

const DECK_STORAGE_KEY = 'MobileFlashcards:deck'


export function getDecks() {
    //AsyncStorage.clear()
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function getShuffledDeck(title){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        const deck = data[title].questions
        data[title] = undefined
        delete data[title]
        const shuffled = shuffleDeck(deck)
        const newData = {
            ...data,
            [title]: {
                questions: shuffled
            }
        }
        AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
            [title]: {
                questions: shuffled
            }
        }))
    })
}

export function getDeck(title) {

}

export function saveDeckTitle(title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
            AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
                [title]: {
                    questions: []
                    }
                }))
        }
    )  
    }

export function removeDeckFromStore(title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        data[title] = undefined
        delete data[title]

        if (Object.keys(data).length === 0) {
            AsyncStorage.removeItem(DECK_STORAGE_KEY)
        }
        else {
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        }
    })
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
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(newData))
    })
}