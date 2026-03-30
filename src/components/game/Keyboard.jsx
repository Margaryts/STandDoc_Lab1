import { UKRAINIAN_ALPHABET } from '../../constants';

/**
 * Компонент ігрової клавіатури.
 * Генерує сітку кнопок для кожної літери українського алфавіту.
 * * @component
 * @param {Object} props - Властивості компонента.
 * @param {Function} props.onLetterClick - Функція, що викликається при натисканні на вільну літеру.
 * @param {string[]} props.usedLetters - Масив літер, які вже були використані гравцем.
 * @param {boolean} props.disabled - Прапорець для повного блокування клавіатури (наприклад, після завершення гри).
 */
const Keyboard = ({ onLetterClick, usedLetters, disabled }) => (
    <div className="flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
        {UKRAINIAN_ALPHABET.map((letter) => {
            /** Перевірка, чи була ця літера вже обрана раніше */
            const isUsed = usedLetters.includes(letter);

            return (
                <button
                    key={letter}
                    onClick={() => onLetterClick(letter)}
                    disabled={isUsed || disabled}
                    className={`w-10 h-10 rounded font-semibold transition ${
                        isUsed
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                    } ${disabled && !isUsed ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {letter}
                </button>
            );
        })}
    </div>
);

export default Keyboard;