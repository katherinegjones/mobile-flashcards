import { RECEIVE_DECKS, ADD_DECK, RECEIVE_DECK, ADD_CARD } from '../actions/decks'

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
        case RECEIVE_DECK:
            return {
                ...state,
                ...action.cards
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