import { CommonActions } from '@react-navigation/routers'
import React, { Component } from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Alert,
    Platform,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import shared from './Styles'
import { getShuffledDeck, removeDeckFromStore } from '../utils/api'
import { receiveDecks, removeDeck } from '../actions/decks'
import { Entypo, FontAwesome } from '@expo/vector-icons'

class Deck extends Component {
    shuffleThenStart = async () => {
        const { title, receiveDecks, navigation } = this.props
        await getShuffledDeck(title) 
        .then((results) => {
            receiveDecks(results)
           
        })
        .then(() =>  navigation.navigate('QuizView', {deckTitle: title}))        
    }

    remove = async () => {
        const { removeDeck, title, navigation } = this.props
        
        await removeDeckFromStore(title)
        await removeDeck(title)
        
        navigation.navigate('DeckList') 
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.deck !== undefined
    }

    render(){
        const { deck, title, navigation } = this.props
        const questions = deck.questions
        return(
            <View style={shared.container}>
                <Text style={styles.deckTitle}>{title}</Text>
                <Text style={{fontSize: 20, color: 'midnightblue', marginBottom: 30}}># of cards: {questions.length}</Text>
                {questions.length > 0 && (
                <TouchableOpacity 
                    onPress= {this.shuffleThenStart}
                    style={styles.startButton}
                    >
                    <Text style={{fontWeight: 'bold', fontSize: 20, color: 'midnightblue', paddingRight: 5}}>Start Quiz</Text>
                    <FontAwesome name='play-circle' color='midnightblue' size={20}/>                    
                </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                    onPress={() => navigation.navigate('AddCard', {title: title})}
                    style={shared.button}
                    >
                    <Entypo name='circle-with-plus' color='linen'/>
                    <Text style={[shared.buttonText, {marginLeft: 4}]}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.remove}
                    style={shared.button}
                >
                    <Entypo name='circle-with-minus' color='linen'/>
                    <Text style={[shared.buttonText, {marginLeft: 4}]}>Remove Deck</Text>
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

function mapDispatchToProps (dispatch) {
    return {
        receiveDecks: (decks) => dispatch(receiveDecks(decks)),
        removeDeck: (title) => dispatch(removeDeck(title))
    }
}

const styles = StyleSheet.create({
    
    'deckTitle': {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 35,
        color: 'midnightblue',
        textShadowOffset: {width: 2, height: 2},
        textShadowColor: 'lightsteelblue',
        textShadowRadius: 4,
        marginBottom: 10,
    },
    'startButton': {
        color: 'midnightblue',
        fontSize: 20,
        padding: 8,
        marginBottom: 20,
        borderColor: 'midnightblue',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'linen',
        shadowColor: 'midnightblue',
        shadowRadius: 2,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Deck)