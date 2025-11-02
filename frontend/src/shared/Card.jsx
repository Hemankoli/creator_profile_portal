import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegHeart } from 'react-icons/fa';
import { IoMdHeart } from "react-icons/io";
import { useCreators } from '../context/CreatorContext';

export default function Card({ creator }) {
    const { allFava, handleFavaritos } = useCreators();

    const isFavorite = useMemo(() => {
        return allFava?.some(fav => String(fav.productId) === String(creator.id));
    }, [allFava, creator.id]);

    const initials = creator.name
        ? creator.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
        : 'SM';

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative group bg-gradient-to-br from-[#0E1630] to-[#151C39] 
                       rounded p-6 shadow-[0_8px_20px_rgba(0,0,0,0.3)] 
                       border border-indigo-700/30 hover:border-indigo-500/60 
                       hover:shadow-[0_10px_25px_rgba(99,102,241,0.25)] 
                       transition-all duration-300 flex flex-col justify-between 
                       min-h-[260px] overflow-hidden"
        >
            <div className="absolute pointer-events-none inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-600/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                        flex items-center justify-center text-white font-bold text-xl shadow-lg border border-indigo-400/40">
                        {initials}
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg text-white tracking-wide">
                            {creator.name}
                        </h3>
                        <div className="text-sm text-gray-400">
                            {creator.designation || 'Creator'}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => handleFavaritos(creator?.id)}
                    className="text-2xl hover:scale-125 active:scale-95 transition-transform duration-150"
                >
                    {isFavorite ? (
                        <IoMdHeart className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
                    ) : (
                        <FaRegHeart className="text-gray-400 hover:text-pink-400" />
                    )}
                </button>
            </div>

            <p className="mt-5 text-sm text-gray-300 leading-relaxed line-clamp-3">
                {creator.about || 'No description available.'}
            </p>
            <div className="flex items-center justify-between mt-6 pt-3 border-t border-gray-700/40">
                <Link
                    to={`/creator/${creator?.id}`}
                    className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition"
                >
                    View Profile →
                </Link>

                <div className="flex flex-col items-end text-right">
                    <span className="text-blue-400 font-semibold text-md">
                        ₹{creator.price} / Month
                    </span>
                    {creator.createdAt && (
                        <span className="text-xs text-gray-500">
                            {new Date(creator.createdAt).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
