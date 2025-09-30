import React, { useState } from 'react';

interface ShockIndexCalculatorProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const ShockIndexCalculator: React.FC<ShockIndexCalculatorProps> = ({ onCalculate }) => {
  const [heartRate, setHeartRate] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [error, setError] = useState('');

  const calculateSI = () => {
    const hr = parseFloat(heartRate);
    const sbp = parseFloat(systolicBP);

    if (isNaN(hr) || isNaN(sbp) || hr <= 0 || sbp <= 0) {
      setError('Por favor, ingrese valores numéricos válidos y positivos.');
      return;
    }
    setError('');
    const shockIndex = hr / sbp;
    onCalculate({ 
        value: `${shockIndex.toFixed(2)}`,
        details: {
            'Frecuencia Cardíaca': `${heartRate} lpm`,
            'Presión Arterial Sistólica': `${systolicBP} mmHg`,
        }
    });
  };
  
  const inputClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Frecuencia Cardíaca (lpm)</label>
        <input type="number" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} className={inputClasses} placeholder="Ej: 110" />
      </div>
      <div>
        <label className={labelClasses}>Presión Arterial Sistólica (mmHg)</label>
        <input type="number" value={systolicBP} onChange={(e) => setSystolicBP(e.target.value)} className={inputClasses} placeholder="Ej: 90" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={calculateSI} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Índice de Choque
      </button>
    </div>
  );
};

export default ShockIndexCalculator;