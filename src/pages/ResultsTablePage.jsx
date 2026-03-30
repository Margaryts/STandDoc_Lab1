import PageWrapper from '../components/layout/PageWrapper';
import ResultsTable from '../components/ResultsTable';
import Button from '../components/ui/Button';

const ResultsTablePage = ({ onNavigate, userId }) => {
    return (
        <PageWrapper>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Таблиця результатів</h1>
                    <p className="text-gray-600 mt-2">Рейтинг всіх гравців</p>
                    {userId && userId !== 'default' && (
                        <p className="text-sm text-blue-600 mt-1">Поточний користувач: {userId}</p>
                    )}
                </div>

                <ResultsTable />

                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={() => onNavigate('START')}
                        variant="primary"
                        className="px-8 py-3"
                    >
                        На головну
                    </Button>
                </div>
            </div>
        </PageWrapper>
    );
};

export default ResultsTablePage;