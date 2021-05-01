import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './components/DeckList';
import CardContainer from './components/CardContainer';
import Deck from './components/Deck'
import Score from './components/Score'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import { addCard } from './actions/cards';


const Stack = createStackNavigator()

const StackNavigatorConfigs = {
  headerMode: 'screen'
}

const MainNav = () => (
  <Stack.Navigator>
    <Stack.Screen name='DeckList' component={DeckList}/>
    <Stack.Screen name='AddDeck' component={AddDeck} />
    <Stack.Screen name='CardContainer' component={CardContainer}/>    
    <Stack.Screen name='Deck' component={Deck}/>
    <Stack.Screen name='Score' component={Score} />    
    <Stack.Screen name='AddCard' component={AddCard} />
  </Stack.Navigator>
)

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={styles.container}>
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
