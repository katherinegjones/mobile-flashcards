import { CommonActions } from '@react-navigation/routers'
import React, { Component } from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import universal from './Styles'
import { getShuffledDeck, removeDeckFromStore } from '../utils/api'
import { receiveDecks, removeDeck } from '../actions/decks'
import { Entypo, FontAwesome } from '@expo/vector-icons'

class Deck extends Component {
    shuffleThenStart = async () => {
        const { title, dispatch } = this.props
        getShuffledDeck(title) 
        .then((results) => {
            dispatch(receiveDecks(results))
        })
    }

    remove = async () => {
        const { dispatch, title, navigation } = this.props
        
        await removeDeckFromStore(title)
        dispatch(await removeDeck(title))
        
        navigation.navigate('DeckList') 
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.deck !== undefined
    }

    render(){
        const { deck, title, navigation } = this.props
        const questions = deck.questions
        return(
            <View style={universal.container}>
                <Text style={styles.deckTitle}>{title}</Text>
                <Text style={{fontSize: 20, color: 'midnightblue', marginBottom: 10}}># of cards: {questions.length}</Text>
                {questions.length > 0 && (
                <TouchableOpacity 
                    onPress={async () => { await this.shuffleThenStart() .then(() => navigation.navigate('QuizView', {deckTitle: title}))}}
                    style={universal.button}
                    >
                    <Text style={[universal.buttonText, {paddingRight: 5}]}>Start Quiz</Text>
                    <FontAwesome name='play-circle' color='linen' size={15}/>                    
                </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                    onPress={() => navigation.navigate('AddCard', {title: title})}
                    style={universal.button}
                    >
                    <Entypo name='circle-with-plus' color='linen'/>
                    <Text style={[universal.buttonText, {marginLeft: 4}]}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.remove}
                    style={universal.button}
                >
                    <Entypo name='circle-with-minus' color='linen'/>
                    <Text style={[universal.buttonText, {marginLeft: 4}]}>Remove Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
} 

function mapStateToProps( state, { route } ) {
    const { title } = route.params
    return {
        title,
        deck: state[title]
    }
}

const styles = StyleSheet.create({
    
    'deckTitle': {
        fontSize: 35,
        color: 'midnightblue',
        fontWeight: 'bold',
        textShadowOffset: {width: 2, height: 2},
        textShadowColor: 'lightsteelblue',
        textShadowRadius: 4,
        backgroundColor: 'linen',
        marginBottom: 20,
    }
})

export default connect(mapStateToProps)(Deck)