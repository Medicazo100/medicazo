import React, { useState } from 'react';

interface CHA2DS2VAScScoreProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const CHA2DS2VAScScore: React.FC<CHA2DS2VAScScoreProps> = ({ onCalculate }) => {
  const [criteria, setCriteria] = useState({
    c: false, // Congestive heart failure
    h: false, // Hypertension
    a2: false, // Age >= 75
    d: false, // Diabetes
    s2: false, // Stroke/TIA/TE
    v: false, // Vascular disease
    a: false, // Age 65-74
    sc: false, // Sex category female
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCriteria(prev => ({ ...prev, [name]: checked }));
  };

  const calculateScore = () => {
    let score = 0;
    const details: Record<string, string> = {};

    if (criteria.c) { score += 1; details['Insuficiencia Cardíaca Congestiva'] = 'Sí (+1)'; }
    if (criteria.h) { score += 1; details['Hipertensión'] = 'Sí (+1)'; }
    if (criteria.a2) { score += 2; details['Edad ≥ 75 años'] = 'Sí (+2)'; }
    if (criteria.d) { score += 1; details['Diabetes Mellitus'] = 'Sí (+1)'; }
    if (criteria.s2) { score += 2; details['Ictus/AIT/TE previo'] = 'Sí (+2)'; }
    if (criteria.v) { score += 1; details['Enfermedad Vascular'] = 'Sí (+1)'; }
    if (criteria.a && !criteria.a2) { score += 1; details['Edad 65-74 años'] = 'Sí (+1)'; }
    if (criteria.sc) { score += 1; details['Sexo Femenino'] = 'Sí (+1)'; }
    
    onCalculate({
        value: `${score} Puntos`,
        details
    });
  };
  
  const checkboxLabelClasses = "flex items-center p-3 w-full bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/60 transition";
  const checkboxInputClasses = "h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-violet-500 dark:focus:ring-violet-600";
  const spanClasses = "ml-3 text-sm";
  
  return (
    <div className="space-y-3">
        <label className={checkboxLabelClasses}><input type="checkbox" name="c" checked={criteria.c} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>Insuficiencia Cardíaca Congestiva</span></label>
        <label className={checkboxLabelClasses}><input type="checkbox" name="h" checked={criteria.h} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>Hipertensión</span></label>
        <label className={checkboxLabelClasses}><input type="checkbox" name="a2" checked={criteria.a2} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>Edad ≥ 75 años (+2)</span></label>
        <label className={checkboxLabelClasses}><input type="checkbox" name="d" checked={criteria.d} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>Diabetes Mellitus</span></label>
        <label className={checkboxLabelClasses}><input type="checkbox" name="s2" checked={criteria.s2} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>Ictus/AIT/Tromboembolismo previo (+2)</span></label>
        <label className={checkboxLabelClasses}><input type="checkbox" name="v" checked={criteria.v} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>Enfermedad Vascular (IAM previo, EAP, placa aórtica)</span></label>
        <label className={checkboxLabelClasses}><input type="checkbox" name="a" checked={criteria.a} onChange={handleCheckboxChange} className={checkboxInputClasses} disabled={criteria.a2} /><span className={spanClasses}>Edad 65-74 años</span></label>
        <label className={checkboxLabelClasses}><input type="checkbox" name="sc" checked={criteria.sc} onChange={handleCheckboxChange} className={checkboxInputClasses} /><span className={spanClasses}>Sexo Femenino</span></label>
        
        <button onClick={calculateScore} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
            Calcular Score CHA₂DS₂-VASc
        </button>
    </div>
  );
};

export default CHA2DS2VAScScore;