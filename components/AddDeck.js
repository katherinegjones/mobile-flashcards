import React, { Component } from 'react'
import { saveDeckTitle } from '../utils/api'
import {
    View,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { CommonActions } from '@react-navigation/native'

class AddDecks extends Component {
    state = {
        title: ''
    }

    onChange = (e) => {
        const title = e.target.value
        this.setState(() => ({
            title
        }))
    }
    toHome = () => {
        this.props.navigate.CommonActions.goBack()
    }

    handleSubmit = () => {
        saveDeckTitle(this.state.title)
        .then(() => this.toHome())
    }
    render() {
        const { title } = this.state
        return (
            <View>
                <Text>What is the title of your new quiz?</Text>
                <TextInput
                    onChange={this.onChange}
                    placeholder='Please enter your new title'
                    value={title}
                />
                <TouchableOpacity disabled={title===''} onPress={this.handleSubmit}>Submit</TouchableOpacity>
                <TouchableOpacity onPress={this.toHome}>Back to Main</TouchableOpacity>
            </View>
        )
    }
}