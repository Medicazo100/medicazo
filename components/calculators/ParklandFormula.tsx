import React, { useState } from 'react';

interface ParklandFormulaProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const ParklandFormula: React.FC<ParklandFormulaProps> = ({ onCalculate }) => {
  const [weight, setWeight] = useState('');
  const [tbsa, setTbsa] = useState('');
  const [error, setError] = useState('');

  const calculateFluids = () => {
    const weightKg = parseFloat(weight);
    const tbsaPercent = parseFloat(tbsa);

    if (isNaN(weightKg) || isNaN(tbsaPercent) || weightKg <= 0 || tbsaPercent <= 0 || tbsaPercent > 100) {
      setError('Por favor, ingrese valores válidos (Peso > 0, SCQ entre 1-100).');
      return;
    }
    setError('');
    const totalFluids = 4 * weightKg * tbsaPercent;
    const first8h = totalFluids / 2;
    const next16h = totalFluids / 2;

    onCalculate({ 
        value: `Volumen Total: ${totalFluids.toFixed(0)} mL / 24h`,
        details: {
            'Peso': `${weightKg} kg`,
            'Superficie Corporal Quemada (SCQ)': `${tbsaPercent} %`,
            'Volumen en primeras 8h': `${first8h.toFixed(0)} mL`,
            'Volumen en siguientes 16h': `${next16h.toFixed(0)} mL`,
        }
    });
  };
  
  const inputClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Peso del Paciente (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClasses} placeholder="Ej: 70" />
      </div>
      <div>
        <label className={labelClasses}>Superficie Corporal Quemada (SCQ) (%)</label>
        <input type="number" value={tbsa} onChange={(e) => setTbsa(e.target.value)} className={inputClasses} placeholder="Ej: 20" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={calculateFluids} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Fluidos
      </button>
    </div>
  );
};

export default ParklandFormula;