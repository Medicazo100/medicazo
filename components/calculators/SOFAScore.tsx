import React, { useState } from 'react';

interface SOFAScoreProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const SOFAScore: React.FC<SOFAScoreProps> = ({ onCalculate }) => {
  const [scores, setScores] = useState({
    respiration: 0,
    coagulation: 0,
    liver: 0,
    cardiovascular: 0,
    cns: 0,
    renal: 0,
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setScores(prev => ({ ...prev, [name]: Number(value) }));
  };
  
  const calculateScore = () => {
    const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
    onCalculate({
      value: `${total} Puntos`,
      details: {
        'Respiración (PaO₂/FiO₂)': `${scores.respiration} ptos`,
        'Coagulación (Plaquetas)': `${scores.coagulation} ptos`,
        'Hígado (Bilirrubina)': `${scores.liver} ptos`,
        'Cardiovascular (Hipotensión)': `${scores.cardiovascular} ptos`,
        'SNC (Escala de Glasgow)': `${scores.cns} ptos`,
        'Renal (Creatinina/Diuresis)': `${scores.renal} ptos`,
      },
    });
  };
  
  const selectClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Respiración (PaO₂/FiO₂)</label>
        <select name="respiration" value={scores.respiration} onChange={handleSelectChange} className={selectClasses}>
          <option value={0}>≥400</option>
          <option value={1}>&lt;400</option>
          <option value={2}>&lt;300</option>
          <option value={3}>&lt;200 con soporte respiratorio</option>
          <option value={4}>&lt;100 con soporte respiratorio</option>
        </select>
      </div>
      <div>
        <label className={labelClasses}>Coagulación (Plaquetas x10³/µL)</label>
        <select name="coagulation" value={scores.coagulation} onChange={handleSelectChange} className={selectClasses}>
          <option value={0}>≥150</option>
          <option value={1}>&lt;150</option>
          <option value={2}>&lt;100</option>
          <option value={3}>&lt;50</option>
          <option value={4}>&lt;20</option>
        </select>
      </div>
       <div>
        <label className={labelClasses}>Hígado (Bilirrubina mg/dL)</label>
        <select name="liver" value={scores.liver} onChange={handleSelectChange} className={selectClasses}>
          <option value={0}>&lt;1.2</option>
          <option value={1}>1.2-1.9</option>
          <option value={2}>2.0-5.9</option>
          <option value={3}>6.0-11.9</option>
          <option value={4}>&gt;12.0</option>
        </select>
      </div>
       <div>
        <label className={labelClasses}>Cardiovascular (Hipotensión)</label>
        <select name="cardiovascular" value={scores.cardiovascular} onChange={handleSelectChange} className={selectClasses}>
          <option value={0}>PAM ≥70 mmHg</option>
          <option value={1}>PAM &lt;70 mmHg</option>
          <option value={2}>Dopamina ≤5 o Dobutamina (cualquier dosis)</option>
          <option value={3}>Dopamina >5 o Epinefrina ≤0.1 o Norepinefrina ≤0.1</option>
          <option value={4}>Dopamina >15 o Epinefrina >0.1 o Norepinefrina >0.1</option>
        </select>
      </div>
       <div>
        <label className={labelClasses}>SNC (Escala de Coma de Glasgow)</label>
        <select name="cns" value={scores.cns} onChange={handleSelectChange} className={selectClasses}>
          <option value={0}>15</option>
          <option value={1}>13-14</option>
          <option value={2}>10-12</option>
          <option value={3}>6-9</option>
          <option value={4}>&lt;6</option>
        </select>
      </div>
       <div>
        <label className={labelClasses}>Renal (Creatinina mg/dL o Diuresis)</label>
        <select name="renal" value={scores.renal} onChange={handleSelectChange} className={selectClasses}>
          <option value={0}>&lt;1.2</option>
          <option value={1}>1.2-1.9</option>
          <option value={2}>2.0-3.4</option>
          <option value={3}>3.5-4.9 o &lt;500 mL/día</option>
          <option value={4}>&gt;5.0 o &lt;200 mL/día</option>
        </select>
      </div>
      <button onClick={calculateScore} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Puntuación SOFA
      </button>
    </div>
  );
};

export default SOFAScore;