import React, { useEffect, useState } from 'react';
import { useCreators } from '../context/CreatorContext';
import Card from '../shared/Card';
import Pagination from '../shared/Pagination';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Home() {
    const { creators, loading, query, setQuery, allFava } = useCreators();
    const [sorting, setSorting] = useState('asc');
    const [filtered, setFiltered] = useState('All');
    const [newCreators, setNewCreators] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    const filters = ["All", "Software Enginner", "Photographer", "Fashion Designer"];

    useEffect(() => {
        let data = [...creators];

        if (filtered !== "All") {
            data = data.filter((item) => item?.designation === filtered);
        }

        if (query) {
            data = data.filter((item) =>
                item?.name?.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (showFavorites && allFava.length > 0) {
            const favoriteIds = allFava.map(fav => String(fav.productId));
            data = data.filter(item => favoriteIds.includes(String(item.id)));
        }

        data.sort((a, b) =>
            sorting === "asc" ? a?.price - b?.price : b?.price - a?.price
        );

        setNewCreators(data);
    }, [creators, sorting, filtered, query, showFavorites, allFava]);

    return (
        <div className="p-4">
            <h2 className="text-3xl w-fit font-semibold mb-2 md:mb-10 bg-clip-text text-transparent bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500">
                Creators
            </h2>

            <div className="flex justify-between flex-col md:flex-row md:items-center items-start mb-4 gap-4">
                <div className='flex items-center gap-4 w-full max-w-[300px]'>
                    <input
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        placeholder="Search creators..."
                        className="border rounded-md p-2 bg-gray-900 w-full outline-none border-blue-600 text-white"
                    />
                    <button
                        onClick={() => setShowFavorites(prev => !prev)}
                        className={`border rounded-md flex items-center gap-2 p-2 outline-none text-white ${showFavorites ? 'bg-blue-600 border-blue-600' : 'bg-gray-900 border-blue-600'
                            }`}
                    >
                        {"Favorites"}
                    </button>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <select
                        value={filtered}
                        onChange={(e) => setFiltered(e.target.value)}
                        className="border rounded-md p-2 bg-gray-900 outline-none border-blue-600 text-white"
                    >
                        {filters.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => setSorting(sorting === 'asc' ? 'desc' : 'asc')}
                        className="border rounded-md flex items-center gap-2 p-2 bg-gray-900 outline-none border-blue-600 text-white"
                    >
                        Sort {sorting === "asc" ? <FaArrowUp /> : <FaArrowDown />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div>Loading...</div>
                ) : showFavorites && allFava.length === 0 ? (
                    <div className="text-gray-400 col-span-full text-center">
                        No favorites found
                    </div>)
                    : newCreators.length > 0 ? (
                        newCreators.map(c => (
                            <Card key={c.id} creator={c} />
                        ))
                    ) : (
                        <div className="text-gray-400 col-span-full text-center">
                            No creators found
                        </div>
                    )}
            </div>

            <Pagination />
        </div>
    );
}
