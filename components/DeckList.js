import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/decks'
import AppLoading from 'expo-app-loading'
import decks from '../reducers/decks'
import universal from './Styles'
import { Entypo } from '@expo/vector-icons'

class DeckList extends Component {

    componentDidMount() {
       const { dispatch, navigation } = this.props

       navigation.addListener('focus', () => {
        console.log("focused")
           getDecks()
            .then((decks) => {
                console.log("Current store: ", JSON.parse(decks))
                dispatch(receiveDecks(JSON.parse(decks)))
            })
            })
       

       
    }

    render(){
        const decks = this.props.state
        
        if (decks === null){
            return (
                <AppLoading />
                )
        }
        //console.log("Current titles: ", Object.keys(decks))
        return(
            <View style={universal.container}>
                {Object.keys(decks).length === 0
                ? <View>
                    <Text>You have no decks</Text>
                </View>
                : <View>
                 {Object.keys(decks).map((title) => {
                     return(
                         decks[title].questions
                         ?<View key={title}>
                        <TouchableOpacity 
                            onPress = {() => this.props.navigation.navigate('Deck', {title: title})}
                            style={styles.deck}>
                            <Text style={styles.deckTitle}>{title}</Text>
                            {decks[title].questions.length === 1 
                            ? <Text style={{color: 'midnightblue'}}>{decks[title].questions.length} card</Text>
                            : <Text style={{color: 'midnightblue'}}>{decks[title].questions.length} card</Text>
                 }
                        </TouchableOpacity>
                    </View>
                    : null
                     )
                    
                })}
                </View>}
                <TouchableOpacity
                    style={universal.button} 
                    onPress={() => this.props.navigation.navigate('AddDeck')}
                    >
                    <Entypo name='circle-with-plus' color='linen'/>
                    <Text style={universal.buttonText}>Add Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps( state ) {
    return {
        state
    }
}

const styles = StyleSheet.create({
    'deck': {
       width: 200,
       height: 100,
       borderWidth: 4,
       borderColor: 'lightsteelblue',
       borderRadius: 5,
       backgroundColor: 'linen',
       margin: 10,
       padding: 10,
       textAlign: 'center',
       justifyContent: 'space-around',
       alignItems: 'center',
    },
    'deckDisplay': {
        flex: 1,
        
    },
    'deckTitle': {
        fontSize: 20,
        color: 'midnightblue',
        fontWeight: 'bold',
        textShadowOffset: {width: 1, height: 1},
        textShadowColor: 'lightsteelblue',
        textShadowRadius: 2
    }
})

export default connect(mapStateToProps)(DeckList)

