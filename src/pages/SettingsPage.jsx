import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectSettings,
    updateSettings,
    resetSettings,
    setDifficulty,
    setMaxAttempts,
    toggleShowHints,
    toggleShowFirstLetter,
    toggleAllowSpecialCharacters
} from '../store/slices/settingsSlice';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageWrapper from '../components/layout/PageWrapper';

/**
 * Компонент сторінки налаштувань гри.
 * Дозволяє користувачу конфігурувати складність, кількість спроб та допоміжні ігрові опції.
 * Синхронізує локальний стан форми з глобальним сховищем Redux.
 * * @component
 * @param {Object} props - Властивості компонента.
 * @param {Function} props.onNavigate - Функція для перемикання між екранами.
 * @param {string} [props.userId] - Ідентифікатор поточного користувача.
 * * @example
 * <SettingsPage onNavigate={(page) => console.log(page)} userId="Player1" />
 */
const SettingsPage = ({ onNavigate, userId }) => {
    const dispatch = useDispatch();
    /** Отримання поточних налаштувань з Redux Store */
    const settings = useSelector(selectSettings);

    /** Локальний стан для редагування налаштувань до моменту збереження */
    const [localSettings, setLocalSettings] = useState(settings);
    /** Стан для зберігання помилок валідації (наприклад, некоректна кількість спроб) */
    const [errors, setErrors] = useState({});

    /** Синхронізація локального стану при зміні глобальних налаштувань */
    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    /**
     * Універсальний обробник зміни вводу з валідацією.
     * @param {string} field - Назва поля налаштувань.
     * @param {any} value - Нове значення.
     */
    const handleInputChange = (field, value) => {
        const newSettings = { ...localSettings, [field]: value };
        setLocalSettings(newSettings);

        // Валідація кількості спроб (від 3 до 12 згідно з ТЗ)
        if (field === 'maxAttempts') {
            const numValue = parseInt(value);
            if (numValue < 3 || numValue > 12) {
                setErrors(prev => ({
                    ...prev,
                    maxAttempts: 'Кількість спроб має бути від 3 до 12'
                }));
            } else {
                setErrors(prev => ({ ...prev, maxAttempts: null }));
            }
        }
    };

    /**
     * Зберігає зміни у Redux Store та повертає користувача на головний екран.
     */
    const handleSave = () => {
        if (errors.maxAttempts) {
            alert('Будь ласка, виправте помилки перед збереженням');
            return;
        }

        dispatch(updateSettings(localSettings));
        alert('Налаштування збережено!');
        onNavigate('START');
    };

    /** Скидає всі параметри до значень за замовчуванням після підтвердження */
    const handleReset = () => {
        if (window.confirm('Скинути всі налаштування до стандартних?')) {
            dispatch(resetSettings());
        }
    };

    /**
     * Перемикає булеві значення (hints, first letter тощо) через Redux actions.
     * @param {string} settingName - Назва опції для перемикання.
     */
    const handleToggle = (settingName) => {
        switch (settingName) {
            case 'showHints':
                dispatch(toggleShowHints());
                break;
            case 'showFirstLetter':
                dispatch(toggleShowFirstLetter());
                break;
            case 'allowSpecialCharacters':
                dispatch(toggleAllowSpecialCharacters());
                break;
            default:
                break;
        }
    };

    /** Змінює рівень складності (easy/medium/hard) */
    const handleDifficultyChange = (value) => {
        dispatch(setDifficulty(value));
    };

    /** Оновлює ліміт помилок у глобальному стані */
    const handleMaxAttemptsChange = (value) => {
        const numValue = parseInt(value);
        if (numValue >= 3 && numValue <= 12) {
            dispatch(setMaxAttempts(numValue));
        }
    };

    return (
        <PageWrapper>
            <Card>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Налаштування гри</h1>
                    {userId && userId !== 'default' && (
                        <p className="text-sm text-blue-600 mt-1">Користувач: {userId}</p>
                    )}
                </div>

                <div className="space-y-8">
                    {/* Вибір складності */}
                    <div className="space-y-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Рівень складності</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['easy', 'medium', 'hard'].map((v) => (
                                <button key={v} onClick={() => handleDifficultyChange(v)} className="...">
                                    {/* UI кнопки складності */}
                                </button>
                            ))}
                        </div>

                        {/* Налаштування спроб (Slider) */}
                        <div>
                            <label htmlFor="maxAttempts" className="...">Кількість спроб</label>
                            <input
                                type="range"
                                min="3"
                                max="12"
                                value={localSettings.maxAttempts}
                                onChange={(e) => {
                                    handleInputChange('maxAttempts', e.target.value);
                                    handleMaxAttemptsChange(e.target.value);
                                }}
                                className="..."
                            />
                        </div>
                    </div>

                    {/* Допоміжні опції (Toggles) */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Допоміжні опції</h2>
                        {/* Рендеринг чекбоксів/світчерів */}
                    </div>

                    {/* Навігаційні кнопки */}
                    <div className="flex gap-4 pt-6 border-t">
                        <Button onClick={() => onNavigate('START')} variant="secondary">Назад</Button>
                        <Button onClick={handleReset} variant="danger">Скинути</Button>
                        <Button onClick={handleSave} variant="primary">Зберегти</Button>
                    </div>
                </div>
            </Card>
        </PageWrapper>
    );
};

export default SettingsPage;