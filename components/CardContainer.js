import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import FlashCard from './FlashCard'
import { updateScore } from '../utils/helpers'

class CardContainer extends Component {
    state = {
        enabled: false,
        numCorrect: 0,
        curIndex: 0
    }

    enableButtons = () => {
        this.setState(() => ({
            enabled:true
        }))
    }

    updateIndex = (isLast) => {
        if (isLast === true){
            updateScore(this.state.numCorrect)
            .then(() => {this.props.navigation.navigate('Score', {numCorrect: this.state.numCorrect, title: this.props.title})})
        }
        else{
            this.setState((prevState) => ({
                curIndex: prevState.curIndex + 1,
                enabled: false
            }))
        }
    }

    updateCorrect = () => {
        this.setState((prevState) => ({
            numCorrect: prevState.numCorrect + 1
        }))
    }

    render(){
        const { deck } = this.props
        const last = this.state.curIndex === deck.questions.length - 1
        return (
            <View>
                {deck.map((elem) => (
                    <FlashCard 
                        key={elem.question} 
                        question={elem.question} 
                        answer={elem.answer}
                        handleFlip={this.enableButtons}
                        />
                ))}

            </View>
        )
    }
}

function mapStateToProps( decks ) {
    return {
        decks
    }
}