import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/decks'
import AppLoading from 'expo-app-loading'
import decks from '../reducers/decks'

class DeckList extends Component {
    state = {
        ready: false
    }
    componentDidMount() {
       const { dispatch, navigation } = this.props

       navigation.addListener('focus', () => {
        console.log("focused")
           getDecks()
            .then((decks) => {
                console.log("Current store: ", JSON.parse(decks))
                dispatch(receiveDecks(JSON.parse(decks)))
            })
            .then(() => { 
                this.setState(() => ({
                    ready: true
                }))
            })
       })

       
    }

    render(){
        const { decks } = this.props
        
        if (this.state.ready === false){
            return (
                <AppLoading />
                )
        }
        //console.log("Current titles: ", Object.keys(decks))
        return(
            <View style={styles.container}>
                {Object.keys(decks).length === 0
                ? <View>
                    <Text>You have no decks</Text>
                </View>
                : <View>
                 {Object.keys(decks).map((title) => {
                     return(
                         <View key={title}>
                        <TouchableOpacity 
                            onPress = {() => this.props.navigation.navigate('Deck', {title: title})}
                            style={styles.deck}>
                            <Text>{title}</Text>
                            <Text>{decks[title].questions.length} cards</Text>
                        </TouchableOpacity>
                    </View>
                     )
                    
                })}
                </View>}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddDeck')}>
                    <Text>Add Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps( decks ) {
    return {
        decks
    }
}

const styles = StyleSheet.create({
    'container': {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',

    },
    'deck': {
       width: 200,
       height: 100,
       borderWidth: 1,
       borderColor: '#000',
       borderRadius: 10,
       margin: 10,
       padding: 10,
       textAlign: 'center',
       justifyContent: 'space-around',
       alignItems: 'center',
    },
    'deckDisplay': {
        flex: 1,
        
    }
})

export default connect(mapStateToProps)(DeckList)

