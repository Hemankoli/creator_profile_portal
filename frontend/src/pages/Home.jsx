import React, { useEffect, useState } from 'react';
import { useCreators } from '../context/CreatorContext';
import Card from '../shared/Card';
import Pagination from '../shared/Pagination';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Home() {
    const { creators, loading, query, setQuery } = useCreators();
    const [sorting, setSorting] = useState('asc');
    const [newCreaters, setNewCreaters] = useState([])

    useEffect(() => {
        const data = [...creators].sort((a, b) => {
            return sorting === "asc" ? b?.price - a?.price : a?.price - b?.price
        });
        setNewCreaters(data);
    }, [creators, sorting])

    return (
        <div className="p-2">
            <div className="flex justify-between flex-col md:flex-row md:items-center items-start mb-4">
                <h2 className="text-2xl font-semibold">Creators</h2>
                <div className='flex items-center justify-between mt-4 gap-4'>
                    <input
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        placeholder="Search creators..."
                        className="border rounded-md p-2 bg-gray-900 outline-none border-blue-600"
                    />
                    <button onClick={() => setSorting(sorting === 'asc' ? 'desc' : 'asc')}
                        className="border rounded-md flex items-center gap-2 p-2 bg-gray-900 outline-none border-blue-600">
                        Sort {sorting === "asc" ? <FaArrowUp /> : <FaArrowDown />}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div>Loading...</div>
                ) : newCreaters.length > 0 ? (
                    newCreaters.map(c => <Card key={c.id} creator={c} />)
                ) : (
                    <div className="text-gray-400 col-span-full text-center">No creators found</div>
                )}
            </div>
            <Pagination />
        </div>
    );
}
