import React, { useState } from 'react';

interface ABGInterpreterProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const ABGInterpreter: React.FC<ABGInterpreterProps> = ({ onCalculate }) => {
  const [ph, setPh] = useState('');
  const [pco2, setPco2] = useState('');
  const [po2, setPo2] = useState('');
  const [hco3, setHco3] = useState('');
  const [error, setError] = useState('');

  const handleInterpretation = () => {
    const phVal = parseFloat(ph);
    const pco2Val = parseFloat(pco2);
    const po2Val = parseFloat(po2);
    const hco3Val = parseFloat(hco3);

    if (isNaN(phVal) || isNaN(pco2Val) || isNaN(hco3Val) || isNaN(po2Val)) {
      setError('Por favor, ingrese valores numéricos para todos los campos.');
      return;
    }
    setError('');
    
    onCalculate({ 
        value: `Análisis Solicitado`,
        details: {
            'pH': phVal,
            'pCO₂ (mmHg)': pco2Val,
            'pO₂ (mmHg)': po2Val,
            'HCO₃⁻ (mEq/L)': hco3Val,
        }
    });
  };
  
  const inputClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>pH</label>
          <input type="number" step="0.01" value={ph} onChange={(e) => setPh(e.target.value)} className={inputClasses} placeholder="Ej: 7.35" />
        </div>
        <div>
          <label className={labelClasses}>pCO₂ (mmHg)</label>
          <input type="number" value={pco2} onChange={(e) => setPco2(e.target.value)} className={inputClasses} placeholder="Ej: 40" />
        </div>
        <div>
          <label className={labelClasses}>pO₂ (mmHg)</label>
          <input type="number" value={po2} onChange={(e) => setPo2(e.target.value)} className={inputClasses} placeholder="Ej: 90" />
        </div>
        <div>
          <label className={labelClasses}>HCO₃⁻ (mEq/L)</label>
          <input type="number" value={hco3} onChange={(e) => setHco3(e.target.value)} className={inputClasses} placeholder="Ej: 24" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={handleInterpretation} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Interpretar Gasometría
      </button>
    </div>
  );
};

export default ABGInterpreter;