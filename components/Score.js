import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import universal from './Styles'
import { getShuffledDeck } from '../utils/api'
import { receiveDecks } from '../actions/decks'
import { FontAwesome5, Entypo } from '@expo/vector-icons'

class Score extends Component {
    reShuffle = async () => {
        const { deckTitle, dispatch } = this.props
        getShuffledDeck(deckTitle) 
        .then((results) => {
            dispatch(receiveDecks(results))
        })
    }
    render() {
        const { deckTitle, numCorrect, total, navigation } = this.props
        return (
            <View style={universal.container}>
                <Text>Your Score:</Text>
                <Text>{numCorrect}/{total}</Text>
                <TouchableOpacity 
                    onPress={() => {navigation.navigate('DeckList')}}
                    style={universal.button}
                    >
                        <Entypo name='arrow-bold-left' color='linen' size={15}/>
                    <Text style={[universal.buttonText, {marginLeft: 5}]}>Back to Main</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={async () => {this.reShuffle() .then(() => navigation.navigate('QuizView', {title: deckTitle}))}}
                    style={universal.button}
                    >
                    <Text style={[universal.buttonText, {marginRight: 5}]}>Replay</Text>
                    <FontAwesome5 name='redo-alt' color='linen'/>
                </TouchableOpacity>
            </View>
        )
        
    }
}

function mapStateToProps(state, { route }) {
    const { numCorrect, deckTitle } = route.params
    const deck = state[deckTitle]
    const total = deck.questions.length
    return {
        deck,
        deckTitle, 
        numCorrect,
        total
    }
}

export default connect(mapStateToProps)(Score)