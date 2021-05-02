import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import FlashCard from './FlashCard'
import { updateScore } from '../utils/helpers'
import { Feather } from '@expo/vector-icons'
import { connect } from 'react-redux'

function FlipIcon ({ onPress }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Feather name='arrow-right-circle'/>
            </TouchableOpacity>
        </View>
    )
}
class CardContainer extends Component {
    state = {
        flipped: false,
        isLast: false,
        numCorrect: 0,
        curIndex: 0
    }

    enableButtons = () => {
        this.setState(() => ({
            enabled:true
        }))
    }


    updateIndex = () => {

        if (this.state.curIndex === this.props.questions.length - 1){
            this.setState(() => ({
                isLast: true
            }))
        }
        
        else{
            this.setState((prevState) => ({
                curIndex: prevState.curIndex + 1,
                flipped: false
            }))
        }
    }

    updateCorrect = () => {
        this.setState((prevState) => ({
            numCorrect: prevState.numCorrect + 1
        }))
        this.updateIndex()

        
    }

    flipCard = () => {
        this.setState(() => ({
            flipped: true
        }))
    }


    render(){
        const { questions, deckTitle } = this.props
        console.log("Current cards: ", questions)
        const last = this.state.curIndex === questions.length - 1
        const { flipped, curIndex, isLast, numCorrect } = this.state
        return (
            <View>
                {flipped === false 
                    ? <View>
                        <Text>{questions[curIndex].question}</Text>  
                        <FlipIcon onPress={this.flipCard}/>
                    </View>
                    : 
                    <View><Text>{questions[curIndex].answer}</Text></View>}
                                
                <TouchableOpacity disabled={flipped===false} onPress={this.updateCorrect}>
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={flipped===false} onPress={this.updateIndex}>
                    <Text>Incorrect</Text>
                </TouchableOpacity>
                {isLast && (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Score', {numCorrect: numCorrect, deckTitle: deckTitle})}>
                        <Text>See your score!</Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    }
}

function mapStateToProps(state, { route }) {
    const { deckTitle } = route.params
    const questions = state[deckTitle].questions
    return {
        questions,
        deckTitle
    }
}

export default connect(mapStateToProps)(CardContainer)