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

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    onChange = (e) => {
        const type = e.target.id
        const value = e.target.value

        this.setState(() => ({
            [type]: value
        }))
    }

    onSubmit = () => {
        addCardToDeck(this.props.title, this.state.question, this.state.answer)
        .then(() => this.goBack())
    }

    goBack = () => {
        this.props.navigation.CommonActions.goBack()
    }

    render() {
        const { question, answer } = this.state
        return (
            <View>
                <Text>New Question:</Text>
                <TextInput 
                    multiline
                    numberOfLines={2}
                    id='question'
                    onChange={this.onChange}
                    value={question}
                    placeholder='Please input the new question'
                />
                <Text>New Answer:</Text>
                <TextInput 
                    multiline
                    numberOfLines={4}
                    id='answer'
                    onChange={this.onChange}
                    value={answer}
                    placeholder='Please input the new answer'
                />
                <TouchableOpacity disabled={question === '' || answer === ''} onPress={this.onSubmit}>Submit</TouchableOpacity>
                <TouchableOpacity onPress={this.goBack()}>Go Back</TouchableOpacity>
            </View>
        )
    }
}