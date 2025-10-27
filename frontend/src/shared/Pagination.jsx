import React from 'react'
import { useCreators } from '../context/CreatorContext';

export default function Pagination() {
    const { creators, meta, load } = useCreators();
    
    const isPrevDisabled = meta.page <= 1;
    const isNextDisabled = creators.length < meta.limit || meta.page >= meta.total;

    return (
        <div className="mt-6 flex justify-between items-center">
            <div>Showing {creators.length} of {meta.total}</div>
            <div className="flex gap-2">
                <button
                    onClick={() => !isPrevDisabled && load({ page: meta.page - 1 })}
                    disabled={isPrevDisabled}
                    className={`px-3 py-1 border rounded transition ${isPrevDisabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-blue-600 hover:text-white'
                        }`}
                >
                    Prev
                </button>

                <button
                    onClick={() => !isNextDisabled && load({ page: meta.page + 1 })}
                    disabled={isNextDisabled}
                    className={`px-3 py-1 border rounded transition ${isNextDisabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-blue-600 hover:text-white'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
