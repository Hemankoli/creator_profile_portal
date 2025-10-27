import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCreators } from '../context/CreatorContext';
import { deleteCreator } from '../apis';


export default function CreatorDetails() {
    const { id } = useParams();
    const { creators, removeCreator } = useCreators();
    const [creator, setCreator] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const found = creators.find(c => String(c.id) === String(id));
        if (found) {
            setCreator(found);
        } else {
            setCreator([]);
        }
    }, [creators, id]);

    async function handleDelete(creatorId) {
        try {
            await deleteCreator(creatorId);
            await removeCreator(creatorId);
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }


    if (!creator) return <div className="text-center py-20 text-gray-500">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-[#0B1224] shadow-lg rounded-sm p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                    {creator?.media && creator?.media?.length > 0 ? (
                        <img
                            src={`${import.meta.env.VITE_API_BASE}${creator.media?.[0]}`}
                            alt={creator.name}
                            className="rounded w-full h-64 object-cover"
                        />
                    ) : (
                        <div className="h-64 bg-gray-200 flex items-center justify-center rounded text-gray-500">
                            No Image
                        </div>
                    )}
                </div>


                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{creator.name}</h2>
                        <p className="text-gray-600 mb-1">{creator.designation}</p>
                        <p className="text-gray-500 mb-4">{creator.about}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-semibold text-blue-600">₹{creator.price} / Month</span>
                        <div className='space-x-4'>
                            <Link
                                to={`/edit/${creator.id}`}
                                className="bg-blue-600 text-white px-4 py-2 rounded transition bg-gradient-to-r from-indigo-600 to-purple-600"
                            >
                                Edit
                            </Link>
                            <button
                                type="button"
                                onClick={()=> handleDelete(creator.id)}
                                className="text-white px-4 py-2 rounded transition bg-red-500 hover-bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {creator?.media && creator?.media?.length > 1 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {creator?.media?.slice(1)?.map((m, i) => (
                        <img key={i} src={m} alt="Media" className="rounded-lg w-full h-40 object-cover" />
                    ))}
                </div>
            )}
        </div>
    );
}