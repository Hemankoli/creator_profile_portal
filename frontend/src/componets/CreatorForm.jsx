import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreators } from '../context/CreatorContext';
import { createCreator, updateCreator } from '../apis';
import InputField from '../shared/InputField';


export default function CreatorForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { creators, addCreator, editCreator } = useCreators();

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
        setFormData({ ...formData, media: e.target.files });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("designation", formData.designation);
        data.append("about", formData.about);
        data.append("price", formData.price);

        for (let i = 0; i < formData.media.length; i++) {
            data.append("media", formData.media[i]);
        }
        try {
            if (id) {
                const updated = await updateCreator(id, data);
                await editCreator(updated)
            } else {
                const created = await createCreator(data);
                await addCreator(created)
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
               <InputField labelName={"Name"} type={"text"} name={"name"} value={formData.name} method={handleChange} />
               <InputField labelName={"Designation"} type={"text"} name={"designation"} value={formData.designation} method={handleChange} />
               <InputField labelName={"About"} type={"text"} name={"about"} value={formData.about} method={handleChange} />
               <InputField labelName={"Price (₹)"} type={"number"} name={"price"} value={formData.price} method={handleChange} />
               <InputField labelName={"Upload Media"} type="file" name="media" method={handleFiles} />
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
