import Button from '../ui/Button';
import ModalPortal from './ModalPortal';

/**
 * Модальне вікно завершення гри (Win/Loss Modal).
 * Використовує {@link ModalPortal} для рендерингу. Відображає статистику поточної сесії
 * та надає варіанти подальших дій.
 * * @component
 * @param {Object} props - Властивості компонента.
 * @param {boolean} props.isOpen - Стан видимості модального вікна.
 * @param {Function} props.onClose - Функція для закриття вікна (напр. натискання на оверлей або Escape).
 * @param {boolean} props.isWinner - Прапорець перемоги (впливає на заголовок та кольори кнопок).
 * @param {number} props.score - Кількість набраних балів у поточній сесії.
 * @param {number} props.wordsGuessed - Загальна кількість вгаданих слів.
 * @param {string} props.correctWord - Правильне слово (відображається лише у разі програшу).
 * @param {Function} [props.onPlayAgain] - Продовжити гру з поточним рахунком (наступне слово).
 * @param {Function} [props.onRestart] - Скинути прогрес та почати нову гру.
 * @param {Function} [props.onMainMenu] - Повернення на головний екран.

 */
const GameOverModal = ({
                           isOpen,
                           onClose,
                           isWinner,
                           score,
                           wordsGuessed,
                           correctWord,
                           onPlayAgain,
                           onRestart,
                           onMainMenu
                       }) => {

    /** * Динамічно повертає текст заголовка залежно від результату.
     * @returns {string}
     */
    const getTitle = () => {
        if (isWinner) return 'Перемога!';
        return 'Гра завершена';
    };

    /** * Динамічно повертає повідомлення для користувача.
     * У разі програшу розкриває секретне слово.
     * @returns {string}
     */
    const getMessage = () => {
        if (isWinner) return 'Вітаємо! Ви вгадали слово!';
        return `Закінчилися спроби. Слово було: ${correctWord}`;
    };

    return (
        <ModalPortal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 id="modal-title" className="text-3xl font-bold mb-2">
                        {getTitle()}
                    </h2>
                    <p className="text-gray-600">
                        {getMessage()}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Рахунок</p>
                            <p className="text-2xl font-bold text-blue-600">{score}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Вгадано слів</p>
                            <p className="text-2xl font-bold text-green-600">{wordsGuessed}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <Button
                        onClick={() => {
                            onPlayAgain?.();
                            onClose?.();
                        }}
                        variant={isWinner ? "success" : "primary"}
                        className="w-full py-3"
                    >
                        {isWinner ? 'Наступне слово' : 'Спробувати ще раз'}
                    </Button>

                    <Button
                        onClick={() => {
                            onRestart?.();
                            onClose?.();
                        }}
                        variant="secondary"
                        className="w-full py-3"
                    >
                        Нова гра з початку
                    </Button>

                    <Button
                        onClick={() => {
                            onMainMenu?.();
                            onClose?.();
                        }}
                        variant="outline"
                        className="w-full py-3 border-gray-300 text-gray-700"
                    >
                        Головне меню
                    </Button>
                </div>
            </div>
        </ModalPortal>
    );
};

export default GameOverModal;