const WordDisplay = ({ word, guessedLetters, allowSpecialCharacters = true }) => {
    if (!word) return null;

    return (
        <div className="flex justify-center gap-3 my-6 flex-wrap">
            {word.split('').map((letter, index) => {
                const isGuessed = guessedLetters.includes(letter);
                const isSpecialChar = letter === '\'' && allowSpecialCharacters;
                const showLetter = isGuessed || isSpecialChar;

                return (
                    <div
                        key={index}
                        className={`w-12 h-16 border-b-4 ${
                            isSpecialChar
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-blue-500'
                        } flex items-center justify-center text-3xl font-bold transition-all duration-300 ${
                            showLetter
                                ? isSpecialChar
                                    ? 'text-purple-700 transform scale-110'
                                    : 'text-gray-800'
                                : 'text-transparent'
                        } ${!showLetter ? 'animate-pulse' : ''}`}
                    >
                        {isSpecialChar ? "'" : (showLetter ? letter : '')}
                        {isSpecialChar && (
                            <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                ?
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default WordDisplay;