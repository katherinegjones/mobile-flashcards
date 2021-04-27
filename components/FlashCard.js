import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';

function FlipIcon ({ onPress }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Feather />
            </TouchableOpacity>
        </View>
    )
}

export default class FlashCard extends Component {
    state  = {
        flipped: false
    }

    flipCard = () => {
        this.setState(() => ({
            flipped: true
        }))
        this.props.handleFlip()
    }


    render(){

        const { question, answer } = this.props

        return (
            <View>
                {flipped === false 
                ? <View>
                    <Text>{question}</Text>  
                    <FlipIcon onPress={this.flipCard}/>
                </View>
                : 
                <View>{answer}</View>}
            </View>
    )
    }
}