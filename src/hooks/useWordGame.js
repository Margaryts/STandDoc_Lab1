import { useState, useCallback } from 'react';
import { WORD_CATEGORIES } from '../constants';

const useWordGame = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [maxAttempts, setMaxAttempts] = useState(6);

    const selectRandomWord = useCallback((difficulty = 'medium', customMaxAttempts = null) => {
        const words = WORD_CATEGORIES[difficulty] || WORD_CATEGORIES.medium;
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(randomWord);
        setGuessedLetters([]);
        setWrongGuesses(0);

        if (customMaxAttempts !== null) {
            setMaxAttempts(customMaxAttempts);
        }
    }, []);

    const guessLetter = useCallback((letter) => {
        if (guessedLetters.includes(letter)) return;

        setGuessedLetters(prev => [...prev, letter]);

        if (!currentWord.includes(letter)) {
            setWrongGuesses(prev => prev + 1);
        }
    }, [currentWord, guessedLetters]);

    const isWordGuessed = useCallback((allowSpecialCharacters = true) => {
        if (!currentWord) return false;

        return currentWord.split('').every(letter =>
            guessedLetters.includes(letter) ||
            (allowSpecialCharacters && letter === '\'')
        );
    }, [currentWord, guessedLetters]);

    const isGameOver = useCallback(() => {
        return wrongGuesses >= maxAttempts;
    }, [wrongGuesses, maxAttempts]);

    const resetGame = useCallback((difficulty = 'medium', customMaxAttempts = null) => {
        selectRandomWord(difficulty, customMaxAttempts);
    }, [selectRandomWord]);

    const updateMaxAttempts = useCallback((newMaxAttempts) => {
        setMaxAttempts(newMaxAttempts);
    }, []);


    const getFirstLetter = useCallback(() => {
        return currentWord ? currentWord[0] : '';
    }, [currentWord]);


    const hasSpecialCharacters = useCallback(() => {
        return currentWord.includes("'");
    }, [currentWord]);

    return {
        currentWord,
        guessedLetters,
        wrongGuesses,
        maxAttempts,
        selectRandomWord,
        guessLetter,
        isWordGuessed,
        isGameOver,
        resetGame,
        updateMaxAttempts,
        getFirstLetter,
        hasSpecialCharacters
    };
};

export default useWordGame;