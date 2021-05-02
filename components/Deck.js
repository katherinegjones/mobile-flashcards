import { CommonActions } from '@react-navigation/routers'
import React, { Component } from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
    render(){
        const { deck, title } = this.props
        const questions = deck.questions
        return(
            <View style={styles.container}>
                <Text style={{fontSize: 35, paddingBottom: 10}}>{title}</Text>
                <Text style={{fontSize: 20}}># of cards: {questions.length}</Text>
                {questions.length > 0 && (
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('CardContainer', {deckTitle: title})}
                    style={styles.button}
                    >
                    <Text>Start Quiz</Text>                    
                </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('AddCard', {title: title})}
                    style={styles.button}
                    >
                    <Text>Add Card</Text>
                </TouchableOpacity>
            </View>
        )
    }
} 

function mapStateToProps( state, { route } ) {
    const { title } = route.params
    return {
        title,
        deck: state[title]
    }
}

const styles = StyleSheet.create({
    'container': {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    'button': {
        margin: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5
    }
})

export default connect(mapStateToProps)(Deck)