import React from 'react'
import { useCreators } from '../context/CreatorContext'

export default function Log() {
    const { logs } = useCreators();
    
    function formTime(date) {
        if (!date) return "N/A";
        const dateFormed = date?.toDate ? date.toDate() : new Date(date);
        return dateFormed?.toLocaleDateString("en-US", {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }
    return (
        <div className="overflow-x-auto scrollbar-thin max-h-[600px] rounded border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th
                            className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                        >
                            Notifications
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-2 text-sm text-white align-top max-w-[300px] break-words"
                        >
                            <ul className="space-y-1 list-disc list-inside">
                                {logs?.map((item, i) => (
                                    <li key={i}>{item?.name} - {item?.changes} at {formTime(item?.createdAt)} </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
