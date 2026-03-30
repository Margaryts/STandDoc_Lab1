const GameStats = ({ score, level }) => (
    <div className="flex gap-6 justify-center text-gray-600 mb-4">
        <div className="text-center">
            <p className="text-sm">Рахунок</p>
            <p className="text-2xl font-bold text-blue-600">{score}</p>
        </div>
        <div className="text-center">
            <p className="text-sm">Рівень</p>
            <p className="text-2xl font-bold text-blue-600">{level}</p>
        </div>
    </div>
);

export default GameStats;