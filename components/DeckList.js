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

class DeckList extends Component {
    componentDidMount() {
        getDecks() 
    }
    render(){
        const { decks } = this.props
        return(
            <View>
                {Object.keys(decks).map((title) => {
                    <View key={title}>
                        <TouchableOpacity>
                            <Text>{title}</Text>
                            <Text>{decks[title].questions.length} cards</Text>
                        </TouchableOpacity>
                    </View>
                })}
                <TouchableOpacity onPress={this.props.navigation.navigate('AddDeck')}>
                    Add Deck
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

export default connect(mapStateToProps)(DeckList)

