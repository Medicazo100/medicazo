import React, { useState } from 'react';

interface PHQ2DepressionScreenProps {
  onCalculate: (result: { value: string; details: Record<string, any> }) => void;
}

const questions = [
    "Poco interés o placer en hacer las cosas",
    "Sentirse decaído(a), deprimido(a) o sin esperanzas"
];

const options = [
    { label: "Ningún día", value: 0 },
    { label: "Varios días", value: 1 },
    { label: "Más de la mitad de los días", value: 2 },
    { label: "Casi todos los días", value: 3 }
];

const PHQ2DepressionScreen: React.FC<PHQ2DepressionScreenProps> = ({ onCalculate }) => {
  const [answers, setAnswers] = useState([0, 0]);

  const handleAnswerChange = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };
  
  const calculateScore = () => {
    const totalScore = answers.reduce((sum, a) => sum + a, 0);
    onCalculate({
      value: `${totalScore} Puntos`,
      details: {
        [questions[0]]: `${answers[0]} ptos (${options[answers[0]].label})`,
        [questions[1]]: `${answers[1]} ptos (${options[answers[1]].label})`
      }
    });
  };

  const selectClasses = "w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900/70 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?</p>
        {questions.map((q, index) => (
            <div key={index}>
                <label className={labelClasses}>{index + 1}. {q}</label>
                 <select 
                    value={answers[index]} 
                    onChange={(e) => handleAnswerChange(index, Number(e.target.value))} 
                    className={selectClasses}
                >
                    {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>)}
                </select>
            </div>
        ))}
      <button onClick={calculateScore} className="w-full mt-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-violet-700 dark:hover:from-purple-700 dark:hover:to-violet-800 dark:focus:ring-violet-500 transition-transform transform hover:scale-105">
        Calcular Puntuación PHQ-2
      </button>
    </div>
  );
};

export default PHQ2DepressionScreen;