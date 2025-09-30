import React, { useState } from 'react';

interface GestationalAgeUltrasoundProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const GestationalAgeUltrasound: React.FC<GestationalAgeUltrasoundProps> = ({ onCalculate }) => {
  const [crl, setCrl] = useState('');
  const [error, setError] = useState('');

  const calculateGA = () => {
    const crlMm = parseFloat(crl);

    if (isNaN(crlMm) || crlMm <= 0) {
      setError('Por favor, ingrese un valor válido para LCC (mayor que 0).');
      return;
    }
     if (crlMm < 1 || crlMm > 84) { // Hadlock formula is typically used for CRL up to 84mm
      setError('El valor de LCC es más preciso entre 1 y 84 mm.');
    } else {
      setError('');
    }

    // Using the Robinson and Fleming formula for GA in days from CRL in mm
    const gaDays = 8.052 * Math.sqrt(crlMm) + 23.73;
    const weeks = Math.floor(gaDays / 7);
    const days = Math.round(gaDays % 7);

    onCalculate({ 
        value: `${weeks} semanas, ${days} días`,
        details: {
            'Longitud Cráneo-Caudal (LCC)': `${crl} mm`,
        }
    });
  };
  
  const inputClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Longitud Cráneo-Caudal (LCC) (mm)</label>
        <input type="number" value={crl} onChange={(e) => setCrl(e.target.value)} className={inputClasses} placeholder="Ej: 55" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={calculateGA} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Edad Gestacional
      </button>
    </div>
  );
};

export default GestationalAgeUltrasound;