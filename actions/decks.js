export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks(decks){
    return {
        type: RECEIVE_DECKS,
        decks
    }
}
export function addDeck(info) {
    //console.log(info)
    return {
        type: ADD_DECK,
        info
    }
}

export function removeDeck(title) {
    return {
        type: REMOVE_DECK,
        title
    }
}

export function addCard (info) {
    return {
        type: ADD_CARD,
        info
    }
}