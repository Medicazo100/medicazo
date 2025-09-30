import React, { useState } from 'react';

interface NIHSSCalculatorProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const NIHSSCalculator: React.FC<NIHSSCalculatorProps> = ({ onCalculate }) => {
  const [scores, setScores] = useState({
    '1a': 0, '1b': 0, '1c': 0, '2': 0, '3': 0, '4': 0, 
    '5a': 0, '5b': 0, '6a': 0, '6b': 0, 
    '7': 0, '8': 0, '9': 0, '10': 0, '11': 0
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setScores(prev => ({ ...prev, [name]: Number(value) }));
  };

  const calculateScore = () => {
    const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
    const details: Record<string, string> = {};
    for (const [key, value] of Object.entries(scores)) {
      details[`Item ${key.toUpperCase()}`] = `${value} ptos`;
    }
    
    onCalculate({
      value: `${total} Puntos`,
      details,
    });
  };

  const selectClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className={labelClasses}>1a. Nivel de Conciencia</label>
            <select name="1a" value={scores['1a']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Alerta</option>
            <option value={1}>Somnoliento</option>
            <option value={2}>Estuporoso</option>
            <option value={3}>Coma</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>1b. Preguntas de Orientación</label>
            <select name="1b" value={scores['1b']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Responde ambas correctamente</option>
            <option value={1}>Responde una correctamente</option>
            <option value={2}>No responde ninguna</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>1c. Órdenes Motoras</label>
            <select name="1c" value={scores['1c']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Realiza ambas</option>
            <option value={1}>Realiza una</option>
            <option value={2}>No realiza ninguna</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>2. Mirada Conjugada</label>
            <select name="2" value={scores['2']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Normal</option>
            <option value={1}>Paresia de la mirada</option>
            <option value={2}>Desviación forzada</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>3. Campos Visuales</label>
            <select name="3" value={scores['3']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Normal</option>
            <option value={1}>Hemianopsia parcial</option>
            <option value={2}>Hemianopsia completa</option>
            <option value={3}>Hemianopsia bilateral</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>4. Paresia Facial</label>
            <select name="4" value={scores['4']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Normal</option>
            <option value={1}>Menor</option>
            <option value={2}>Parcial</option>
            <option value={3}>Completa</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>5a. Motor Brazo Izquierdo</label>
            <select name="5a" value={scores['5a']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Sin caída</option><option value={1}>Caída</option><option value={2}>Vence gravedad</option><option value={3}>No vence gravedad</option><option value={4}>No movimiento</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>5b. Motor Brazo Derecho</label>
            <select name="5b" value={scores['5b']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Sin caída</option><option value={1}>Caída</option><option value={2}>Vence gravedad</option><option value={3}>No vence gravedad</option><option value={4}>No movimiento</option>
            </select>
        </div>
         <div>
            <label className={labelClasses}>6a. Motor Pierna Izquierda</label>
            <select name="6a" value={scores['6a']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Sin caída</option><option value={1}>Caída</option><option value={2}>Vence gravedad</option><option value={3}>No vence gravedad</option><option value={4}>No movimiento</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>6b. Motor Pierna Derecha</label>
            <select name="6b" value={scores['6b']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Sin caída</option><option value={1}>Caída</option><option value={2}>Vence gravedad</option><option value={3}>No vence gravedad</option><option value={4}>No movimiento</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>7. Ataxia de Miembros</label>
            <select name="7" value={scores['7']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Ausente</option>
            <option value={1}>Presente en una extremidad</option>
            <option value={2}>Presente en dos extremidades</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>8. Sensibilidad</label>
            <select name="8" value={scores['8']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Normal</option>
            <option value={1}>Pérdida leve-moderada</option>
            <option value={2}>Pérdida severa-total</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>9. Lenguaje (Afasia)</label>
            <select name="9" value={scores['9']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Normal</option>
            <option value={1}>Afasia leve-moderada</option>
            <option value={2}>Afasia severa</option>
            <option value={3}>Mutismo/global</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>10. Disartria</label>
            <select name="10" value={scores['10']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Normal</option>
            <option value={1}>Leve-moderada</option>
            <option value={2}>Severa/anartria</option>
            </select>
        </div>
        <div>
            <label className={labelClasses}>11. Extinción/Inatención</label>
            <select name="11" value={scores['11']} onChange={handleSelectChange} className={selectClasses}>
            <option value={0}>Normal</option>
            <option value={1}>Inatención/extinción a una modalidad</option>
            <option value={2}>Hemiatención severa o a >1 modalidad</option>
            </select>
        </div>
      </div>
      <button onClick={calculateScore} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Puntuación NIHSS
      </button>
    </div>
  );
};

export default NIHSSCalculator;