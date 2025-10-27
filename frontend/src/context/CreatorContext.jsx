import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCreators } from '../apis';

const CreatorContext = createContext();

export const useCreators = () => useContext(CreatorContext);

export const CreatorProvider = ({ children }) => {
    const [creators, setCreators] = useState([]);
    const [meta, setMeta] = useState({ page: 1, limit: 6, total: 0 });
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    const load = async (opts = {}) => {
        setLoading(true);
        try {
            const data = await fetchCreators({ page: opts.page || meta.page, limit: opts.limit || meta.limit, search: opts.search || query });
            setCreators(data.items);
            setMeta({ page: data.page, limit: data.limit, total: data.total });
        } catch (e) { console.error(e); }
        setLoading(false);
    }

    useEffect(() => { load({ page: 1 }); }, []);


    const refresh = () => load({ page: meta.page });

    const values = {
        creators,
        meta,
        loading,
        query,
        setQuery,
        load,
        refresh,
        setCreators
    }

    return (
        <CreatorContext.Provider value={values}>
            {children}
        </CreatorContext.Provider>
    );
};