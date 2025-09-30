import React, { useState } from 'react';

interface WintersFormulaProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const WintersFormula: React.FC<WintersFormulaProps> = ({ onCalculate }) => {
  const [bicarb, setBicarb] = useState('');
  const [error, setError] = useState('');

  const calculateExpectedPCO2 = () => {
    const hco3 = parseFloat(bicarb);

    if (isNaN(hco3) || hco3 <= 0) {
      setError('Por favor, ingrese un valor de Bicarbonato válido.');
      return;
    }
    setError('');
    
    const expectedPCO2 = (1.5 * hco3) + 8;
    const lowerBound = expectedPCO2 - 2;
    const upperBound = expectedPCO2 + 2;
    
    onCalculate({ 
        value: `pCO₂ esperada: ${lowerBound.toFixed(1)} - ${upperBound.toFixed(1)} mmHg`,
        details: {
            'Bicarbonato (HCO₃⁻)': `${bicarb} mEq/L`,
        }
    });
  };
  
  const inputClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Bicarbonato (HCO₃⁻) (mEq/L)</label>
        <input type="number" value={bicarb} onChange={(e) => setBicarb(e.target.value)} className={inputClasses} placeholder="Ej: 12" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={calculateExpectedPCO2} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular pCO₂ Esperada
      </button>
    </div>
  );
};

export default WintersFormula;