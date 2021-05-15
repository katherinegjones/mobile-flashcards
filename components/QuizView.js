import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert, Animated } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { connect } from 'react-redux'
import shared from './Styles'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

function FlipIcon ({ onPress }) {
    return (
        <View style={styles.flipicon}>
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
        numCorrect: 0,
        curIndex: 0
    }

    showInstructions = () => {
        Alert.alert('To play: For each card, read the question, ' +
        'think of your answer, then click the arrow button to view the actual answer. ' + 
        'If your answer was correct, push "Correct". If not, push "Incorrect".')
    }
    componentDidMount() {
        const { navigation } = this.props


        //ensure state is reset when navigating away, e.g. viewing score
        navigation.addListener('blur', () => {
            this.setState(() => ({
                flipped: false,
                numCorrect: 0,
                curIndex: 0
            }))
        })
    }

    // found tutorial for flip animation here: https://codedaily.io/tutorials/Create-a-Flip-Card-Animation-with-React-Native
    UNSAFE_componentWillMount() {
        this.animatedValue = new Animated.Value(0)

        this.value = 0

        this.animatedValue.addListener(({ value }) => {
            this.value = value
        })

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })

        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }

    flipCard = () =>  {
        if (this.value >= 90){
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start()
        }else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8, 
                tension: 10, 
                useNativeDriver: true
            }).start()
        }

        this.setState((prevState) => ({
            flipped: !prevState.flipped
        }))
    }


    viewScore = () => {
        const {numCorrect} = this.state
        this.flipCard()

        clearLocalNotification()
        .then(setLocalNotification)

        this.props.navigation.navigate('Score', {numCorrect: this.state.numCorrect, deckTitle: this.props.deckTitle})
    }

    updateIndex = () => {

        if (this.state.curIndex === this.props.questions.length - 1){
            this.viewScore()
        }
        
        else{
            this.setState((prevState) => ({
                curIndex: prevState.curIndex + 1
            }))
            this.flipCard()
        }
    }

    updateCorrect = async () => {
        await this.setState((prevState) => ({
            numCorrect: prevState.numCorrect + 1
        }))
        this.updateIndex()

        
    }


    render(){
        const { questions, navigation } = this.props
        const { flipped, curIndex } = this.state

        const frontAnimatedStyle = {
            transform: [
                {rotateX: this.frontInterpolate} 
            ]
        }
        
        const backAnimatedStyle = {
            transform: [
                {rotateX: this.backInterpolate}
            ]
        }
        return (
            <View style={shared.container}>
                <View>
                    <Animated.View style={[styles.flashcard, frontAnimatedStyle]}>
                        <Text style={styles.flashText}>{questions[curIndex].question}</Text>
                    </Animated.View>
                    <Animated.View style={[styles.flashcard, backAnimatedStyle, {position: 'absolute', top: 0}]}>
                        <Text style={styles.flashText}>{questions[curIndex].answer}</Text>
                    </Animated.View>
                </View>
                    <Text>{questions.length - curIndex - 1} card(s) remaining</Text>
                    {flipped === false && (<FlipIcon onPress={this.flipCard}/>)}
                        
                <View style={styles.buttons}>
                    <TouchableOpacity 
                        disabled={flipped===false}
                        style={flipped===false ? [styles.correctButton, {opacity: 0.5}] : styles.correctButton}
                        onPress={this.updateCorrect}>
                            <FontAwesome name='check-circle' size={15} color='white'/>
                        <Text style={styles.correctText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        disabled={flipped===false}
                        style={flipped===false ? [styles.incorrectButton, {opacity: 0.5}] : styles.incorrectButton} 
                        onPress={this.updateIndex}>
                            <Entypo name='circle-with-cross' size={15} color='white'/>
                        <Text style={styles.correctText}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.showAlert}>                
                    <TouchableOpacity onPress={this.showInstructions}>
                        <Text style={{color: 'midnightblue', fontWeight: 'bold'}}>View Instructions</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('DeckList')}
                        style={shared.button}
                    >
                        <Entypo name='home' color='linen' size={35}/>
                        
                    </TouchableOpacity>
                </View>
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
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'midnightblue',
        backgroundColor: 'linen',
        alignItems: 'center',
        textAlign: "center",
        justifyContent: 'space-between',
        backfaceVisibility: 'hidden'
    },
    'iconText': {
        color: 'midnightblue',
        fontSize: 15,
        marginRight: 3
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
    'correctText': {
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 5
    },
    'correctButton': {
        ...shared.button,
        backgroundColor: 'seagreen'
    },
    'incorrectButton': {
        ...shared.button,
        backgroundColor: 'firebrick'
    },
    'flipicon': {
        position: 'absolute',
        top: 180,
        right: 55
    },
    'showAlert': {
        color: 'midnightblue',
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        borderColor: 'midnightblue',
        borderWidth: 2,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'linen',
    },
    'showAlertText': {
        color: 'midnightblue',
        fontWeight: 'bold',

    }
})
export default connect(mapStateToProps)(QuizView)