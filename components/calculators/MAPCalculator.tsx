import React, { useState } from 'react';

interface MAPCalculatorProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const MAPCalculator: React.FC<MAPCalculatorProps> = ({ onCalculate }) => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [error, setError] = useState('');

  const calculateMAP = () => {
    const sbp = parseFloat(systolic);
    const dbp = parseFloat(diastolic);

    if (isNaN(sbp) || isNaN(dbp) || sbp <= 0 || dbp <= 0 || sbp < dbp) {
      setError('Por favor, ingrese valores válidos. La sistólica debe ser mayor que la diastólica.');
      return;
    }
    setError('');
    const map = dbp + (sbp - dbp) / 3;
    onCalculate({ 
        value: `${map.toFixed(2)} mmHg`,
        details: {
            'Presión Sistólica': `${systolic} mmHg`,
            'Presión Diastólica': `${diastolic} mmHg`,
        }
    });
  };
  
  const inputClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Presión Arterial Sistólica (PAS) (mmHg)</label>
        <input type="number" value={systolic} onChange={(e) => setSystolic(e.target.value)} className={inputClasses} placeholder="Ej: 120" />
      </div>
      <div>
        <label className={labelClasses}>Presión Arterial Diastólica (PAD) (mmHg)</label>
        <input type="number" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} className={inputClasses} placeholder="Ej: 80" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={calculateMAP} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular PAM
      </button>
    </div>
  );
};

export default MAPCalculator;