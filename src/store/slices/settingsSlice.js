import { createSlice } from '@reduxjs/toolkit';

const loadSettingsFromStorage = () => {
    try {
        const settings = localStorage.getItem('hangman_settings');
        return settings ? JSON.parse(settings) : {
            difficulty: 'medium',
            maxAttempts: 6,
            showHints: false,
            showFirstLetter: false,
            allowSpecialCharacters: true,
            soundEnabled: true,
            animationsEnabled: true,
        };
    } catch (error) {
        console.error('Error loading settings:', error);
        return {
            difficulty: 'medium',
            maxAttempts: 6,
            showHints: false,
            showFirstLetter: false,
            allowSpecialCharacters: true,
            soundEnabled: true,
            animationsEnabled: true,
        };
    }
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState: loadSettingsFromStorage(),
    reducers: {
        updateSettings: (state, action) => {
            Object.assign(state, action.payload);
            localStorage.setItem('hangman_settings', JSON.stringify(state));
        },

        resetSettings: (state) => {
            const defaultSettings = {
                difficulty: 'medium',
                maxAttempts: 6,
                showHints: false,
                showFirstLetter: false,
                allowSpecialCharacters: true,
                soundEnabled: true,
                animationsEnabled: true,
            };
            Object.assign(state, defaultSettings);
            localStorage.setItem('hangman_settings', JSON.stringify(state));
        },

        setDifficulty: (state, action) => {
            state.difficulty = action.payload;
            localStorage.setItem('hangman_settings', JSON.stringify(state));
        },

        setMaxAttempts: (state, action) => {
            state.maxAttempts = action.payload;
            localStorage.setItem('hangman_settings', JSON.stringify(state));
        },

        toggleShowHints: (state) => {
            state.showHints = !state.showHints;
            localStorage.setItem('hangman_settings', JSON.stringify(state));
        },

        toggleShowFirstLetter: (state) => {
            state.showFirstLetter = !state.showFirstLetter;
            localStorage.setItem('hangman_settings', JSON.stringify(state));
        },

        toggleAllowSpecialCharacters: (state) => {
            state.allowSpecialCharacters = !state.allowSpecialCharacters;
            localStorage.setItem('hangman_settings', JSON.stringify(state));
        },
    },
});

export const {
    updateSettings,
    resetSettings,
    setDifficulty,
    setMaxAttempts,
    toggleShowHints,
    toggleShowFirstLetter,
    toggleAllowSpecialCharacters
} = settingsSlice.actions;

export const selectSettings = (state) => state.settings;
export const selectDifficulty = (state) => state.settings.difficulty;
export const selectMaxAttempts = (state) => state.settings.maxAttempts;
export const selectShowHints = (state) => state.settings.showHints;
export const selectShowFirstLetter = (state) => state.settings.showFirstLetter;
export const selectAllowSpecialCharacters = (state) => state.settings.allowSpecialCharacters;

export default settingsSlice.reducer;