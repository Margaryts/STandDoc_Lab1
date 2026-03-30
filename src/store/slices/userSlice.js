import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = (key, defaultValue) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
};

const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: loadFromLocalStorage('hangman_current_user', 'guest'),
        users: loadFromLocalStorage('hangman_users', {
            guest: { score: 0, level: 1, wordsGuessed: 0, gamesPlayed: 0 }
        }),
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;

            if (!state.users[action.payload]) {
                state.users[action.payload] = {
                    score: 0,
                    level: 1,
                    wordsGuessed: 0,
                    gamesPlayed: 0
                };
            }

            saveToLocalStorage('hangman_current_user', action.payload);
            saveToLocalStorage('hangman_users', state.users);
        },

        updateUserStats: (state, action) => {
            const { userId, ...updates } = action.payload;
            if (state.users[userId]) {
                state.users[userId] = { ...state.users[userId], ...updates };
                saveToLocalStorage('hangman_users', state.users);
            }
        },

        resetUserStats: (state, action) => {
            const userId = action.payload;
            state.users[userId] = {
                score: 0,
                level: 1,
                wordsGuessed: 0,
                gamesPlayed: state.users[userId]?.gamesPlayed || 0
            };
            saveToLocalStorage('hangman_users', state.users);
        },

        incrementGamesPlayed: (state, action) => {
            const userId = action.payload;
            if (state.users[userId]) {
                state.users[userId].gamesPlayed += 1;
                saveToLocalStorage('hangman_users', state.users);
            }
        },
    },
});

export const {
    setCurrentUser,
    updateUserStats,
    resetUserStats,
    incrementGamesPlayed
} = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUserStats = (userId) => (state) => state.user.users[userId];
export const selectAllUsers = (state) => state.user.users;
export const selectCurrentUserStats = (state) =>
    state.user.users[state.user.currentUser] || { score: 0, level: 1, wordsGuessed: 0, gamesPlayed: 0 };

export default userSlice.reducer;