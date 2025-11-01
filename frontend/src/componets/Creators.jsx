import React from 'react'

export default function Creators({data}) {
    return (
        <div>
            {data.length === 0 ? (
                <p className="text-white text-center">You haven’t added any creators yet.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((c) => (
                        <div
                            key={c.id}
                            className="border-2 border-gray-700 p-5 rounded shadow-md hover:shadow-xl transition"
                        >
                            {c?.media && c?.media?.length > 0 ? (
                                <img
                                    src={`${import.meta.env.VITE_API_BASE}${c.media?.[0]}`}
                                    alt={c.name}
                                    className="rounded w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="h-48 bg-gray-200 flex items-center justify-center rounded text-gray-500">
                                    No Image
                                </div>
                            )
                            }
                            <h4 className="font-bold text-lg text-white">{c.name}</h4>
                            <p className="text-sm text-white mb-1">
                                {c.designation || "No designation"}
                            </p>
                            <p className="text-gray-500 text-sm line-clamp-2">{c.about}</p>
                            <p className="mt-2 font-medium text-indigo-600">₹{c.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
