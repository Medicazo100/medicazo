import React from 'react';
import type { Calculator } from '../types';
import GlasgowComaScale from './calculators/GlasgowComaScale';
import QSOFAScore from './calculators/QSOFAScore';
import MAPCalculator from './calculators/MAPCalculator';
import CurbsixfiveScore from './calculators/CurbsixfiveScore';
import CHA2DS2VAScScore from './calculators/CHA2DS2VAScScore';
import AnionGapCalculator from './calculators/AnionGapCalculator';
import RansonScore from './calculators/RansonScore';
import SOFAScore from './calculators/SOFAScore';
import GestationalAgeUltrasound from './calculators/GestationalAgeUltrasound';
import ShockIndexCalculator from './calculators/ShockIndexCalculator';
import PlasmaOsmolalityCalculator from './calculators/PlasmaOsmolalityCalculator';
import SFRatioCalculator from './calculators/SFRatioCalculator';
import ABGInterpreter from './calculators/ABGInterpreter';
import ParklandFormula from './calculators/ParklandFormula';
import BrookeFormula from './calculators/BrookeFormula';
import NIHSSCalculator from './calculators/NIHSSCalculator';
import WintersFormula from './calculators/WintersFormula';
import GestationalAgeLMP from './calculators/GestationalAgeLMP';
import VisualAnalogueScale from './calculators/VisualAnalogueScale';
import PHQ2DepressionScreen from './calculators/PHQ2DepressionScreen';
import CSSRSSuicideScreen from './calculators/CSSRSSuicideScreen';


interface CalculatorSelectorProps {
    calculator: Calculator;
    onCalculate: (calculator: Calculator, result: { value: string; details?: Record<string, any> }) => void;
}

const CalculatorSelector: React.FC<CalculatorSelectorProps> = ({ calculator, onCalculate }) => {
    
    const renderCalculator = () => {
        switch (calculator.key) {
            case 'glasgow':
                return <GlasgowComaScale onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'qsofa':
                return <QSOFAScore onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'map':
                return <MAPCalculator onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'curb65':
                return <CurbsixfiveScore onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'cha2ds2vasc':
                return <CHA2DS2VAScScore onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'aniongap':
                return <AnionGapCalculator onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'ranson':
                return <RansonScore onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'sofa':
                return <SOFAScore onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'ultrasound_ga':
                return <GestationalAgeUltrasound onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'shock_index':
                return <ShockIndexCalculator onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'plasma_osmolality':
                return <PlasmaOsmolalityCalculator onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'sf_ratio':
                return <SFRatioCalculator onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'abg_interpreter':
                return <ABGInterpreter onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'parkland':
                return <ParklandFormula onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'brooke':
                return <BrookeFormula onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'nihss':
                return <NIHSSCalculator onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'winters':
                return <WintersFormula onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'lmp_ga':
                return <GestationalAgeLMP onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'visual_analog_scale':
                return <VisualAnalogueScale onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'phq2_depression':
                return <PHQ2DepressionScreen onCalculate={(result) => onCalculate(calculator, result)} />;
            case 'cssrs_suicide':
                return <CSSRSSuicideScreen onCalculate={(result) => onCalculate(calculator, result)} />;
            default:
                return <p>Calculadora no implementada aún.</p>;
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{calculator.name}</h3>
            {renderCalculator()}
        </div>
    );
};

export default CalculatorSelector;