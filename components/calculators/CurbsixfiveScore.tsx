import React, { useState } from 'react';

interface CurbsixfiveScoreProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const CurbsixfiveScore: React.FC<CurbsixfiveScoreProps> = ({ onCalculate }) => {
  const [confusion, setConfusion] = useState(false);
  const [bun, setBun] = useState('');
  const [rr, setRr] = useState(false);
  const [bp, setBp] = useState(false);
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const calculateScore = () => {
    const ageNum = parseInt(age, 10);
    const bunNum = parseFloat(bun);

    if (isNaN(ageNum) || ageNum < 0 || isNaN(bunNum) || bunNum < 0) {
      setError('Por favor, ingrese valores numéricos válidos para Edad y BUN.');
      return;
    }
    setError('');

    let score = 0;
    const details: Record<string, any> = {};

    details['Confusión'] = confusion ? 'Sí (+1)' : 'No (0)';
    if (confusion) score++;

    details['BUN > 19 mg/dL'] = bunNum > 19 ? `Sí (${bunNum} mg/dL) (+1)` : `No (${bunNum} mg/dL) (0)`;
    if (bunNum > 19) score++;
    
    details['Frecuencia Respiratoria ≥ 30/min'] = rr ? 'Sí (+1)' : 'No (0)';
    if (rr) score++;

    details['PAS < 90 mmHg o PAD ≤ 60 mmHg'] = bp ? 'Sí (+1)' : 'No (0)';
    if (bp) score++;

    details['Edad ≥ 65 años'] = ageNum >= 65 ? `Sí (${ageNum} años) (+1)`: `No (${ageNum} años) (0)`;
    if (ageNum >= 65) score++;
    
    onCalculate({
        value: `${score} Puntos`,
        details
    });
  };

  const checkboxLabelClasses = "flex items-center p-3 w-full bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/60 transition";
  const checkboxInputClasses = "h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-violet-500 dark:focus:ring-violet-600";
  const inputClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";
  const spanClasses = "ml-3 text-sm font-medium text-slate-900 dark:text-slate-300";

  return (
    <div className="space-y-3">
        <label className={checkboxLabelClasses}>
            <input type="checkbox" checked={confusion} onChange={(e) => setConfusion(e.target.checked)} className={checkboxInputClasses} />
            <span className={spanClasses}>Confusión (nueva desorientación)</span>
        </label>
        <div>
            <label className={labelClasses}>BUN (mg/dL)</label>
            <input type="number" value={bun} onChange={(e) => setBun(e.target.value)} className={inputClasses} placeholder="Ej: 25" />
        </div>
        <label className={checkboxLabelClasses}>
            <input type="checkbox" checked={rr} onChange={(e) => setRr(e.target.checked)} className={checkboxInputClasses} />
            <span className={spanClasses}>Frecuencia Respiratoria ≥ 30/min</span>
        </label>
        <label className={checkboxLabelClasses}>
            <input type="checkbox" checked={bp} onChange={(e) => setBp(e.target.checked)} className={checkboxInputClasses} />
            <span className={spanClasses}>PAS &lt; 90 mmHg o PAD ≤ 60 mmHg</span>
        </label>
        <div>
            <label className={labelClasses}>Edad</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className={inputClasses} placeholder="Ej: 70" />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={calculateScore} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
            Calcular Puntuación CURB-65
        </button>
    </div>
  );
};

export default CurbsixfiveScore;