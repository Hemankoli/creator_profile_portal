import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCreators } from '../context/CreatorContext';


export default function CreatorDetails() {
    const { id } = useParams();
    const { creators } = useCreators();
    const [creator, setCreator] = useState(null);


    useEffect(() => {
        const found = creators.find(c => String(c.id) === String(id));
        if (found) {
            setCreator(found);
        } else {
            setCreator([]);
        }
    }, [creators, id]);


    if (!creator) return <div className="text-center py-20 text-gray-500">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-[#0B1224] shadow-lg rounded-sm p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                    {creator.media && creator.media.length > 0 ? (
                        <img
                            src={creator.media[0]}
                            alt={creator.name}
                            className="rounded-xl w-full h-64 object-cover"
                        />
                    ) : (
                        <div className="h-64 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
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
                        <span className="text-xl font-semibold text-blue-600">₹{creator.price}</span>
                        <Link
                            to={`/edit/${creator.id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded transition bg-gradient-to-r from-indigo-600 to-purple-600"
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
            {creator.media && creator.media.length > 1 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {creator.media.slice(1).map((m, i) => (
                        <img key={i} src={m} alt="Media" className="rounded-lg w-full h-40 object-cover" />
                    ))}
                </div>
            )}
        </div>
    );
}