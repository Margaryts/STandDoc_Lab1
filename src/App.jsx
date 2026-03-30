import CookieConsent from "react-cookie-consent";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentGame,
  selectIsGameOver,
  selectIsWinner,
  selectGuessedLetters,
  selectWrongGuesses,
  guessLetter,
  resetGame,
  setGameWord,
  setMaxAttempts
} from './store/slices/gameSlice';
import {
  selectSettings,
  setDifficulty
} from './store/slices/settingsSlice';
import {
  selectCurrentUser,
  selectCurrentUserStats,
  setCurrentUser,
  updateUserStats,
  incrementGamesPlayed
} from './store/slices/userSlice';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import SettingsPage from './pages/SettingsPage';
import ResultsTablePage from './pages/ResultsTablePage';
import GameOverModal from './components/modals/GameOverModal';
import UserSelector from './components/UserSelector';
import { WORD_CATEGORIES } from './constants';

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UserSelector />} />
          <Route path="/user/:userId/*" element={<AppContent />} />
        </Routes>
      </Router>
  );
}

function AppContent() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const userStats = useSelector(selectCurrentUserStats);
  const gameState = useSelector(selectCurrentGame);
  const isGameOver = useSelector(selectIsGameOver);
  const isWinner = useSelector(selectIsWinner);
  const guessedLetters = useSelector(selectGuessedLetters);
  const wrongGuesses = useSelector(selectWrongGuesses);
  const settings = useSelector(selectSettings);

  const [currentPage, setCurrentPage] = useState('START');
  const [gameResult, setGameResult] = useState(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);

  const gameProcessedRef = useRef(false);
  const hasWordRef = useRef(false);

  useEffect(() => {
    if (userId && userId !== currentUser) {
      dispatch(setCurrentUser(userId));
    }
  }, [userId, currentUser, dispatch]);

  useEffect(() => {
    if (currentPage === 'GAME' && !gameState.word) {
      const words = WORD_CATEGORIES[settings.difficulty] || WORD_CATEGORIES.medium;
      const randomWord = words[Math.floor(Math.random() * words.length)];
      dispatch(setGameWord(randomWord));
      dispatch(incrementGamesPlayed(currentUser));
      hasWordRef.current = true;
      gameProcessedRef.current = false;
    }
  }, [currentPage, settings.difficulty, dispatch, currentUser]);

  const calculateScore = (wrongGuesses, wordLength) => {
    const baseScore = wordLength * 10;
    const penalty = wrongGuesses * 5;
    return Math.max(baseScore - penalty, 10);
  };

  const handlePlayAgain = () => {
    dispatch(resetGame());
    gameProcessedRef.current = false;
    hasWordRef.current = false;
    setShowGameOverModal(false);

    const words = WORD_CATEGORIES[settings.difficulty] || WORD_CATEGORIES.medium;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    dispatch(setGameWord(randomWord));
  };

  const handleRestartGame = () => {
    dispatch(updateUserStats({
      userId: currentUser,
      score: 0,
      wordsGuessed: 0,
      level: 1
    }));
    dispatch(resetGame());
    gameProcessedRef.current = false;
    hasWordRef.current = false;
    setShowGameOverModal(false);
  };

  const handleMainMenu = () => {
    setCurrentPage('START');
    setShowGameOverModal(false);
    gameProcessedRef.current = false;
    hasWordRef.current = false;
  };

  const handleLetterGuess = (letter) => {
    dispatch(guessLetter(letter));
  };

  const handleDifficultyChange = (newDifficulty) => {
    dispatch(setDifficulty(newDifficulty));
    dispatch(setMaxAttempts(settings.maxAttempts));
    if (currentPage === 'GAME') {
      dispatch(resetGame());
      gameProcessedRef.current = false;
      hasWordRef.current = false;
    }
  };

  const checkGameResult = useCallback(() => {
    if (currentPage === 'GAME' && gameState.word && !gameProcessedRef.current) {
      if (isGameOver || isWinner) {
        gameProcessedRef.current = true;

        const points = isWinner ? calculateScore(wrongGuesses, gameState.word.length) : 0;

        if (isWinner) {
          dispatch(updateUserStats({
            userId: currentUser,
            score: userStats.score + points,
            wordsGuessed: userStats.wordsGuessed + 1,
            level: userStats.wordsGuessed >= 5 ? userStats.level + 1 : userStats.level
          }));
        }

        const result = {
          isWinner,
          score: userStats.score + (isWinner ? points : 0),
          wordsGuessed: userStats.wordsGuessed + (isWinner ? 1 : 0),
          correctWord: gameState.word,
          reason: isGameOver ? 'attempts' : 'winner',
          userId: currentUser
        };

        setCurrentResult(result);
        setGameResult({ isWinner, finalScore: result.score, words: result.wordsGuessed });
        setShowGameOverModal(true);
      }
    }
  }, [currentPage, gameState.word, isGameOver, isWinner, wrongGuesses, currentUser, userStats, dispatch]);

  useEffect(() => {
    if (isGameOver || isWinner) {
      checkGameResult();
    }
  }, [isGameOver, isWinner, checkGameResult]);

  const navigate = (page) => {
    if (page === 'GAME') {
      gameProcessedRef.current = false;
      hasWordRef.current = false;
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'START':
        return (
            <StartPage
                onNavigate={navigate}
                difficulty={settings.difficulty}
                onDifficultyChange={handleDifficultyChange}
                userId={currentUser}
            />
        );

      case 'GAME':
        return (
            <>
              <GamePage
                  onNavigate={navigate}
                  word={gameState.word}
                  guessedLetters={guessedLetters}
                  wrongGuesses={wrongGuesses}
                  onLetterGuess={handleLetterGuess}
                  score={userStats.score}
                  level={userStats.level}
                  isGameOver={isGameOver}
                  isWinner={isWinner}
                  maxAttempts={settings.maxAttempts}
                  showHints={settings.showHints}
                  showFirstLetter={settings.showFirstLetter}
                  allowSpecialCharacters={settings.allowSpecialCharacters}
                  hasSpecialCharacters={gameState.word ? gameState.word.includes("'") : false}
                  userId={currentUser}
              />

              {currentResult && (
                  <GameOverModal
                      isOpen={showGameOverModal}
                      onClose={() => setShowGameOverModal(false)}
                      isWinner={currentResult.isWinner}
                      score={currentResult.score}
                      wordsGuessed={currentResult.wordsGuessed}
                      correctWord={currentResult.correctWord}
                      onPlayAgain={handlePlayAgain}
                      onRestart={handleRestartGame}
                      onMainMenu={handleMainMenu}
                  />
              )}
            </>
        );

      case 'RESULTS':
        return (
            <ResultsPage
                onNavigate={navigate}
                gameResult={gameResult}
                onPlayAgain={handlePlayAgain}
                userId={currentUser}
            />
        );

      case 'SETTINGS':
        return <SettingsPage onNavigate={navigate} settings={settings} userId={currentUser} />;

      case 'RESULTS_TABLE':
        return <ResultsTablePage onNavigate={navigate} userId={currentUser} />;

      default:
        return <StartPage onNavigate={navigate} difficulty={settings.difficulty} userId={currentUser} />;
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        {currentUser && (
            <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg px-4 py-2 z-50">
              <div className="text-sm text-gray-600">Користувач:</div>
              <div className="font-bold text-blue-600">{currentUser}</div>
              <div className="text-xs text-gray-500 mt-1">
                Рахунок: {userStats.score} | Рівень: {userStats.level}
              </div>
              <button
                  onClick={() => window.location.href = '/users'}
                  className="text-xs text-blue-500 hover:text-blue-700 mt-1"
              >
                Змінити користувача
              </button>
            </div>
        )}

        {/* GDPR Cookie popup */}
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            cookieName="KOPLab1Cookie"
            style={{ background: "#2B373B", color: "#ffffff", textAlign: "center" }}
            buttonStyle={{
              color: "#ffffff",
              backgroundColor: "#4CAF50",
              fontSize: "14px",
              padding: "8px 16px",
              borderRadius: "5px",
            }}
            expires={150}
        >
          This app uses cookies to enhance the user experience and comply with GDPR.
        </CookieConsent>

        {renderPage()}
      </div>
  );
}