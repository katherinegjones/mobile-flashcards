import { StyleSheet } from 'react-native'

const shared = StyleSheet.create({
    'container': {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',

    },
    'button': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        padding: 5,
        backgroundColor: 'midnightblue',
        borderRadius: 5
    },
    'buttonText': {
        fontSize: 15,
        color: 'linen',
        fontWeight: 'bold',
    },
    'input':{
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'midnightblue',
        backgroundColor: 'lightsteelblue',
        margin: 5,
        padding: 5
    } 
})

export default shared