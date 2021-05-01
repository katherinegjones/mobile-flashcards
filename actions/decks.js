export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECK = 'RECEIVE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks(decks){
    return {
        type: RECEIVE_DECKS,
        decks
    }
}
export function addDeck(info) {
    console.log(info)
    return {
        type: ADD_DECK,
        info
    }
}

export function receiveDeck(cards) {
    return {
        type: RECEIVE_DECK,
        cards
    }
}

export function addCard (info) {
    return {
        type: ADD_CARD,
        info
    }
}