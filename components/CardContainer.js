import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import FlashCard from './FlashCard'
import { updateScore } from '../utils/helpers'
import { Feather } from '@expo/vector-icons'

function FlipIcon ({ onPress }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Feather />
            </TouchableOpacity>
        </View>
    )
}
class CardContainer extends Component {
    state = {
        flipped: false,
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
            const { numCorrect } = this.state
            updateScore(numCorrect)
            .then(() => {this.props.navigation.navigate('Score', {numCorrect: numCorrect, title: this.props.title})})
        }
        else{
            this.setState((prevState) => ({
                curIndex: prevState.curIndex + 1,
                flipped: false
            }))
        }
    }

    updateCorrect = (isLast) => {
        this.setState((prevState) => ({
            numCorrect: prevState.numCorrect + 1
        }))
        this.updateIndex(isLast)

        
    }

    flipCard = () => {
        this.setState(() => ({
            flipped: true
        }))
    }


    render(){
        const { deck } = this.props
        const questions = deck.questions
        const last = this.state.curIndex === deck.questions.length - 1
        const { flipped, curIndex } = this.state
        return (
            <View>
                {flipped === false 
                    ? <View>
                        <Text>{questions[curIndex].question}</Text>  
                        <FlipIcon onPress={this.flipCard}/>
                    </View>
                    : 
                    <View>{questions[curIndex].answer}</View>}
                                
                <TouchableOpacity disabled={flipped===false} onPress={this.updateCorrect(last)}>
                    Correct
                </TouchableOpacity>
                <TouchableOpacity disabled={flipped===false} onPress={this.updateIndex(last)}>
                    Incorrect
                </TouchableOpacity>
            </View>
        )
    }
}

export default CardContainer