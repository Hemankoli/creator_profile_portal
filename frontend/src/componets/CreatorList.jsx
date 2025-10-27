import React from 'react';
import { useCreators } from '../context/CreatorContext';
import Card from '../shared/Card';
import Pagination from '../shared/Pagination';

export default function CreatorList() {
    const { creators, loading, query, setQuery } = useCreators();

    return (
        <div className="p-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Creators</h2>
                <input
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    placeholder="Search creators..."
                    className="border rounded-md p-2 bg-gray-900 outline-none border-blue-600"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div>Loading...</div>
                ) : creators.length > 0 ? (
                    creators.map(c => <Card key={c.id} creator={c} />)
                ) : (
                    <div className="text-gray-400 col-span-full text-center">No creators found</div>
                )}
            </div>
            <Pagination />
        </div>
    );
}
