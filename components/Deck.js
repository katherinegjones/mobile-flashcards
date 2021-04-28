import React, { Component } from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { shuffleDeck } from '../utils/helpers'

class Deck extends Component {
    render(){
        const { decks, title } = this.props
        const deck = decks[title]
        const questions = deck.questions
        const shuffled = shuffleDeck(questions)
        return(
            <View>
                <Text>{title}</Text>
                <Text># of cards: {questions.length}</Text>
                <TouchableOpacity onPress={this.props.navigation.navigate('Deck', {deck: shuffled})}>
                    Start Quiz
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.navigation.navigate('AddCard', {title: title})}>
                    Add Card
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.navigation.navigate('DeckList')}>
                    Back to Home
                </TouchableOpacity>
            </View>
        )
    }
} 

function mapStateToProps( decks ) {
    return {
        decks
    }
}