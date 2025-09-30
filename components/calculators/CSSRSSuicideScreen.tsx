import React, { useState } from 'react';

interface CSSRSSuicideScreenProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const CSSRSSuicideScreen: React.FC<CSSRSSuicideScreenProps> = ({ onCalculate }) => {
    const [answers, setAnswers] = useState({ q1: false, q2: false, q3: false });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setAnswers(prev => ({ ...prev, [name]: checked }));
    };

    const determineRisk = () => {
        const details = {
            'Deseo de estar muerto (Ideación pasiva)': answers.q1 ? 'Sí' : 'No',
            'Pensamientos de suicidarse (Ideación activa)': answers.q2 ? 'Sí' : 'No',
            'Comportamiento suicida en la vida': answers.q3 ? 'Sí' : 'No',
        };

        let result = "Riesgo no detectado en cribado";
        if (answers.q3) {
            result = "Riesgo POSITIVO (Comportamiento previo)";
        } else if (answers.q2) {
            result = "Riesgo POSITIVO (Ideación activa)";
        } else if (answers.q1) {
            result = "Riesgo POSITIVO (Ideación pasiva)";
        }
        
        onCalculate({ value: result, details });
    };

    const checkboxLabelClasses = "flex items-center p-3 w-full bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/60 transition";
    const checkboxInputClasses = "h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-violet-500 dark:focus:ring-violet-600";
    const spanClasses = "ml-3 text-sm";

    return (
        <div className="space-y-4">
            <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Parte 1: Ideación Suicida</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Responda a las siguientes preguntas sobre el último mes:</p>
                <label className={checkboxLabelClasses}>
                    <input type="checkbox" name="q1" checked={answers.q1} onChange={handleCheckboxChange} className={checkboxInputClasses} />
                    <span className={spanClasses}>1. ¿Ha deseado estar muerto o poder irse a dormir y no despertar?</span>
                </label>
                <label className={`${checkboxLabelClasses} mt-2`}>
                    <input type="checkbox" name="q2" checked={answers.q2} onChange={handleCheckboxChange} className={checkboxInputClasses} />
                    <span className={spanClasses}>2. ¿Ha tenido realmente algún pensamiento de querer suicidarse?</span>
                </label>
            </div>
            <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Parte 2: Comportamiento Suicida</p>
                 <label className={checkboxLabelClasses}>
                    <input type="checkbox" name="q3" checked={answers.q3} onChange={handleCheckboxChange} className={checkboxInputClasses} />
                    <span className={spanClasses}>3. ¿Ha intentado suicidarse alguna vez en su vida?</span>
                </label>
            </div>
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 pt-2">Un "Sí" en las preguntas 2 o 3 indica un riesgo positivo que requiere evaluación adicional.</p>
            <button onClick={determineRisk} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
                Evaluar Riesgo
            </button>
        </div>
    );
};

export default CSSRSSuicideScreen;