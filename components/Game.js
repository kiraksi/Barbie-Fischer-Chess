import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Chessboard from 'react-native-chessboard';

const Game = () => {
    const ChessBoardRender = gestureHandlerRootHOC(() => (
            <Chessboard
                colors={ {black: '#F3BAD5', white: '#FFFBFB'} }
            />
    ));

    return (
        <GestureHandlerRootView>
        <View style={styles.container}>
            <View style={styles.chessWrapTop}>
                <Text>Barbie</Text>
            </View>
            <ChessBoardRender />
            <View style={styles.chessWrapBottom}>
                <Text>You</Text>
            </View>
            <View style={styles.infoButtons}>
                <View></View>
                <View style={styles.buttons}>
                    <Button 
                    title="Confirm"/>
                    <View style={styles.space} />
                    <Button
                    title="Undo"/>
                    <View style={styles.space} />
                    <Button
                    title="Resign"/>
                </View>
            </View>
        </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    chessBox: {
    },
    chessWrapTop: {
        backgroundColor: '#F3BAD5',
        height: 50,
        width: '100%',
    },
    chessWrapBottom: {
        backgroundColor: '#F3BAD5',
        height: 50,
        width: '100%',
        marginTop: 405,
    },
    buttons: {
        padding: 10,
        margin: 20,
    },
    space: {
        width: 20,
        height: 20,
    },
});


export default Game;