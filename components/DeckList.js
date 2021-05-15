import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView, 
    Platform
} from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/decks'
import AppLoading from 'expo-app-loading'
import shared from './Styles'
import { Entypo } from '@expo/vector-icons'

class DeckList extends Component {

    
    componentDidMount() {
       const { dispatch, navigation } = this.props

       navigation.addListener('focus', () => {
           getDecks()
            .then((decks) => {
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
            <View style={shared.container}>
                {Object.keys(decks).length === 0
                ? <View>
                    <Text>You have no decks</Text>
                </View>
                : 
                    <ScrollView>
                 {Object.keys(decks).map((title) => {
                     return(
                         decks[title].questions
                         ?<View key={title}>
                        <TouchableOpacity 
                            onPress = {() => this.props.navigation.navigate('Deck', {title: title})}
                            style={Platform.OS === 'ios' ? [styles.deck, styles.iosDeck] : [styles.deck, styles.androidDeck]}>
                            <Text style={Platform.OS === 'ios' ? styles.iosDeckTitle : styles.androidDeckTitle}>{title}</Text>
                            {decks[title].questions.length === 1 
                            ? <Text style={Platform.OS === 'ios' ? {color: 'midnightblue'} : {color: 'linen'}}>{decks[title].questions.length} card</Text>
                            : <Text style={Platform.OS === 'ios' ? {color: 'midnightblue'} : {color: 'linen'}}>{decks[title].questions.length} cards</Text>
                 }
                        </TouchableOpacity>
                    </View>
                    : null
                     )
                    
                })}
                </ScrollView>}
                <TouchableOpacity
                    style={shared.button} 
                    onPress={() => this.props.navigation.navigate('AddDeck')}
                    >
                    <Entypo name='circle-with-plus' color='linen' size={15}/>
                    <Text style={[shared.buttonText, {paddingLeft: 5}]}>Add Deck</Text>
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
        margin: 10,
        padding: 10,
        textAlign: 'center',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    'iosDeck': {
       shadowColor: 'lightsteelblue',
       shadowRadius: 2,
       shadowOffset: {width: 0, height: 2},
       shadowOpacity: 1.0,
       borderRadius: 5,
       backgroundColor: 'linen',
    },
    'androidDeck': {
        backgroundColor: 'midnightblue',
        borderRadius: 5

    },
    'deckDisplay': {
        flex: 1,
        
    },
    'iosDeckTitle': {
        fontSize: 20,
        color: 'midnightblue',
        fontWeight: 'bold',
        textShadowOffset: {width: 1, height: 1},
        textShadowColor: 'lightsteelblue',
        textShadowRadius: 2
    },
    'androidDeckTitle': {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'linen'
    },
})

export default connect(mapStateToProps)(DeckList)

