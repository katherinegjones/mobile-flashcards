import React, { Component } from 'react'
import { addCardToDeck } from '../utils/api'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { connect } from 'react-redux'
import { addCard } from '../actions/decks'

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    onChangeQuestion = (text) => {
        console.log(text)
        this.setState(() => ({
            question: text
        }))
    }

    onChangeAnswer = (text) => {
        this.setState(() => ({
            answer: text
        }))
    }
    onSubmit = () => {
        const { question, answer } = this.state
        console.log(question, answer)
        addCardToDeck(this.props.title, question, answer)
        .then(() => {
            this.props.addCard({ question, answer })
            this.setState(() => ({
                question: '',
                answer: ''
            }))
            this.props.navigation.navigate('Deck', {title: this.props.title})
        })
        
        
    }

   

    render() {
        const { question, answer } = this.state
        return (
            <View>
                <Text>New Question:</Text>
                <TextInput
                    onChangeText={this.onChangeQuestion}
                    placeholder='Please input the new question'
                />
                <Text>New Answer:</Text>
                <TextInput 
                    multiline
                    numberOfLines={4}
                    onChangeText={this.onChangeAnswer}
                    placeholder='Please input the new answer'
                />
                <TouchableOpacity disabled={question === '' || answer === ''} onPress={this.onSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps (decks, {route} ) {
    const { title } = route.params
    return {
        decks,
        title
    }
}

function mapDispatchToProps () {
    return {
        addCard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)