import React, { useState } from 'react';

interface PlasmaOsmolalityCalculatorProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const PlasmaOsmolalityCalculator: React.FC<PlasmaOsmolalityCalculatorProps> = ({ onCalculate }) => {
  const [sodium, setSodium] = useState('');
  const [glucose, setGlucose] = useState('');
  const [bun, setBun] = useState('');
  const [error, setError] = useState('');

  const calculateOsmolality = () => {
    const na = parseFloat(sodium);
    const glu = parseFloat(glucose);
    const bunVal = parseFloat(bun);

    if (isNaN(na) || isNaN(glu) || isNaN(bunVal) || na <= 0 || glu <= 0 || bunVal <= 0) {
      setError('Por favor, ingrese valores numéricos válidos para todos los campos.');
      return;
    }
    setError('');
    
    const osmolality = (2 * na) + (glu / 18) + (bunVal / 2.8);
    
    onCalculate({ 
        value: `${osmolality.toFixed(2)} mOsm/kg`,
        details: {
            'Sodio (Na+)': `${sodium} mEq/L`,
            'Glucosa': `${glucose} mg/dL`,
            'BUN': `${bun} mg/dL`,
        }
    });
  };
  
  const inputClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Sodio (Na⁺) (mEq/L)</label>
        <input type="number" value={sodium} onChange={(e) => setSodium(e.target.value)} className={inputClasses} placeholder="Ej: 138" />
      </div>
      <div>
        <label className={labelClasses}>Glucosa (mg/dL)</label>
        <input type="number" value={glucose} onChange={(e) => setGlucose(e.target.value)} className={inputClasses} placeholder="Ej: 110" />
      </div>
      <div>
        <label className={labelClasses}>BUN (mg/dL)</label>
        <input type="number" value={bun} onChange={(e) => setBun(e.target.value)} className={inputClasses} placeholder="Ej: 15" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={calculateOsmolality} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Osmolaridad Plasmática
      </button>
    </div>
  );
};

export default PlasmaOsmolalityCalculator;