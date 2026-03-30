import { PAGES } from '../constants';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageWrapper from '../components/layout/PageWrapper';

/**
 * Компонент сторінки результатів гри.
 * Відображає фінальний статус (перемога/програш), набрані бали та кількість вгаданих слів.
 * * @component
 * @param {Object} props - Властивості компонента.
 * @param {Function} props.onNavigate - Функція для переходу між сторінками додатку.
 * @param {Object} props.gameResult - Об'єкт з даними завершеної ігрової сесії.
 * @param {boolean} props.gameResult.isWinner - Чи закінчилася гра перемогою.
 * @param {number} props.gameResult.finalScore - Кількість набраних балів за гру.
 * @param {number} props.gameResult.words - Загальна кількість вгаданих слів.
 * @param {Function} props.onPlayAgain - Функція для швидкого перезапуску гри з тими ж налаштуваннями.
 * @param {string} [props.userId] - Ідентифікатор користувача для відображення персоналізованих результатів.
 */
const ResultsPage = ({ onNavigate, gameResult, onPlayAgain, userId }) => {
    /** * Деструктуризація результатів гри з дефолтними значеннями
     * для запобігання помилкам рендерингу, якщо дані не передані.
     */
    const { isWinner, finalScore, words } = gameResult || { isWinner: false, finalScore: 0, words: 0 };

    return (
        <PageWrapper>
            <Card>
                <div className="text-center">
                    {/* Відображення ID користувача, якщо він доступний */}
                    {userId && userId !== 'default' && (
                        <p className="text-sm text-blue-600 mb-4">Користувач: {userId}</p>
                    )}

                    {/* Емодзі-статус залежно від результату гри */}
                    <div className="text-6xl mb-4">
                        {isWinner ? '🎉' : '😕'}
                    </div>

                    <h2 className="text-3xl font-bold mb-2">
                        {isWinner ? 'Перемога!' : 'Гру завершено'}
                    </h2>

                    <p className="text-gray-600 mb-8">
                        {isWinner
                            ? 'Вітаємо! Ви вгадали слово!'
                            : 'Не засмучуйтесь, спробуйте ще раз!'}
                    </p>

                    {/* Статистичний блок */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Фінальний рахунок</p>
                                <p className="text-3xl font-bold text-blue-600">{finalScore}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Вгадано слів</p>
                                <p className="text-3xl font-bold text-green-600">{words}</p>
                            </div>
                        </div>
                    </div>

                    {/* Навігаційна панель */}
                    <div className="space-y-3">
                        <Button onClick={onPlayAgain} variant="success" className="w-full py-3">
                            Грати знову
                        </Button>
                        <div>
                            <Button onClick={() => onNavigate(PAGES.START)} variant="secondary" className="w-full py-3">
                                На головну
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => onNavigate(PAGES.SETTINGS)} variant="outline" className="w-full py-3 border-gray-300">
                                Налаштування
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </PageWrapper>
    );
};

export default ResultsPage;