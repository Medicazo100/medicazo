import React, { useState } from 'react';

interface GlasgowComaScaleProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const GlasgowComaScale: React.FC<GlasgowComaScaleProps> = ({ onCalculate }) => {
  const [eye, setEye] = useState(4);
  const [verbal, setVerbal] = useState(5);
  const [motor, setMotor] = useState(6);

  const calculateScore = () => {
    const total = eye + verbal + motor;
    onCalculate({
      value: `${total} Puntos`,
      details: {
        'Respuesta Ocular': `${eye}/4`,
        'Respuesta Verbal': `${verbal}/5`,
        'Respuesta Motora': `${motor}/6`,
      },
    });
  };
  
  const selectClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Respuesta Ocular (E)</label>
        <select value={eye} onChange={(e) => setEye(Number(e.target.value))} className={selectClasses}>
          <option value={4}>4 - Espontánea</option>
          <option value={3}>3 - A la orden verbal</option>
          <option value={2}>2 - Al dolor</option>
          <option value={1}>1 - Ninguna</option>
        </select>
      </div>
      <div>
        <label className={labelClasses}>Respuesta Verbal (V)</label>
        <select value={verbal} onChange={(e) => setVerbal(Number(e.target.value))} className={selectClasses}>
          <option value={5}>5 - Orientado</option>
          <option value={4}>4 - Confuso</option>
          <option value={3}>3 - Palabras inapropiadas</option>
          <option value={2}>2 - Sonidos incomprensibles</option>
          <option value={1}>1 - Ninguna</option>
        </select>
      </div>
      <div>
        <label className={labelClasses}>Respuesta Motora (M)</label>
        <select value={motor} onChange={(e) => setMotor(Number(e.target.value))} className={selectClasses}>
          <option value={6}>6 - Obedece órdenes</option>
          <option value={5}>5 - Localiza el dolor</option>
          <option value={4}>4 - Retirada al dolor</option>
          <option value={3}>3 - Flexión anormal (decorticación)</option>
          <option value={2}>2 - Extensión anormal (descerebración)</option>
          <option value={1}>1 - Ninguna</option>
        </select>
      </div>
      <button onClick={calculateScore} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Puntuación
      </button>
    </div>
  );
};

export default GlasgowComaScale;