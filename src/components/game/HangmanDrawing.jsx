/**
 * Компонент візуалізації шибениці за допомогою SVG.
 * Динамічно відображає частини тіла персонажа залежно від кількості помилкових спроб.
 * * @component
 * @param {Object} props - Властивості компонента.
 * @param {number} props.wrongGuesses - Поточна кількість неправильних відповідей.
 * @param {number} [props.maxAttempts=6] - Максимально можлива кількість спроб (впливає на те, які частини тіла будуть показані).
 * * @example
 * // Відобразить голову та тулуб (2 помилки)
 * <HangmanDrawing wrongGuesses={2} maxAttempts={6} />
 */
const HangmanDrawing = ({ wrongGuesses, maxAttempts = 6 }) => {
    /**
     * Масив частин тіла, представлених як SVG-елементи.
     * Кожен елемент з'являється лише тоді, коли кількість помилок досягає відповідного порогу.
     * @type {JSX.Element[]}
     */
    const parts = [
        wrongGuesses >= 1 && <circle key="head" cx="140" cy="60" r="20" stroke="black" strokeWidth="3" fill="none" />,
        wrongGuesses >= 2 && <line key="body" x1="140" y1="80" x2="140" y2="130" stroke="black" strokeWidth="3" />,
        wrongGuesses >= 3 && <line key="left-arm" x1="140" y1="90" x2="110" y2="110" stroke="black" strokeWidth="3" />,
        wrongGuesses >= 4 && <line key="right-arm" x1="140" y1="90" x2="170" y2="110" stroke="black" strokeWidth="3" />,
        wrongGuesses >= 5 && <line key="left-leg" x1="140" y1="130" x2="110" y2="160" stroke="black" strokeWidth="3" />,
        wrongGuesses >= 6 && <line key="right-leg" x1="140" y1="130" x2="170" y2="160" stroke="black" strokeWidth="3" />,
        // Додаткові деталі для режимів з великою кількістю спроб
        wrongGuesses >= 7 && maxAttempts >= 7 && <circle key="eye1" cx="132" cy="55" r="3" stroke="black" strokeWidth="2" fill="black" />,
        wrongGuesses >= 8 && maxAttempts >= 8 && <circle key="eye2" cx="148" cy="55" r="3" stroke="black" strokeWidth="2" fill="black" />,
        wrongGuesses >= 9 && maxAttempts >= 9 && <path key="mouth" d="M 132 70 Q 140 75 148 70" stroke="black" strokeWidth="2" fill="none" />
    ];

    /** Відфільтрований список частин відповідно до ліміту спроб, встановленого користувачем */
    const filteredParts = parts.slice(0, maxAttempts);

    return (
        <div className="flex flex-col items-center my-6">
            <svg width="200" height="250" className="border-2 border-gray-300 rounded bg-gray-50">
                {/* Статичні елементи конструкції (шибениця) */}
                <line x1="10" y1="230" x2="150" y2="230" stroke="black" strokeWidth="4"/>
                <line x1="80" y1="230" x2="80" y2="20" stroke="black" strokeWidth="4"/>
                <line x1="80" y1="20" x2="140" y2="20" stroke="black" strokeWidth="4"/>
                <line x1="140" y1="20" x2="140" y2="40" stroke="black" strokeWidth="4"/>

                {/* Динамічні частини персонажа */}
                {filteredParts}
            </svg>

            {/* Текстовий лічильник спроб */}
            <p className="text-gray-600 mt-3">
                Спроби: {maxAttempts - wrongGuesses} / {maxAttempts}
            </p>

            {/* Додаткова інформація при нестандартних налаштуваннях */}
            {maxAttempts !== 6 && (
                <p className="text-xs text-gray-500 mt-1">
                    (Налаштування: {maxAttempts} спроб)
                </p>
            )}
        </div>
    );
};

export default HangmanDrawing;