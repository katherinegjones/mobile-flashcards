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
import { connect } from 'react-redux'
import { addCard, updateStore } from '../actions/decks'
import shared from './Styles'
import { add } from 'react-native-reanimated'

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    onChangeQuestion = (text) => {
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
        const { route, addCard, title } = this.props
        await addCard({ title, question, answer })
        await addCardToDeck(title, question, answer)
        .then(() => {
            this.setState(() => ({
                question: '',
                answer: ''
            }))
            
        })
             
        
    }

  

    render() {
        const { question, answer } = this.state
        const { navigation, route } = this.props
        return (
            <View style={shared.container}>
                <Text style={styles.label}>New Question:</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    style={shared.input}
                    onChangeText={this.onChangeQuestion}
                    placeholder='Please input the new question'
                />
                <Text style={styles.label}>New Answer:</Text>
                <TextInput 
                    multiline
                    numberOfLines={4}
                    style={shared.input}
                    onChangeText={this.onChangeAnswer}
                    placeholder='Please input the new answer'
                />
                <TouchableOpacity 
                    disabled={question === '' || answer === ''} 
                    onPress={async () => {await this.onSubmit() .then(() => navigation.navigate('Deck', {title: route.params.title}))}}
                    style={shared.button}
                    >
                    <Text style={shared.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state, { route }) {
    const { title } = route.params

    return {
        title
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addCard: (card) => dispatch(addCard(card))
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)