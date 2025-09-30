import React, { useState } from 'react';

interface VisualAnalogueScaleProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const VisualAnalogueScale: React.FC<VisualAnalogueScaleProps> = ({ onCalculate }) => {
  const [painScore, setPainScore] = useState(5);

  const handleCalculate = () => {
    onCalculate({
      value: `${painScore} / 10`,
      details: {
        'Puntuación de Dolor': painScore,
      },
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <label htmlFor="pain-slider" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Deslice para indicar la intensidad del dolor:
        </label>
        <span className="text-5xl font-bold text-indigo-600 dark:text-violet-400 mb-4">{painScore}</span>
        <input
            id="pain-slider"
            type="range"
            min="0"
            max="10"
            value={painScore}
            onChange={(e) => setPainScore(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
        />
        <div className="w-full flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 px-1">
            <span>0<br/>(Sin Dolor)</span>
            <span>10<br/>(Peor Dolor Imaginable)</span>
        </div>
      </div>
      <button onClick={handleCalculate} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Registrar Puntuación
      </button>
    </div>
  );
};

export default VisualAnalogueScale;