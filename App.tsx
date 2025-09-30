import React, { useState, useEffect, useCallback } from 'react';
import type { Calculator, CalculatorSuggestion, GroundingChunk } from './types';
import { getCalculatorSuggestions, getClinicalInterpretation } from './services/geminiService';
import Header from './components/Header';
import CalculatorSelector from './components/CalculatorSelector';
import ResultDisplay from './components/ResultDisplay';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { SearchIcon } from './components/icons/SearchIcon';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [pathology, setPathology] = useState('');
    const [suggestions, setSuggestions] = useState<CalculatorSuggestion[]>([]);
    const [selectedCalculator, setSelectedCalculator] = useState<Calculator | null>(null);
    const [result, setResult] = useState<{ value: string; details?: Record<string, any> } | null>(null);
    const [interpretation, setInterpretation] = useState<string | null>(null);
    const [sources, setSources] = useState<GroundingChunk[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [isLoadingInterpretation, setIsLoadingInterpretation] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleSearch = async () => {
        if (!pathology.trim()) {
            setError('Por favor, ingrese una patología.');
            return;
        }
        setIsLoadingSuggestions(true);
        setError(null);
        setSuggestions([]);
        setSelectedCalculator(null);
        setResult(null);
        setInterpretation(null);
        setSources([]);

        try {
            const suggestedCalcs = await getCalculatorSuggestions(pathology);
            setSuggestions(suggestedCalcs);
        } catch (e) {
            console.error(e);
            setError('Error al obtener sugerencias. Intente de nuevo.');
        } finally {
            setIsLoadingSuggestions(false);
        }
    };

    const handleCalculation = useCallback(async (calculator: Calculator, res: { value: string; details?: Record<string, any> }) => {
        setResult(res);
        setIsLoadingInterpretation(true);
        setInterpretation(null);
        setSources([]);
        setError(null);
        try {
            const { interpretation: newInterpretation, sources: newSources } = await getClinicalInterpretation(calculator.name, res.value, pathology, res.details);
            setInterpretation(newInterpretation);
            setSources(newSources);
        } catch (e) {
            console.error(e);
            setError('Error al obtener la interpretación clínica. Intente de nuevo.');
        } finally {
            setIsLoadingInterpretation(false);
        }
    }, [pathology]);

    const resetState = () => {
      setPathology('');
      setSuggestions([]);
      setSelectedCalculator(null);
      setResult(null);
      setInterpretation(null);
      setSources([]);
      setError(null);
    }

    return (
        <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 p-4 sm:p-6 md:p-8">
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} resetState={resetState}/>
            <main className="max-w-4xl mx-auto mt-8">
                <div className="bg-white dark:bg-slate-800/30 rounded-2xl shadow-md dark:shadow-lg dark:shadow-blue-500/20 p-6 backdrop-blur-xl border border-slate-200/80 dark:border-blue-800/30">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <SparklesIcon />
                        Asistente Médico
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 mb-4">
                        Ingrese una patología o diagnóstico para recibir sugerencias de calculadoras y fórmulas médicas relevantes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={pathology}
                            onChange={(e) => setPathology(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Ej: Sepsis, Ictus, Neumonía..."
                            className="flex-grow w-full px-4 py-3 bg-slate-100 dark:bg-slate-900/70 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 transition"
                        />
                        <button
                            onClick={handleSearch}
                            disabled={isLoadingSuggestions}
                            className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 disabled:bg-indigo-300 dark:disabled:bg-slate-600 dark:disabled:from-slate-500 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all transform hover:scale-105 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 dark:hover:from-blue-600 dark:hover:to-purple-700 dark:focus:ring-purple-500"
                        >
                            <SearchIcon />
                            {isLoadingSuggestions ? 'Buscando...' : 'Sugerir'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>

                {isLoadingSuggestions && (
                    <div className="text-center p-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 dark:border-violet-400 mx-auto"></div>
                        <p className="mt-4 text-lg">Analizando patología y buscando las mejores herramientas...</p>
                    </div>
                )}

                {suggestions.length > 0 && (
                     <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-3">Calculadoras sugeridas para <span className="text-indigo-600 dark:text-cyan-400">{pathology}</span>:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {suggestions.map(suggestion => (
                                <button key={suggestion.key}
                                    onClick={() => {
                                        setSelectedCalculator(suggestion);
                                        setResult(null);
                                        setInterpretation(null);
                                        setSources([]);
                                    }}
                                    className={`p-4 text-center font-semibold rounded-lg transition-all duration-200 border-2
                                        ${selectedCalculator?.key === suggestion.key
                                            ? 'bg-indigo-600 text-white border-transparent dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-600 shadow-lg dark:shadow-cyan-500/30 scale-105'
                                            : 'bg-cyan-50 text-cyan-900 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 dark:bg-slate-800/50 dark:text-slate-200 dark:border-transparent dark:hover:bg-slate-700/60'
                                        }
                                    `}
                                >
                                    {suggestion.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {selectedCalculator && (
                    <div className="mt-8 bg-white dark:bg-slate-800/30 rounded-2xl shadow-md dark:shadow-lg dark:shadow-purple-500/20 p-6 backdrop-blur-xl border border-slate-200/80 dark:border-purple-800/30">
                       <CalculatorSelector calculator={selectedCalculator} onCalculate={handleCalculation} />
                    </div>
                )}

                {(isLoadingInterpretation || interpretation) && (
                    <div className="mt-8">
                      <ResultDisplay
                          result={result}
                          interpretation={interpretation}
                          sources={sources}
                          isLoading={isLoadingInterpretation}
                          calculatorName={selectedCalculator?.name || ''}
                       />
                    </div>
                )}

            </main>
        </div>
    );
};

export default App;