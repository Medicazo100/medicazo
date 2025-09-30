import React, { useState } from 'react';

interface SFRatioCalculatorProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const SFRatioCalculator: React.FC<SFRatioCalculatorProps> = ({ onCalculate }) => {
  const [spo2, setSpo2] = useState('');
  const [fio2, setFio2] = useState('');
  const [error, setError] = useState('');

  const calculateSFRatio = () => {
    const spo2Val = parseFloat(spo2);
    const fio2Val = parseFloat(fio2);

    if (isNaN(spo2Val) || isNaN(fio2Val)) {
      setError('Por favor, ingrese valores numéricos válidos.');
      return;
    }
    if (spo2Val < 0 || spo2Val > 100) {
      setError('La SatO₂ debe estar entre 0 y 100.');
      return;
    }
    if (fio2Val < 0.21 || fio2Val > 1.0) {
        setError('La FiO₂ debe ser un decimal entre 0.21 y 1.0.');
        return;
    }
    setError('');
    const sfRatio = spo2Val / fio2Val;
    onCalculate({ 
        value: `${sfRatio.toFixed(0)}`,
        details: {
            'Saturación de Oxígeno (SatO₂)': `${spo2} %`,
            'Fracción de Oxígeno Inspirado (FiO₂)': `${fio2}`,
        }
    });
  };
  
  const inputClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Saturación de Oxígeno (SatO₂) (%)</label>
        <input type="number" value={spo2} onChange={(e) => setSpo2(e.target.value)} className={inputClasses} placeholder="Ej: 95" />
      </div>
      <div>
        <label className={labelClasses}>Fracción de Oxígeno Inspirado (FiO₂) (Decimal)</label>
        <input type="number" step="0.01" value={fio2} onChange={(e) => setFio2(e.target.value)} className={inputClasses} placeholder="Ej: 0.21 para aire ambiente" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={calculateSFRatio} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Índice S/F
      </button>
    </div>
  );
};

export default SFRatioCalculator;