import React, { useState } from 'react';

interface GestationalAgeLMPProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const GestationalAgeLMP: React.FC<GestationalAgeLMPProps> = ({ onCalculate }) => {
  const [lmp, setLmp] = useState('');
  const [error, setError] = useState('');

  const calculateGA = () => {
    if (!lmp) {
      setError('Por favor, seleccione una fecha.');
      return;
    }
    const lmpDate = new Date(lmp + 'T00:00:00'); // Ensure local timezone
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (lmpDate > today) {
        setError('La fecha de última menstruación no puede ser en el futuro.');
        return;
    }
    
    setError('');

    const diffTime = Math.abs(today.getTime() - lmpDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    const edd = new Date(lmpDate);
    edd.setDate(edd.getDate() + 280);
    const eddString = edd.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    onCalculate({ 
        value: `${weeks} semanas, ${days} días`,
        details: {
            'Fecha de Última Menstruación (FUM)': lmpDate.toLocaleDateString('es-ES'),
            'Fecha Probable de Parto (FPP)': eddString
        }
    });
  };
  
  const inputClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Fecha de Última Menstruación (FUM)</label>
        <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className={inputClasses} />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={calculateGA} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Edad Gestacional
      </button>
    </div>
  );
};

export default GestationalAgeLMP;