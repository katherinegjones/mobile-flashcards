import React, { Component } from 'react'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions/decks'
import {
    View,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { connect } from 'react-redux'
import shared from './Styles'

class AddDeck extends Component {
    state = {
        title: ''
    }

   
    onChange = (text) => {
        this.setState(() => ({
            title: text
        }))
    }
    toHome = () => {
        this.props.navigation.dispatch(CommonActions.goBack())
    }

    handleSubmit = () => {
        const { title } = this.state
        saveDeckTitle(title)
        
            .then(() => {
                this.props.addDeck({
                    [title]: {
                        questions: []
                    }})
                this.setState(() => ({ title: ''}))
                this.toHome()
                
        
            })
        
    }
    render() {
        const { title } = this.state
        return (
            <View style={shared.container}>
                <Text style={{fontSize: 20, color: 'midnightblue', fontWeight: 'bold'}}>What is the title of your new quiz?</Text>
                <TextInput
                    style={shared.input}
                    onChangeText={this.onChange}
                    placeholder='Please enter your new title'
                />
                <TouchableOpacity
                    style={shared.button} 
                    disabled={title===''} onPress={this.handleSubmit}
                    >
                    <Text style={shared.buttonText}>Submit</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const mapDispatchToProps = () => {
    return{
        addDeck
        }
    }


export default connect(mapDispatchToProps)(AddDeck)