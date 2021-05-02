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
            <View>
                <Text>What is the title of your new quiz?</Text>
                <TextInput
                    onChangeText={this.onChange}
                    placeholder='Please enter your new title'
                />
                <TouchableOpacity disabled={title===''} onPress={this.handleSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toHome}>
                    <Text>Back to Main</Text>
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