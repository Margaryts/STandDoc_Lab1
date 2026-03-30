import { PAGES } from '../constants';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageWrapper from '../components/layout/PageWrapper';
import HangmanDrawing from '../components/game/HangmanDrawing';
import WordDisplay from '../components/game/WordDisplay';
import Keyboard from '../components/game/Keyboard';
import GameStats from '../components/game/GameStats';

/**
 * Головний ігровий екран "Шибениця".
 * Керує відображенням процесу гри, візуалізацією шибениці, клавіатурою та станами перемоги/програшу.
 * * @component
 * @param {Object} props - Властивості компонента.
 * @param {Function} props.onNavigate - Функція для перемикання між сторінками.
 * @param {string} props.word - Секретне слово, яке потрібно вгадати.
 * @param {string[]} props.guessedLetters - Масив літер, які вже вибрав гравець.
 * @param {number} props.wrongGuesses - Кількість помилкових спроб.
 * @param {Function} props.onLetterGuess - Функція, що викликається при натисканні на літеру.
 * @param {number} props.score - Поточні бали гравця.
 * @param {number} props.level - Поточний ігровий рівень.
 * @param {boolean} props.isGameOver - Чи вичерпано ліміт спроб.
 * @param {boolean} props.isWinner - Чи вгадано слово повністю.
 * @param {number} [props.maxAttempts=6] - Максимально дозволена кількість помилок.
 * @param {boolean} [props.showHints=false] - Чи дозволені автоматичні підказки.
 * @param {boolean} [props.showFirstLetter=false] - Чи показувати першу літеру як бонус.
 * @param {string} [props.userId] - ID користувача для статистики.
 */
const GamePage = ({
                      onNavigate,
                      word,
                      guessedLetters,
                      wrongGuesses,
                      onLetterGuess,
                      score,
                      level,
                      isGameOver,
                      isWinner,
                      maxAttempts = 6,
                      showHints = false,
                      showFirstLetter = false,
                      allowSpecialCharacters = true,
                      hasSpecialCharacters = false,
                      userId
                  }) => {

    /** Прапорець, що блокує взаємодію з грою після завершення сесії */
    const gameDisabled = isGameOver || isWinner;

    /** Логіка відображення підказки після 3-х помилок */
    const showHintAfterMistakes = showHints && wrongGuesses >= 3 && word && !guessedLetters.includes(word[0]);

    /** Логіка відображення першої літери, якщо це увімкнено в налаштуваннях */
    const showFirstLetterHint = showFirstLetter && word && !guessedLetters.includes(word[0]);

    /** Інформація про наявність апострофа у слові */
    const showSpecialCharInfo = allowSpecialCharacters && hasSpecialCharacters && !guessedLetters.includes("'");

    /**
     * Рендерить блок з поточною конфігурацією гри.
     * @returns {JSX.Element}
     */
    const renderSettingsInfo = () => (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm font-medium text-blue-800">
                        Поточні налаштування:
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {maxAttempts} спроб
                        </span>
                        {showHints && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                Підказки
                            </span>
                        )}
                        {showFirstLetter && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                Перша літера
                            </span>
                        )}
                    </div>
                </div>
                <Button
                    variant="secondary"
                    onClick={() => onNavigate(PAGES.SETTINGS)}
                    className="text-sm px-4 py-2"
                >
                    Змінити
                </Button>
            </div>
        </div>
    );

    return (
        <PageWrapper>
            <Card>
                {/* Header Section */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Шибениця</h1>
                    <p className="text-gray-600">Вгадайте українське слово</p>
                    {userId && userId !== 'default' && (
                        <p className="text-sm text-blue-600 mt-1">Користувач: {userId}</p>
                    )}
                </div>

                {renderSettingsInfo()}

                <GameStats score={score} level={level} />

                {/* Візуалізація стану шибениці */}
                <HangmanDrawing wrongGuesses={wrongGuesses} maxAttempts={maxAttempts} />

                {/* Hint System */}
                {(showHintAfterMistakes || showFirstLetterHint || showSpecialCharInfo) && (
                    <div className="space-y-3 mb-6">
                        {showFirstLetterHint && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg animate-pulse">
                                <p className="text-green-700 text-sm text-center">
                                    Перша літера слова: <span className="font-bold text-xl">{word[0]}</span>
                                </p>
                            </div>
                        )}

                        {showHintAfterMistakes && !showFirstLetterHint && (
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-yellow-700 text-sm text-center">
                                    Підказка: перша літера - <span className="font-bold text-xl">{word[0]}</span>
                                </p>
                            </div>
                        )}

                        {showSpecialCharInfo && (
                            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                                <p className="text-purple-700 text-sm text-center">
                                    Підказка: слово містить апостроф (')
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Word Display Section */}
                <WordDisplay
                    word={word}
                    guessedLetters={guessedLetters}
                    allowSpecialCharacters={allowSpecialCharacters}
                />

                {/* Win/Loss Messages */}
                {isWinner && (
                    <div className="text-center my-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm">
                        <p className="text-2xl font-bold text-green-600 mb-2">Вітаємо!</p>
                        <p className="text-gray-700 mb-3">
                            Ви вгадали слово: <strong className="text-green-700 text-xl">{word}</strong>
                        </p>
                    </div>
                )}

                {isGameOver && !isWinner && (
                    <div className="text-center my-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl shadow-sm">
                        <p className="text-2xl font-bold text-red-600 mb-2">Гру завершено</p>
                        <p className="text-gray-700 mb-3">
                            Слово було: <strong className="text-red-700 text-xl">{word}</strong>
                        </p>
                    </div>
                )}

                {/* Interaction Section */}
                <div className="my-8">
                    <Keyboard
                        onLetterClick={onLetterGuess}
                        usedLetters={guessedLetters}
                        disabled={gameDisabled}
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
                    <Button variant="secondary" onClick={() => onNavigate(PAGES.START)} className="px-6 py-3 flex-1">
                        Головне меню
                    </Button>

                    <Button variant="primary" onClick={() => onNavigate(PAGES.SETTINGS)} className="px-6 py-3 flex-1">
                        Налаштування
                    </Button>
                </div>
            </Card>
        </PageWrapper>
    );
};

export default GamePage;