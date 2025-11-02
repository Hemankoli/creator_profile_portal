import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoMdHeart } from "react-icons/io";
import { useCreators } from '../context/CreatorContext';


export default function Card({ creator, handleFavaritos }) {
    const { allFava } = useCreators();
    const initials = creator.name
        ? creator.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
        : 'SM';

    const isFavorite = useMemo(() => {
        return allFava?.some(fav => String(fav.productId) === String(creator.id));
    }, [allFava, creator.id]);

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-[#0B1224] rounded-sm p-5 shadow-sm hover:shadow-lg 
                 border border-transparent hover:border-indigo-500 transition-all 
                 duration-300 flex flex-col justify-between min-h-[220px]"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-gradient-to-r from-indigo-500 to-purple-500 
                        flex items-center justify-center text-white font-bold text-xl shadow-md">
                        {initials}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                            {creator.name}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {creator.designation || 'Creator'}
                        </div>
                    </div>
                    <button
                        onClick={() => handleFavaritos(creator?.id)}
                        className="text-xl hover:scale-110 transition-transform"
                    >
                        {isFavorite ? (
                            <IoMdHeart className="text-red-500" />
                        ) : (
                            <FaRegHeart className="text-gray-400 hover:text-red-400" />
                        )}
                    </button>
                </div>
                <span className="text-md font-semibold text-blue-600">₹{creator.price} / Month</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                {creator.about || 'No description available.'}
            </p>
            <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-200 dark:border-gray-700">
                <Link
                    to={`/creator/${creator?.id}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700 
                     dark:text-indigo-400 dark:hover:text-indigo-300 transition"
                >
                    View Profile →
                </Link>
                <div className="text-xs text-gray-400 dark:text-gray-500">
                    {creator.createdAt
                        ? new Date(creator.createdAt).toLocaleDateString()
                        : ''}
                </div>
            </div>
        </motion.div>
    );
}
