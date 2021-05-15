import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
import { Alert } from 'react-native'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

// found JS implementation of Derstenfeld shuffle here: https://stackoverflow.com/a/12646864
export function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1))
        let temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }
    return deck
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }

  const newNotification =
     {
      title: 'Practice your flashcards!',
      body: "👋 Don't forget to practice your flashcards today!",
      ios: {
        sound: true
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
      }
    }
  

  export async function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null){
          Notifications.getPermissionsAsync()
          .then((status) => {
          if (status.granted === true){
                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)

                let trigger = new Date(Date.now() + 60 * 60 * 1000)
                trigger.setMinutes(0)
                trigger.setSeconds(0)

                Notifications.setNotificationHandler({
                  handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: false
                  })                
                })

                Notifications.scheduleNotificationAsync({
                    content: {
                      title: "Flashcard App",
                      body: "Don't forget to practice your flashcards!"
                    },
                    trigger: tomorrow
                },
                 
                )

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
          }
        })
      }
  