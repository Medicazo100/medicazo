import React, { useState } from 'react';

interface RansonScoreProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const RansonScore: React.FC<RansonScoreProps> = ({ onCalculate }) => {
  const [criteria, setCriteria] = useState({
    age: false,
    wbc: false,
    glucose: false,
    ldh: false,
    ast: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCriteria(prev => ({ ...prev, [name]: checked }));
  };

  const calculateScore = () => {
    let score = 0;
    const details: Record<string, string> = {};
    if (criteria.age) { score++; details['Edad > 55 años'] = 'Sí (+1)'; }
    if (criteria.wbc) { score++; details['Leucocitos > 16,000/mm³'] = 'Sí (+1)'; }
    if (criteria.glucose) { score++; details['Glucosa > 200 mg/dL'] = 'Sí (+1)'; }
    if (criteria.ldh) { score++; details['LDH > 350 UI/L'] = 'Sí (+1)'; }
    if (criteria.ast) { score++; details['AST > 250 UI/L'] = 'Sí (+1)'; }

    onCalculate({
      value: `${score} Puntos`,
      details,
    });
  };

  const checkboxLabelClasses = "flex items-center p-3 w-full bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/60 transition";
  const checkboxInputClasses = "h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-violet-500 dark:focus:ring-violet-600";
  const spanClasses = "ml-3 text-sm";

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Criterios al ingreso del paciente:</p>
      <label className={checkboxLabelClasses}><input type="checkbox" name="age" checked={criteria.age} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>Edad > 55 años</span></label>
      <label className={checkboxLabelClasses}><input type="checkbox" name="wbc" checked={criteria.wbc} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>Leucocitos > 16,000/mm³</span></label>
      <label className={checkboxLabelClasses}><input type="checkbox" name="glucose" checked={criteria.glucose} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>Glucosa en sangre > 200 mg/dL</span></label>
      <label className={checkboxLabelClasses}><input type="checkbox" name="ldh" checked={criteria.ldh} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>LDH sérica > 350 UI/L</span></label>
      <label className={checkboxLabelClasses}><input type="checkbox" name="ast" checked={criteria.ast} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>AST sérica > 250 UI/L</span></label>

      <button onClick={calculateScore} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Criterios de Ranson
      </button>
    </div>
  );
};

export default RansonScore;