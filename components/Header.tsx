import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
    resetState: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode, resetState }) => {
    return (
        <header className="flex justify-between items-center">
            <div onClick={resetState} className="cursor-pointer">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-cyan-400 dark:to-violet-500">
                    Calculadoras y Fórmulas Medicas
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">by Dr.Méndez | Medicina Basada en Evidencia</p>
            </div>
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500"
                aria-label="Toggle dark mode"
            >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
        </header>
    );
};

export default Header;