import { useSelector } from 'react-redux';
import { selectAllUsers } from '../store/slices/userSlice';
import Card from './ui/Card';

const ResultsTable = () => {
    const allUsers = useSelector(selectAllUsers);

    const usersArray = Object.entries(allUsers)
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.score - a.score); // Сортуємо за рахунком

    return (
        <Card>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Таблиця результатів</h2>
                <p className="text-gray-600">Рейтинг гравців</p>
            </div>

            {usersArray.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">Ще немає результатів</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Місце
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Гравець
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Рахунок
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Рівень
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Вгадано слів
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ігор зіграно
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {usersArray.map((user, index) => (
                            <tr key={user.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                                            index === 0 ? 'bg-yellow-100 text-yellow-800' :
                                                index === 1 ? 'bg-gray-100 text-gray-800' :
                                                    index === 2 ? 'bg-orange-100 text-orange-800' :
                                                        'bg-blue-100 text-blue-800'
                                        }`}>
                                            <span className="font-bold">{index + 1}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.score}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.level}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.wordsGuessed}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.gamesPlayed}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <div className="h-4 w-4 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center mr-2">
                            <span className="text-xs font-bold">1</span>
                        </div>
                        <span>Перше місце</span>
                    </div>
                    <div className="flex items-center">
                        <div className="h-4 w-4 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center mr-2">
                            <span className="text-xs font-bold">2</span>
                        </div>
                        <span>Друге місце</span>
                    </div>
                    <div className="flex items-center">
                        <div className="h-4 w-4 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center mr-2">
                            <span className="text-xs font-bold">3</span>
                        </div>
                        <span>Третє місце</span>
                    </div>
                    <div className="flex items-center">
                        <div className="h-4 w-4 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-2">
                            <span className="text-xs font-bold">4+</span>
                        </div>
                        <span>Інші гравці</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ResultsTable;