import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        currentGame: {
            word: '',
            guessedLetters: [],
            wrongGuesses: 0,
            maxAttempts: 6,
            isGameOver: false,
            isWinner: false,
            startTime: null,
            endTime: null,
        },
        gameHistory: [],
    },
    reducers: {
        setGameWord: (state, action) => {
            if (state.currentGame.word !== action.payload) {
                state.currentGame = {
                    word: action.payload,
                    guessedLetters: [],
                    wrongGuesses: 0,
                    maxAttempts: state.currentGame.maxAttempts,
                    isGameOver: false,
                    isWinner: false,
                    startTime: new Date().toISOString(),
                    endTime: null,
                };
            }
        },

        guessLetter: (state, action) => {
            const letter = action.payload;

            if (state.currentGame.isGameOver) {
                return;
            }

            if (state.currentGame.guessedLetters.includes(letter)) {
                return;
            }

            state.currentGame.guessedLetters.push(letter);

            if (!state.currentGame.word.includes(letter)) {
                state.currentGame.wrongGuesses += 1;
            }

            const allLettersGuessed = state.currentGame.word.split('').every(l =>
                state.currentGame.guessedLetters.includes(l) || l === "'"
            );

            if (allLettersGuessed) {
                state.currentGame.isWinner = true;
                state.currentGame.isGameOver = true;
                state.currentGame.endTime = new Date().toISOString();
            } else if (state.currentGame.wrongGuesses >= state.currentGame.maxAttempts) {
                state.currentGame.isGameOver = true;
                state.currentGame.endTime = new Date().toISOString();
            }
        },

        setMaxAttempts: (state, action) => {
            state.currentGame.maxAttempts = action.payload;
        },

        resetGame: (state) => {
            if (state.currentGame.isGameOver && state.currentGame.word) {
                state.gameHistory.push({
                    ...state.currentGame,
                    id: Date.now(),
                });
            }

            state.currentGame = {
                word: '',
                guessedLetters: [],
                wrongGuesses: 0,
                maxAttempts: state.currentGame.maxAttempts,
                isGameOver: false,
                isWinner: false,
                startTime: null,
                endTime: null,
            };
        },

        loadGameHistory: (state, action) => {
            state.gameHistory = action.payload;
        },
    },
});

export const {
    setGameWord,
    guessLetter,
    setMaxAttempts,
    resetGame,
    loadGameHistory
} = gameSlice.actions;

export const selectCurrentGame = (state) => state.game.currentGame;
export const selectGameHistory = (state) => state.game.gameHistory;
export const selectIsGameOver = (state) => state.game.currentGame.isGameOver;
export const selectIsWinner = (state) => state.game.currentGame.isWinner;
export const selectGuessedLetters = (state) => state.game.currentGame.guessedLetters;
export const selectWrongGuesses = (state) => state.game.currentGame.wrongGuesses;

export default gameSlice.reducer;