import React from 'react';
import type { GroundingChunk } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface ResultDisplayProps {
    result: { value: string; details?: Record<string, any> } | null;
    interpretation: string | null;
    sources: GroundingChunk[];
    isLoading: boolean;
    calculatorName: string;
}

// A simple markdown to HTML converter
const Markdown: React.FC<{ content: string }> = ({ content }) => {
    const htmlContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-slate-200 dark:bg-slate-700 rounded px-1 py-0.5 text-sm font-mono">$1</code>')
        .replace(/(\d+\.\s.*)/g, '<li class="ml-5">$1</li>')
        .replace(/(<li.*<\/li>)/gs, (match) => `<ol class="list-decimal list-inside">${match.replace(/<li>/g, '').replace(/<\/li>/g, '<br/>')}</ol>`)
        .replace(/\n/g, '<br />');
    
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose prose-sm dark:prose-invert max-w-none prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-strong:text-slate-800 dark:prose-strong:text-slate-100" />;
};


const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, interpretation, sources, isLoading, calculatorName }) => {
    return (
        <div className="bg-white dark:bg-slate-800/30 rounded-2xl shadow-md dark:shadow-lg dark:shadow-blue-500/20 p-6 backdrop-blur-xl border border-slate-200/80 dark:border-blue-800/30">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Resultado e Interpretación Clínica</h3>
            
            {result && (
                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-400">Resultado de {calculatorName}:</p>
                    <p className="text-4xl font-bold text-slate-800 dark:text-cyan-300">{result.value}</p>
                </div>
            )}
            
            {isLoading && (
                <div className="flex flex-col items-center justify-center p-6">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 dark:border-violet-500"></div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">Generando interpretación clínica con IA...</p>
                </div>
            )}

            {interpretation && (
                <div>
                    <h4 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-200">Análisis por IA:</h4>
                    <div className="space-y-3">
                       <Markdown content={interpretation} />
                    </div>
                </div>
            )}
            
            {sources.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <BookOpenIcon />
                      Fuentes y Referencias
                    </h4>
                    <ul className="space-y-2">
                        {sources.map((source, index) => (
                            <li key={index}>
                                <a 
                                    href={source.web.uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 dark:text-cyan-400 hover:underline text-sm"
                                >
                                    {index + 1}. {source.web.title || source.web.uri}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ResultDisplay;