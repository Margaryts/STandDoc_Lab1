import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageWrapper from '../components/layout/PageWrapper';

/**
 * Компонент стартової сторінки гри "Шибениця".
 * Відображає головне меню, вибір складності та ідентифікатор користувача.
 * * @component
 * @param {Object} props - Властивості компонента.
 * @param {Function} props.onNavigate - Функція для перемикання між екранами гри (напр. 'GAME', 'SETTINGS').
 * @param {'easy' | 'medium' | 'hard'} props.difficulty - Поточний обраний рівень складності.
 * @param {Function} props.onDifficultyChange - Колбек-функція, що викликається при зміні складності.
 * @param {string} [props.userId] - Унікальний ідентифікатор користувача для відображення у профілі.
 */
const StartPage = ({ onNavigate, difficulty, onDifficultyChange, userId }) => (
    <PageWrapper>
        <Card>
            <div className="text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-2">Шибениця</h1>
                <p className="text-gray-600 mb-2">Вгадай українське слово!</p>

                {/* Відображення ID користувача, якщо він авторизований */}
                {userId && userId !== 'default' && (
                    <p className="text-sm text-blue-600 mb-6">Користувач: {userId}</p>
                )}

                {/* Секція вибору складності */}
                <div className="mb-10">
                    <p className="text-sm text-gray-500 mb-4">ОБЕРІТЬ СКЛАДНІСТЬ:</p>
                    <div className="flex gap-3 justify-center">
                        {[
                            { value: 'easy', label: 'Легко', desc: 'Короткі слова', color: 'green' },
                            { value: 'medium', label: 'Середньо', desc: 'Середні слова', color: 'blue' },
                            { value: 'hard', label: 'Важко', desc: 'Довгі слова', color: 'red' }
                        ].map(({ value, label, desc, color }) => (
                            <button
                                key={value}
                                onClick={() => onDifficultyChange(value)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                                    difficulty === value
                                        ? `bg-${color}-600 text-white shadow-lg`
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                title={desc}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Поточна складність: <span className="font-semibold">
                        {difficulty === 'easy' ? 'Легко' : difficulty === 'medium' ? 'Середньо' : 'Важко'}
                        </span>
                    </p>
                </div>

                {/* Основна навігація гри */}
                <div className="space-y-4 max-w-xs mx-auto">
                    <Button
                        onClick={() => onNavigate('GAME')}
                        variant="primary"
                        className="w-full py-4 text-lg"
                    >
                        Почати гру
                    </Button>

                    <Button
                        onClick={() => onNavigate('SETTINGS')}
                        variant="secondary"
                        className="w-full py-4 text-lg"
                    >
                        Налаштування
                    </Button>

                    <Button
                        onClick={() => onNavigate('RESULTS_TABLE')}
                        variant="outline"
                        className="w-full py-4 text-lg border-gray-300"
                    >
                        Таблиця результатів
                    </Button>
                </div>

            </div>
        </Card>
    </PageWrapper>
);

export default StartPage;