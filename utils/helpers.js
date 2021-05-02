import AsyncStorage from '@react-native-async-storage/async-storage'

const SCORE_KEY = 'MobileFlashcards:score'

export function updateScore(numCorrect) {
    return AsyncStorage.mergeItem(SCORE_KEY, numCorrect)
}

export function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1))
        [deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck
}