import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Spinner ({ path }) {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);
    if (count === 0) navigate(`${path}`);
    return () => clearInterval(interval);
  }, [count, navigate, path]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-600 animate-pulse">
          You are not authorized to access this restricted page
        </h1>
        <p className="text-lg md:text-xl">
          Redirecting you in{" "}
          <span className="text-purple-600 font-bold text-2xl animate-bounce">
            {count}
          </span>{" "}
          seconds...
        </p>
      </div>

      <div className="relative mt-10">
        <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-purple-200 opacity-70 animate-ping"></div>
      </div>
    </div>
  );
};