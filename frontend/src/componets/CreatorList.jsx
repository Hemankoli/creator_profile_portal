import React from 'react';
import { useCreators } from '../context/CreatorContext';
import Card from '../shared/Card';


export default function CreatorList() {
    const { creators, loading, meta, load, setQuery } = useCreators();
    return (
        <div className="p-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Creators</h2>
                <input onChange={e => setQuery(e.target.value)} placeholder="Search creators..." className="border rounded-md p-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? <div>Loading...</div> : creators.map(c => (
                    <Card key={c.id} creator={c} />
                ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
                <div>Showing {creators.length} of {meta.total}</div>
                <div className="flex gap-2">
                    <button onClick={() => load({ page: Math.max(1, meta.page - 1) })} className="px-3 py-1 border rounded">Prev</button>
                    <button onClick={() => load({ page: meta.page + 1 })} className="px-3 py-1 border rounded">Next</button>
                </div>
            </div>
        </div>
    )
}