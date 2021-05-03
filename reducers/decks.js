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
            let copy = {...state}
            delete copy[action.title]
            return {
                copy
            }

        case ADD_CARD:
            const obj = {
                question: action.question,
                answer: action.answer
            }
            return {
               ...state,
               [action.title] : {
                   questions: state[action.title].questions.concat(obj)
               }
            }
            
        default:
            return state
    }


}