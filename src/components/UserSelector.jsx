import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/slices/userSlice';
import Card from './ui/Card';
import Button from './ui/Button';
import PageWrapper from './layout/PageWrapper';

/**
 * Компонент вибору та створення профілю користувача.
 * Керує авторизацією через введення імені, вибором зі списку недавніх гравців
 * та швидким входом як гостя.
 * * @component
 * @requires react-redux
 * @requires react-router-dom
 * @example
 * <UserSelector />
 */
const UserSelector = () => {
    /** Хік для переходу між маршрутами додатку */
    const navigate = useNavigate();

    /** Хік для відправки екшенів у Redux store */
    const dispatch = useDispatch();

    /** Локальний стан для поля введення імені */
    const [userId, setUserId] = useState('');

    /** Стан для відображення помилок валідації форми */
    const [error, setError] = useState('');

    /**
     * Обробник відправки форми. Перевіряє ім'я на довжину та порожнечу.
     * @param {React.FormEvent} e - Подія відправки форми.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userId.trim()) {
            setError('Будь ласка, введіть ім\'я користувача');
            return;
        }

        if (userId.length < 2 || userId.length > 20) {
            setError('Ім\'я має бути від 2 до 20 символів');
            return;
        }

        // Встановлюємо користувача в Redux та переходимо до його профілю
        dispatch(setCurrentUser(userId.trim()));
        navigate(`/user/${userId.trim()}`);
    };

    /**
     * Функція для швидкої авторизації (Гість, Гравець 1 тощо).
     * @param {string} name - Ім'я обраного профілю.
     */
    const handleQuickStart = (name) => {
        dispatch(setCurrentUser(name));
        navigate(`/user/${name}`);
    };

    /**
     * Отримує список імен користувачів, збережених у браузері.
     * @returns {string[]} Масив останніх 4-х імен користувачів.
     */
    const getRecentUsers = () => {
        try {
            const usersJson = localStorage.getItem('hangman_users');
            if (usersJson) {
                const users = JSON.parse(usersJson);
                return Object.keys(users).slice(0, 4);
            }
        } catch (error) {
            console.error('Error loading recent users:', error);
        }
        return [];
    };

    const recentUsers = getRecentUsers();

    return (
        <PageWrapper>
            <Card>
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Шибениця</h1>
                    <p className="text-gray-600 mb-8">Виберіть або створіть користувача</p>

                    <form onSubmit={handleSubmit} className="mb-8">
                        <div className="mb-4">
                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => {
                                    setUserId(e.target.value);
                                    setError('');
                                }}
                                placeholder="Введіть ваше ім'я"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-center text-lg"
                            />
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full py-3 text-lg"
                        >
                            Почати гру
                        </Button>
                    </form>

                    {/* Список недавніх користувачів з localStorage */}
                    {recentUsers.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Недавні користувачі:</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {recentUsers.map(user => (
                                    <button
                                        key={user}
                                        onClick={() => handleQuickStart(user)}
                                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition hover:scale-105"
                                    >
                                        <div className="font-medium truncate">{user}</div>
                                        <div className="text-xs text-gray-500 mt-1">Натисніть для входу</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <Button
                            onClick={() => handleQuickStart('Гість')}
                            variant="secondary"
                            className="w-full py-3"
                        >
                            Грати як гість
                        </Button>
                        <Button
                            onClick={() => handleQuickStart('Гравець1')}
                            variant="outline"
                            className="w-full py-3"
                        >
                            Гравець 1
                        </Button>
                        <Button
                            onClick={() => handleQuickStart('Гравець2')}
                            variant="outline"
                            className="w-full py-3"
                        >
                            Гравець 2
                        </Button>
                    </div>
                </div>
            </Card>
        </PageWrapper>
    );
};

export default UserSelector;