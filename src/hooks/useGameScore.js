import { useState, useCallback } from 'react';

/**
 * Кастомний хук для управління ігровим рахунком та прогресом.
 * Надає методи для нарахування балів, відстеження рівня та скидання статистики.
 * * @function useGameScore
 * @returns {Object} Об'єкт з ігровим станом та методами управління.
 * @property {number} score - Поточний загальний рахунок гравця.
 * @property {number} level - Поточний рівень гри.
 * @property {number} wordsGuessed - Загальна кількість вгаданих слів у сесії.
 * @property {Function} addScore - Додає вказану кількість балів до рахунку.
 * @property {Function} incrementLevel - Збільшує номер рівня на 1.
 * @property {Function} incrementWordsGuessed - Збільшує лічильник вгаданих слів на 1.
 * @property {Function} calculateScore - Розраховує бали за вгадане слово на основі помилок та довжини слова.
 * @property {Function} resetScore - Скидає всі показники до початкових значень (0 та 1).
 */
export const useGameScore = () => {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [wordsGuessed, setWordsGuessed] = useState(0);

    /**
     * Додає бали до загального рахунку.
     * @param {number} points - Кількість балів для додавання.
     */
    const addScore = useCallback((points) => {
        setScore(prev => prev + points);
    }, []);

    /** Збільшує рівень гри */
    const incrementLevel = useCallback(() => {
        setLevel(prev => prev + 1);
    }, []);

    /** Збільшує лічильник вгаданих слів */
    const incrementWordsGuessed = useCallback(() => {
        setWordsGuessed(prev => prev + 1);
    }, []);

    /**
     * Формула розрахунку балів за раунд.
     * Базується на довжині слова з вирахуванням штрафу за помилки.
     * * @param {number} wrongGuesses - Кількість допущених помилок у раунді.
     * @param {number} wordLength - Довжина вгаданого слова.
     * @returns {number} Підсумкова кількість балів (мінімум 10).
     */
    const calculateScore = useCallback((wrongGuesses, wordLength) => {
        const baseScore = wordLength * 10;
        const penalty = wrongGuesses * 5;
        // Гарантуємо, що гравець отримає хоча б 10 балів за вгадане слово
        return Math.max(baseScore - penalty, 10);
    }, []);

    /** Скидає ігровий стан до початкового */
    const resetScore = useCallback(() => {
        setScore(0);
        setLevel(1);
        setWordsGuessed(0);
    }, []);

    return {
        score,
        level,
        wordsGuessed,
        addScore,
        incrementLevel,
        incrementWordsGuessed,
        calculateScore,
        resetScore
    };
};