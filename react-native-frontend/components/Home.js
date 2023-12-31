import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { useState } from 'react';
import { Button, useTheme, Modal, Center, Box, Text, Image, VStack, Flex, Heading } from "native-base";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Home = ( { navigation }) => {
    const {height, width} = useWindowDimensions();
    const { colors } = useTheme();
    const black = colors['pink'][200]
    const white = colors['pink'][50]
    const defaultWidth = Math.floor(width / 10) * 7

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    
    
    return (
        <GestureHandlerRootView>
            <Center>
                <Flex alignItems={'center'} justifyContent={'space-evenly'} h="100%">
                    <Box marginTop={10}>
                        <Chessboard boardSize={defaultWidth}
                        colors={ {black: black, white: white} }/>
                    </Box>
                    <VStack w="100%" space={4} px="2" mt="4" alignItems="center" justifyContent="center">
                        <Button w={defaultWidth} onPress={() => setShowModal2(true)}>NEW GAME</Button>
                        <Button variant="subtle" w={defaultWidth} onPress={() => navigation.navigate('Practice')}>PRACTICE</Button>
                        <Button colorScheme="light" variant="subtle" w={defaultWidth} onPress={() => setShowModal3(true)}>PUZZLE GAME</Button>
                        <Button colorScheme="light" w={defaultWidth} onPress={() => navigation.navigate('Load Game')}>LOAD GAME</Button>
                        <Button w={defaultWidth} variant={'ghost'} onPress={() => setShowModal(true)}>ABOUT APP</Button>
                    </VStack>
                </Flex>

                <Modal isOpen={showModal3} onClose={() => setShowModal3(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>
                            <Heading>Select Puzzle Opening</Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <Flex direction="row" align="center" justify="space-evenly" w="100%">
                                <Button variant={'subtle'} onPress={() => navigation.navigate('Puzzle')}>
                                    Queen's Gambit - Accepted Variation
                                </Button>
                            </Flex>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant='ghost' onPress={() => {setShowModal2(false);}}>GO BACK</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>

                <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>
                            <Heading>Play as ...</Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <Flex direction="row" align="center" justify="space-evenly" w="100%">
                                <Button variant={'subtle'} onPress={() => navigation.navigate('Game', {white: 'player'})}>
                                    <Image size="sm" source={require('../assets/wp.png')} alt={"white"} />
                                </Button>
                                <Button variant={'subtle'} onPress={() => navigation.navigate('Game', {white: 'engine'})}>
                                    <Image size="sm" source={require('../assets/bp.png')} alt={"black"} />
                                </Button>
                            </Flex>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant='ghost' onPress={() => {setShowModal2(false);}}>GO BACK</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>

                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>
                            <Heading>About</Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <Text fontSize={'md'} textAlign={'center'}>
                                A capstone project created by Kira, Kim, Sarah, and Jasmine. This app is intended for beginner chess players who want to learn more about openings! You can train your knowledge on popular chess openings in the puzzle game, play against them to defeat them in practice mode, or just play a fun game of chess against our engine, Barbie Fischer, who decided our color scheme. You can also load past games as well. Have fun learning openings, with the opportunity to play into the middle and end game!
                            </Text>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </Center>
        </GestureHandlerRootView>
    )
};


export default Home;