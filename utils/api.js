import AsyncStorage from '@react-native-community/async-storage'

const DECK_STORAGE_KEY = 'MobileFlashcards:deck'




export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function getDeck(title){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        return obj[title]
    })
}

export function submitDeck(title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: {}
    }))
}

export function submitCard(title, question, answer){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        const obj = {
            question: question,
            answer: answer
        }
        data[title] = {
            ...data[title],
            questions: data[title].questions.concat(obj)
        }
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}