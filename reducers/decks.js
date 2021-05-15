import { RECEIVE_DECKS, ADD_DECK, RECEIVE_SHUFFLED, ADD_CARD, REMOVE_DECK } from '../actions/decks'

export default function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
            
        case ADD_DECK: 
            return {
                ...state,
                ...action.info
            }

        case REMOVE_DECK:
            delete state[action.title] 
            return {
                ...state
            }

        case ADD_CARD:
            const {title, question, answer } = action.info
            const card = { question, answer }
            return {
               ...state,
               [title] : {
                   questions: (state[title].questions || []).concat(card)
               }
            }
            
        default:
            return state
    }


}