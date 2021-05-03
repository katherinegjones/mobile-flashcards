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
import universal from './Styles'

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
    onSubmit = async () => {
        const { question, answer } = this.state
        const { route, navigation, addCard } = this.props
        const { title } = route.params
        addCard({ question, answer })
        await addCardToDeck(title, question, answer)
        this.setState(() => ({
                question: '',
                answer: ''
            }))     
        
    }

   

    render() {
        const { question, answer } = this.state
        const { navigation, route } = this.props
        return (
            <View style={universal.container}>
                <Text style={styles.label}>New Question:</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    style={universal.input}
                    onChangeText={this.onChangeQuestion}
                    placeholder='Please input the new question'
                />
                <Text style={styles.label}>New Answer:</Text>
                <TextInput 
                    multiline
                    numberOfLines={4}
                    style={universal.input}
                    onChangeText={this.onChangeAnswer}
                    placeholder='Please input the new answer'
                />
                <TouchableOpacity 
                    disabled={question === '' || answer === ''} 
                    onPress={async () => {await this.onSubmit() .then(() => navigation.navigate('Deck', {title: route.params.title}))}}
                    style={universal.button}
                    >
                    <Text style={universal.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


function mapDispatchToProps () {
    return {
        addCard
    }
}

const styles = StyleSheet.create({
    'label': {
        marginTop: 10,
        fontSize: 20,
        color: 'midnightblue',
        fontWeight: 'bold',
    }
})

export default connect(mapDispatchToProps)(AddCard)