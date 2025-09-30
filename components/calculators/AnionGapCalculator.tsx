import React, { useState } from 'react';

interface AnionGapCalculatorProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const AnionGapCalculator: React.FC<AnionGapCalculatorProps> = ({ onCalculate }) => {
  const [sodium, setSodium] = useState('');
  const [chloride, setChloride] = useState('');
  const [bicarb, setBicarb] = useState('');
  const [error, setError] = useState('');

  const calculateAnionGap = () => {
    const na = parseFloat(sodium);
    const cl = parseFloat(chloride);
    const hco3 = parseFloat(bicarb);

    if (isNaN(na) || isNaN(cl) || isNaN(hco3) || na <= 0 || cl <= 0 || hco3 <= 0) {
      setError('Por favor, ingrese valores numéricos válidos para todos los campos.');
      return;
    }
    setError('');
    
    const anionGap = na - (cl + hco3);
    
    onCalculate({ 
        value: `${anionGap.toFixed(2)} mEq/L`,
        details: {
            'Sodio (Na+)': `${sodium} mEq/L`,
            'Cloro (Cl-)': `${chloride} mEq/L`,
            'Bicarbonato (HCO3-)': `${bicarb} mEq/L`,
        }
    });
  };
  
  const inputClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Sodio (Na⁺) (mEq/L)</label>
        <input type="number" value={sodium} onChange={(e) => setSodium(e.target.value)} className={inputClasses} placeholder="Ej: 140" />
      </div>
      <div>
        <label className={labelClasses}>Cloro (Cl⁻) (mEq/L)</label>
        <input type="number" value={chloride} onChange={(e) => setChloride(e.target.value)} className={inputClasses} placeholder="Ej: 100" />
      </div>
      <div>
        <label className={labelClasses}>Bicarbonato (HCO₃⁻) (mEq/L)</label>
        <input type="number" value={bicarb} onChange={(e) => setBicarb(e.target.value)} className={inputClasses} placeholder="Ej: 24" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={calculateAnionGap} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Anion Gap
      </button>
    </div>
  );
};

export default AnionGapCalculator;