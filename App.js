import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import decks from './reducers/decks'
import DeckList from './components/DeckList';
import QuizView from './components/QuizView';
import Deck from './components/Deck'
import Score from './components/Score'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import { setLocalNotification } from './utils/helpers';


const Stack = createStackNavigator()

const StackNavigatorConfigs = {
  headerMode: 'screen'
}

const headerColors = {
  headerTintColor: 'linen',
  headerStyle: {
    backgroundColor: 'midnightblue'
  }
}
const MainNav = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name='DeckList' 
      component={DeckList}
      options={{
        ...headerColors,
        title: 'Deck List'
      }}/>
    <Stack.Screen 
      name='AddDeck' 
      component={AddDeck} 
      options={{
        ...headerColors,
        title: 'Add a New Deck'
      }}
      />
    <Stack.Screen 
      name='QuizView' 
      component={QuizView}
      options = {{
        ...headerColors,
        title: 'Quiz',
        headerLeft: () => null
      }}
      />    
    <Stack.Screen 
      name='Deck' 
      component={Deck}
      options={headerColors}
      />
    <Stack.Screen 
      name='Score' 
      component={Score} 
      options={headerColors}
      />    
    <Stack.Screen 
      name='AddCard' 
      component={AddCard} 
      options={{
        ...headerColors,
        title: 'Add a New Card'
      }}
      />
  </Stack.Navigator>
)

class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  
  render(){
    return (
      <Provider store={createStore(decks)}>
        <View style={{flex: 1}}>
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
 export default App

