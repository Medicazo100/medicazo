import React, { useState } from 'react';

interface QSOFAScoreProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const QSOFAScore: React.FC<QSOFAScoreProps> = ({ onCalculate }) => {
  const [fr, setFr] = useState(false);
  const [pam, setPam] = useState(false);
  const [glasgow, setGlasgow] = useState(false);

  const calculateScore = () => {
    const score = Number(fr) + Number(pam) + Number(glasgow);
    onCalculate({
        value: `${score} Puntos`,
        details: {
            'Frecuencia Respiratoria ≥ 22/min': fr ? 'Sí (+1)' : 'No (0)',
            'Alteración del Estado Mental (Glasgow < 15)': glasgow ? 'Sí (+1)' : 'No (0)',
            'Presión Arterial Sistólica ≤ 100 mmHg': pam ? 'Sí (+1)' : 'No (0)',
        }
    });
  };
  
  const checkboxLabelClasses = "flex items-center p-3 w-full bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/60 transition";
  const checkboxInputClasses = "h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-violet-500 dark:focus:ring-violet-600";
  const spanClasses = "ml-3 text-sm font-medium text-slate-900 dark:text-slate-300";

  return (
    <div className="space-y-3">
        <label className={checkboxLabelClasses}>
            <input type="checkbox" checked={fr} onChange={(e) => setFr(e.target.checked)} className={checkboxInputClasses} />
            <span className={spanClasses}>Frecuencia Respiratoria ≥ 22/min</span>
        </label>
        <label className={checkboxLabelClasses}>
            <input type="checkbox" checked={glasgow} onChange={(e) => setGlasgow(e.target.checked)} className={checkboxInputClasses} />
            <span className={spanClasses}>Alteración del Estado Mental (Glasgow &lt; 15)</span>
        </label>
         <label className={checkboxLabelClasses}>
            <input type="checkbox" checked={pam} onChange={(e) => setPam(e.target.checked)} className={checkboxInputClasses} />
            <span className={spanClasses}>Presión Arterial Sistólica ≤ 100 mmHg</span>
        </label>
      <button onClick={calculateScore} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Puntuación
      </button>
    </div>
  );
};

export default QSOFAScore;