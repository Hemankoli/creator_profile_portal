import React, { Activity, useEffect, useState } from "react";
import { useCreators } from "../context/CreatorContext";
import { useNavigate } from "react-router-dom";
import { Creators, Log } from "../componets";


export default function Account() {
    const { creators, user, setUser } = useCreators();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [tab, setTab] = useState('creator')

    useEffect(() => {
        const items = creators.filter((itm) => (String(itm?.userId)) === String(user?.id))
        if (items) {
            setData(items)
        } else {
            setData([])
        }
    }, [creators])

    function handleDelete() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        setUser(null);
    }

    return (
        <div className="min-h-screen py-10 px-4 md:px-20 text-white">
            <div className="max-w-5xl mx-auto">
                <div className="rounded border-2 border-gray-700 p-6 mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Hello, {user?.name}
                        </h2>
                        <p className="text-gray-500 mt-1">
                            View and manage your uploaded creators below.
                        </p>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>

                <div>
                    <div className="flex items-center gap-4 border-b border-gray-700 mb-6">
                        <button onClick={() => setTab("creator")} className={`text-xl font-semibold  ${tab === "creator" ? 'text-green-600 border-b border-green-400' : ''}`}>
                            Your Uploaded Creators
                        </button>
                        {user?.role === "admin" &&
                            (
                                <button onClick={() => setTab("log")} className={`text-xl font-semibold  ${tab === "log" ? 'text-green-600 border-b border-green-400' : ''}`}>
                                    Logs
                                </button>
                            )}
                    </div>
                    <Activity mode={tab === "creator" ? "visible" : "hidden"}>
                        <Creators data={data} />
                    </Activity>
                    <Activity mode={tab === "log" ? "visible" : "hidden"}>
                        <Log />
                    </Activity>
                </div>
            </div>
        </div>
    );
}
