import * as React from 'react';
import axios from 'axios';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Chessboard from 'react-native-chessboard';
import { useState } from 'react';
import { useEffect } from 'react';
import { Center, Box, Button, Flex, Heading, useTheme } from 'native-base';

const API = 'https://barbie-fischer-chess.onrender.com'

/* Things left to do:
1. finish styling (low importance)
2. add resign button aka delete in-progress game button
-- 2a. take user back Home 
6. figure out how to display captured pieces

Nice to have:
1. popup for check, checkmate, winning, losing, etc. */

const Game = ({route, navigation}) => {
    const { colors } = useTheme();
    const black = colors['pink'][300]
    const white = colors['pink'][50]
    const {height, width} = useWindowDimensions();
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const API = 'https://barbie-fischer-chess.onrender.com/games'
    const [currentFen, updateFen] = useState(initialFen); 
    const [oldFen, setOldFen] = useState();
    const [gameID, updateGameID] = useState();
    const [moveList, updateMoveList] = useState([]);
    const whitePlayer = route.params.white;
    const blackPlayer = route.params.white === 'engine' ? 'player' : 'engine';
    const [currentMove, setCurrentMove] = useState();


    useEffect(() => {
        console.log(whitePlayer)
        axios.post(`${API}/no_opening`, {"white": whitePlayer})
        .then((result) => {
            console.log("We are inside the axios post call")
            console.log(result.data.game_id);
            updateGameID(result.data.game_id);
            updateFen(result.data.fen);
            setOldFen(result.data.fen);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    };

    const confirmMove = () => {
        let newMoveList = moveList;
        newMoveList.push(currentMove);
        updateMoveList(newMoveList);
        console.log({"fen": currentFen, "user_move_list": moveList});
            axios.patch(`${API}/no_opening/${gameID}`, {"fen": currentFen, "user_move_list": moveList, "white": whitePlayer})
            .then((result) => {
                console.log("We're inside the patch call");
                updateFen(result.data.fen);
                setOldFen(result.data.fen);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const undoMove = () => {
        updateFen(oldFen);
    };

    
    const ChessBoardRender = gestureHandlerRootHOC(() => (
            <Chessboard
                colors={ {black: black, white: white} }
                fen={ currentFen } 
                onMove={({ state }) => {
                    updateFen(state.fen);
                    setCurrentMove(state.history[0]);
                 } }
            />
        )
    );

    return (
        <GestureHandlerRootView>
            <Center>
                <Flex direction="column" align="center" justify="space-between" h="95%" w="100%">
                    <Box w="100%">
                        <Box m={2} w="100%" _text={{textTransform: 'capitalize', fontSize: 'md', fontWeight: 'bold'}}>{blackPlayer}</Box>
                        <Box w={Math.floor(width / 8) * 8} h={Math.floor(width / 8) * 8}>
                            <ChessBoardRender/>
                        </Box>
                        <Box marginY={2} marginX={-2} w="100%" _text={{textTransform: 'capitalize', textAlign: 'right', fontSize: 'md', fontWeight: 'bold'}}>{whitePlayer}</Box>
                    </Box>
                    <Button.Group space={4}>
                        <Button variant={'outline'} onPress={undoMove}>Undo</Button>
                        <Button onPress={confirmMove}>Confirm</Button>
                        <Button colorScheme={'muted'}>Resign</Button>
                    </Button.Group>
                </Flex>
            </Center>
        </GestureHandlerRootView>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 10,
//     },
//     chessBox: {
//     },
//     chessWrapTop: {
//         backgroundColor: '#F3BAD5',
//         height: 50,
//         width: '100%',
//     },
//     chessWrapBottom: {
//         backgroundColor: '#F3BAD5',
//         height: 50,
//         width: '100%',
//         marginTop: 405,
//     },
//     buttons: {
//         padding: 10,
//         margin: 20,
//     },
//     space: {
//         width: 20,
//         height: 20,
//     },
// });

{/* <View style={styles.container}>
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
</View> */}


export default Game;