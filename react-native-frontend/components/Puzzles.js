import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, useWindowDimensions, Image } from 'react-native';
import {Gesture, GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Chessboard, { ChessboardRef } from 'react-native-chessboard';
import { Button, Modal, Center, Box, useTheme } from "native-base";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const opening_table = {
        "name": "Queen's Gambit",
        "variations":[
            [["d4", "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2"], ["c4", "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3"], ["Nf3", "rnbqkb1r/ppp1pppp/5n2/8/2pP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4"], ["e3", "rnbqkb1r/ppp2ppp/4pn2/8/2pP4/4PN2/PP3PPP/RNBQKB1R w KQkq - 0 5"], ["Bxc4", "rnbqkb1r/pp3ppp/4pn2/2p5/2BP4/4PN2/PP3PPP/RNBQK2R w KQkq - 0 6"], ["O-O", "rnbqkb1r/1p3ppp/p3pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1 w kq - 0 7"],["Bb3", "rnbqkb1r/pp3ppp/4pn2/8/2Bp4/4PN2/PP3PPP/RNBQ1RK1 w kq - 0 7"], ["exd4", "r1bqkb1r/pp3ppp/2n1pn2/8/2BP4/5N2/PP3PPP/RNBQ1RK1 w kq - 1 8"], ["Nc3", "r1bqk2r/pp2bppp/2n1pn2/8/2BP4/2N2N2/PP3PPP/R1BQ1RK1 w kq - 3 9"],["Re1", "r1bq1rk1/pp2bppp/2n1pn2/8/2BP4/2N2N2/PP3PPP/R1BQR1K1 w - - 5 10"],["a3"]]],
        "variations-demo": [
            [["rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1", "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2"], ["rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2", "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3"], ["rnbqkbnr/ppp1pppp/8/8/2pP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3", "rnbqkb1r/ppp1pppp/5n2/8/2pP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4"], ["rnbqkb1r/ppp1pppp/5n2/8/2pP4/4PN2/PP3PPP/RNBQKB1R b KQkq - 0 4", "rnbqkb1r/ppp2ppp/4pn2/8/2pP4/4PN2/PP3PPP/RNBQKB1R w KQkq - 0 5"], ["rnbqkb1r/ppp2ppp/4pn2/8/2BP4/4PN2/PP3PPP/RNBQK2R b KQkq - 0 5", "rnbqkb1r/pp3ppp/4pn2/2p5/2BP4/4PN2/PP3PPP/RNBQK2R w KQkq - 0 6"], ["rnbqkb1r/pp3ppp/4pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1 b kq - 1 6", "rnbqkb1r/1p3ppp/p3pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1 w kq - 0 7"],["rnbqkb1r/1p3ppp/p3pn2/2p5/3P4/1B2PN2/PP3PPP/RNBQ1RK1 b kq - 1 7", "rnbqkb1r/pp3ppp/4pn2/8/2Bp4/4PN2/PP3PPP/RNBQ1RK1 w kq - 0 7"], ["rnbqkb1r/pp3ppp/4pn2/8/2BP4/5N2/PP3PPP/RNBQ1RK1 b kq - 0 7", "r1bqkb1r/pp3ppp/2n1pn2/8/2BP4/5N2/PP3PPP/RNBQ1RK1 w kq - 1 8"], ["r1bqkb1r/pp3ppp/2n1pn2/8/2BP4/2N2N2/PP3PPP/R1BQ1RK1 b kq - 2 8", "r1bqk2r/pp2bppp/2n1pn2/8/2BP4/2N2N2/PP3PPP/R1BQ1RK1 w kq - 3 9"],["r1bqk2r/pp2bppp/2n1pn2/8/2BP4/2N2N2/PP3PPP/R1BQR1K1 b kq - 4 9", "r1bq1rk1/pp2bppp/2n1pn2/8/2BP4/2N2N2/PP3PPP/R1BQR1K1 w - - 5 10"],["r1bq1rk1/pp2bppp/2n1pn2/8/2BP4/P1N2N2/1P3PPP/R1BQR1K1 b - - 0 10"]]
        ]
    }

const Puzzle = ({ route, navigation }) => {
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const {height, width} = useWindowDimensions();
    const [currentFen, updateFen] = useState(initialFen);
    const [puzzleFen, updatePuzzleFen] = useState(initialFen);
    const [puzzleList, updatePuzzleList] = useState([]);
    const [currentOpening, updateOpening] = useState("Queen's Gambit");
    const [currentVariation, updateVariation] = useState("Accepted");
    const [moveList, updateMoveList] = useState(opening_table["variations"][0]);
    const { colors } = useTheme();
    const black = colors['pink'][200]
    const white = colors['pink'][50]
    const [capturedP, setCapturedP]= useState([]);

    const ChessBoardDemo = gestureHandlerRootHOC(() => (
        <Chessboard
            colors={ {black: black, white: white} }
            fen={ currentFen } 
            boardSize={ 200 }
        />
        )
    );

    const ChessBoardPuzzle = gestureHandlerRootHOC(() => (
        <Chessboard
            colors={ {black: black, white: white} }
            fen={ puzzleFen }
            onMove={({ state }) => {compareMoves(state)}}
        />
        )
    );


    const compareMoves = (state) => {
        let newList = puzzleList;
        newList.push(state.history[0]);

        if (newList.length === moveList.length || state.history[0] != moveList[newList.length-1][0]){
            updatePuzzleFen(initialFen);
            updatePuzzleList([]);
        }
        else {
            console.log(state.move)
            updatePuzzleFen(moveList[newList.length-1][1]);
            updatePuzzleList(newList);
            // updatePuzzleFen(state.fen)
        }
    };

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const demonstrateMoves = async() => {
        for (moves of opening_table["variations-demo"][0]) {
            updateFen(moves[0]);
            await delay(100);
            updateFen(moves[1]);
            await delay(100);
        }
        updateFen(initialFen);
    }

    const capturedPieces = (fen) => {
        const fenArray = fen.split(" ")

        const initialPieces = {
            p: 8, b: 2, n: 2, r: 2, q: 1, k: 1,
            P: 8,B: 2, N: 2, R: 2, Q: 1, K: 1
        };

        const current = {
            p: 0, b: 0, n: 0, r: 0, q: 0, k: 0,
            P: 0, B: 0, N: 0, R: 0, Q: 0, K: 0
        };

        const captured = {
            p: 0, b: 0, n: 0, r: 0, q: 0, k: 0,
            P: 0, B: 0, N: 0, R: 0, Q: 0, K: 0
        };

        for (const letter of fenArray[0]) {
            if (letter != '/') {
                current[letter] += 1
            }
        };

        for (const piece in initialPieces) {
            captured[piece] = initialPieces[piece] - current[piece];
        };

        setCapturedP(captured)
    };

    const capturedPiece = (color) => {
        pieces = []
        for (piece in capturedP) {
            if (piece.toUpperCase() === piece && color === "white") {
                for (let i = 0; i< capturedP[piece]; i++) {
                    if (piece === "P"){pieces.push(require("../assets/pieces/P.png"))}
                    else if (piece === "B"){pieces.push(require("../assets/pieces/B.png"))}
                    else if (piece === "N"){pieces.push(require("../assets/pieces/N.png"))}
                    else if (piece === "R"){pieces.push(require("../assets/pieces/R.png"))}
                    else if (piece === "Q"){pieces.push(require("../assets/pieces/Q.png"))}
                };

            }
            else if (piece.toLowerCase() === piece && color === "black") {
                    for (let i = 0; i< capturedP[piece]; i++) {
                        if (piece === "p"){pieces.push(require("../assets/pieces/pp.png"))}
                        else if (piece === "b"){pieces.push(require("../assets/pieces/bb.png"))}
                        else if (piece === "n"){pieces.push(require("../assets/pieces/nn.png"))}
                        else if (piece === "r"){pieces.push(require("../assets/pieces/rr.png"))}
                        else if (piece === "q"){pieces.push(require("../assets/pieces/qq.png"))}
                    };
            }
        };
        console.log(pieces)
        return pieces
    }


    return (
        <GestureHandlerRootView>
            <Center>
                <View style={ {height: 340} }/>
                <ChessBoardDemo />
                <View style={ {height: 200} }/>
                <Button variant="subtle" size="sm" onPress={demonstrateMoves}>Play Demo!</Button>
                <View style={ {height: 25} } />
                <Box style={{backgroundColor:"#F3BAD5", paddingTop:10, paddingBottom:10, borderRadius: 4}}>
                    <Box m={2} w="100%" _text={{textTransform: 'capitalize', fontSize: 'md', fontWeight: 'bold'}}>  Engine</Box>
                    {/* <Box style={{flexDirection: 'row'}}>{capturedPiece("white").map(img => <Image source={img} style={{height: 30, width: 30}}/>)}</Box> */}
                    <Box>
                        <ChessBoardPuzzle />
                    </Box>
                    {/* <Box style={{flexDirection: 'row'}}>{capturedPiece("black").map(img => <Image source={img} style={{height: 30, width: 30}}/>)}</Box> */}
                    <Box marginY={2} marginX={-2} w="100%" _text={{textTransform: 'capitalize', textAlign: 'right', fontSize: 'md', fontWeight: 'bold'}}>Player</Box>
                </Box>
            </Center>
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
    space: {
        width: 20,
        height: 20,
    },
    demoStyle: {
        flex: 1,

    },
    puzzleStyle: {
        marginTop: 200
    }
});


export default Puzzle;