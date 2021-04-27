import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { shuffleDeck } from '../utils/helpers'

class Score extends Component {
    render() {
        const deck = this.props.decks[this.props.title].questions
        const shuffled = shuffleDeck(deck)
        return (
            <View>
                <Text>Your Score:</Text>
                <Text>{this.props.numCorrect}/{deck.length}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Decks')}>
                    <Text>Back to Main</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CardContainer', {deck: shuffled})}>
                    <Text>Replay</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}