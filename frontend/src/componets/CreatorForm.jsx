import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCreators } from '../context/CreatorContext';
import { createCreator, updateCreator } from '../apis';


export default function CreatorForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { creators } = useCreators();

    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        about: '',
        price: '',
        media: []
    });


    useEffect(() => {
        const found = creators.find(c => String(c.id) === String(id));
        if (found) {
            setFormData({
                name: found.name || '',
                designation: found.designation || '',
                about: found.about || '',
                price: found.price || '',
                media: []
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFiles = (e) => {
        setFormData({ ...formData, media: e.targetS.files });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            if (key === 'media') {
                for (let f of formData.media) data.append('media', f);
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            if (id) {
                await updateCreator(id, data);
            } else {
                await createCreator(data);
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Error saving creator');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-[#0B1224] shadow-lg rounded p-6">
            <h2 className="text-2xl font-bold mb-6">{id ? 'Edit Creator' : 'Add New Creator'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none text-black"
                        required
                    />
                </div>


                <div>
                    <label className="block font-medium">Designation</label>
                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none text-black"
                    />
                </div>
                <div>
                    <label className="block font-medium">About</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none text-black"
                        rows="4"
                    ></textarea>
                </div>


                <div>
                    <label className="block font-medium">Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none text-black"
                    />
                </div>

                <div>
                    <label className="block font-medium">Upload Media</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFiles}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none text-black"
                    />
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded transition bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                    {id ? 'Update Creator' : 'Add Creator'}
                </button>
            </form>
        </div>
    );
}
