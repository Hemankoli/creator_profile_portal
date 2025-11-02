import React, { createContext, useContext, useEffect, useState } from 'react';
import { createLogs, fetchCreators, fetchFavaritos, fetchLogs } from '../apis';

const CreatorContext = createContext();

export const useCreators = () => useContext(CreatorContext);

export const CreatorProvider = ({ children }) => {
    const [creators, setCreators] = useState([]);
    const [meta, setMeta] = useState({ page: 1, limit: 6, total: 0 });
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [user, setUser] = useState(null);
    const [logs, setLogs] = useState([]);
    const [allFava, setAllFava] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token && user) {
            try {
                setUser(JSON.parse(user));
            } catch (err) {
                console.error("Failed to parse user from localStorage", err);
                localStorage.removeItem("user");
            }
        }
    }, [])

    async function getData(){
            try {
                const data = await fetchFavaritos();
                setAllFava(data)
            } catch (error) {
                console.log(error)
            }
        }

    useEffect(() => {
        getData()
    }, [])

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

    useEffect(() => {
        load({ page: 1 });
    }, [query]);


    const addCreator = (newCreator) => {
        setCreators(prev => [newCreator, ...prev]);
    };

    const editCreator = (updatedCreator) => {
        setCreators(prev =>
            prev.map(c => c.id === updatedCreator.id ? updatedCreator : c)
        );
    };

    const removeCreator = (id) => {
        setCreators(prev => prev.filter(c => c.id !== id));
    };

    async function handleLogs({ name, changes }) {
        try {
            await createLogs({ name, changes })
        } catch (error) {
            console.log(error)
        }
    }

    async function getLogs() {
        try {
            const data = await fetchLogs();
            const sortedLogs = data?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
            setLogs(sortedLogs);
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    }


    useEffect(() => {
        getLogs();
    }, [])

    const values = {
        creators,
        meta,
        loading,
        query,
        setQuery,
        load,
        setCreators,
        addCreator,
        editCreator,
        removeCreator,
        user, setUser,
        handleLogs,
        logs, allFava, getData
    }

    return (
        <CreatorContext.Provider value={values}>
            {children}
        </CreatorContext.Provider>
    );
};