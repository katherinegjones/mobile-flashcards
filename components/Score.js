import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import shared from './Styles'
import { getShuffledDeck } from '../utils/api'
import { receiveDecks } from '../actions/decks'
import { FontAwesome5, Entypo } from '@expo/vector-icons'

class Score extends Component {
    reShuffle = async () => {
        const { deckTitle, receiveDecks, navigation } = this.props
        await getShuffledDeck(deckTitle) 
        .then((results) => {
            receiveDecks(results)
        })
        .then(() => navigation.navigate('QuizView', {title: deckTitle}))
    }
    render() {
        const { deckTitle, numCorrect, total, navigation } = this.props
        return (
            <View style={shared.container}>
                <Text>Your Score:</Text>
                <Text>{numCorrect}/{total}</Text>
                <TouchableOpacity 
                    onPress={() => {navigation.navigate('Deck', {title: {deckTitle}})}}
                    style={shared.button}
                    >
                        <Entypo name='arrow-bold-left' color='linen' size={15}/>
                    <Text style={[shared.buttonText, {marginLeft: 5}]}>Back to Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={this.reShuffle}
                    style={shared.button}
                    >
                    <Text style={[shared.buttonText, {marginRight: 5}]}>Replay</Text>
                    <FontAwesome5 name='redo-alt' color='linen'/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DeckList')}
                    style={shared.button}
                >
                    <Entypo name='home' color='linen'/>
                    <Text style={[shared.buttonText, {marginLeft: 5}]}>Back to Main</Text>
                </TouchableOpacity>
            </View>
        )
        
    }
}

function mapStateToProps(state, { route }) {
    const { numCorrect, deckTitle } = route.params
    const total = state[deckTitle].questions.length
    return {
        deckTitle, 
        numCorrect,
        total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        receiveDecks: (decks) => dispatch(receiveDecks(decks))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score)