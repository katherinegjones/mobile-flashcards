import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { shuffleDeck } from '../utils/helpers'

class Score extends Component {
    render() {
        return (
            <View>
                <Text>Your Score:</Text>
                <Text>{this.props.numCorrect}/{this.props.total}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Decks')}>
                    <Text>Back to Main</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CardContainer', {title: deckTitle})}>
                    <Text>Replay</Text>
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

export default connect(mapStateToProps)(Score)