import { useState, useEffect, useCallback } from 'react';

/**
 * Стандартні налаштування гри за замовчуванням.
 * @constant
 * @type {Object}
 * @property {string} difficulty - Рівень складності ('easy', 'medium', 'hard').
 * @property {number} maxAttempts - Ліміт помилок до програшу.
 * @property {boolean} showHints - Дозвіл на показ підказок під час гри.
 * @property {boolean} showFirstLetter - Чи відкривати першу літеру слова на старті.
 * @property {boolean} allowSpecialCharacters - Підтримка апострофів та спецсимволів.
 */
export const DEFAULT_SETTINGS = {
    difficulty: 'medium',
    maxAttempts: 6,
    showHints: false,
    showFirstLetter: false,
    allowSpecialCharacters: true,
};

/** Ключ для збереження конфігурації у локальному сховищі браузера */
const STORAGE_KEY = 'hangman_settings_v2';

/**
 * Кастомний хук для управління налаштуваннями гри та їх синхронізації з LocalStorage.
 * * @function useGameSettings
 * @returns {Object} Об'єкт доступу до налаштувань та методів їх оновлення.
 * @property {Object} settings - Поточний об'єкт конфігурації.
 * @property {boolean} isLoading - Статус первинного завантаження даних зі сховища.
 * @property {Function} saveSettings - Метод для повного перезапису налаштувань.
 * @property {Function} resetSettings - Скидання до заводських налаштувань.
 * @property {Function} updateSetting - Оновлення конкретного поля конфігурації.
 */
export const useGameSettings = () => {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Ефект для завантаження збережених налаштувань при ініціалізації додатку.
     * Використовує блок try-catch для безпечного парсингу JSON.
     */
    useEffect(() => {
        const loadSettings = () => {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    // Об'єднуємо дефолтні налаштування з новими для підтримки зворотної сумісності
                    setSettings({ ...DEFAULT_SETTINGS, ...parsed });
                }
            } catch (error) {
                console.error('Помилка завантаження налаштувань:', error);
                localStorage.removeItem(STORAGE_KEY);
            } finally {
                setIsLoading(false);
            }
        };

        loadSettings();
    }, []);

    /**
     * Зберігає повний об'єкт налаштувань у LocalStorage.
     * @param {Object} newSettings - Новий об'єкт конфігурації.
     * @returns {boolean} Результат операції (успішно/помилка).
     */
    const saveSettings = useCallback((newSettings) => {
        try {
            const settingsToSave = { ...newSettings };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsToSave));
            setSettings(settingsToSave);
            return true;
        } catch (error) {
            console.error('Помилка збереження налаштувань:', error);
            return false;
        }
    }, []);

    /** Очищує сховище та повертає стандартні значення (reset to factory) */
    const resetSettings = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setSettings(DEFAULT_SETTINGS);
    }, []);

    /**
     * Оновлює лише одну конкретну властивість у налаштуваннях.
     * @param {string} key - Назва ключа (напр. 'difficulty').
     * @param {any} value - Нове значення.
     */
    const updateSetting = useCallback((key, value) => {
        setSettings(prev => {
            const newSettings = { ...prev, [key]: value };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
            return newSettings;
        });
    }, []);

    return {
        settings,
        isLoading,
        saveSettings,
        resetSettings,
        updateSetting,
    };
};