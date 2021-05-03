import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { connect } from 'react-redux'
import universal from './Styles'
import { FontAwesome, Entypo } from '@expo/vector-icons'

function FlipIcon ({ onPress }) {
    return (
        <View style={{alignSelf: 'flex-end'}}>
            <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}} 
                onPress={onPress}>
                <Text style={styles.iconText}>View Answer</Text>
                <Feather name='arrow-right-circle' size={30} color='midnightblue'/>
            </TouchableOpacity>
        </View>
    )
}
class QuizView extends Component {
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

    viewScore = () => {
        this.setState(() => ({
            flipped: false,
            isLast: false,
            numCorrect: 0,
            curIndex: 0
        }))

        this.props.navigation.navigate('Score', {numCorrect: this.state.numCorrect, deckTitle: this.props.deckTitle})
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
            <View style={universal.container}>
                {flipped === false 
                    ? <View style={styles.flashcard}>
                        <Text style={styles.flashText}>{questions[curIndex].question}</Text>  
                        <FlipIcon onPress={this.flipCard}/>
                    </View>
                    : 
                    <View style={styles.flashcard}><Text style={styles.flashText}>{questions[curIndex].answer}</Text></View>}
                <View style={styles.buttons}>
                    <TouchableOpacity 
                        disabled={flipped===false}
                        style={[universal.button, {backgroundColor: 'seagreen'}]} 
                        onPress={this.updateCorrect}>
                            <FontAwesome name='check-circle' size={15} color='white'/>
                        <Text style={styles.correct}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        disabled={flipped===false}
                        style={[universal.button, {backgroundColor: 'firebrick'}]} 
                        onPress={this.updateIndex}>
                            <Entypo name='circle-with-cross' size={15} color='white'/>
                        <Text style={styles.correct}>Incorrect</Text>
                    </TouchableOpacity>
                </View>                
                
                {isLast && (
                    <TouchableOpacity 
                        style={universal.button}
                        onPress={this.viewScore}
                    >
                        <Text style={universal.buttonText}>See your score!</Text>
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

const styles = StyleSheet.create({
    'flashcard': {
        width: 300,
        height: 200,
        borderWidth: 1,
        borderColor: 'midnightblue',
        backgroundColor: 'linen',
        alignItems: 'center',
        textAlign: "center",
        justifyContent: 'space-between'
    },
    'iconText': {
        color: 'midnightblue', 
        fontWeight: 'bold', 
        fontSize: 20,
        marginRight: 5
    },
    'buttons': {
        flexDirection: 'row',
        width: 200,
        justifyContent:'space-around',
    },
    'flashText': {
        textAlign: 'center',
        padding: 10,
        color: 'midnightblue',
        fontWeight: 'bold'
    },
    'correct': {
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 5
    }
})
export default connect(mapStateToProps)(QuizView)