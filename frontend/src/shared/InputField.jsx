import React from 'react'

export default function InputField({ labelName, name, type, value, method }) {
    return (
        <div>
            <label className="block font-medium">{labelName}</label>
            {type === "file" ? (
                <input
                    type={type}
                    name={name}
                    multiple
                    accept="image/*,video/*"
                    onChange={method}
                    className="w-full border bg-gray-900 border-blue-600 rounded-lg p-2 mt-1 outline-none"
                />) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={method}
                    className="w-full border bg-gray-900 border-blue-600 rounded-lg p-2 mt-1 outline-none"
                    required
                />)}
        </div>
    )
}
