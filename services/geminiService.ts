import { GoogleGenAI, Type } from "@google/genai";
import type { CalculatorSuggestion, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const availableCalculators = [
    { key: 'glasgow', name: 'Escala de Coma de Glasgow', description: 'Evalúa el nivel de conciencia.' },
    { key: 'qsofa', name: 'Puntuación qSOFA', description: 'Identifica riesgo de sepsis.' },
    { key: 'map', name: 'Presión Arterial Media (PAM)', description: 'Calcula la perfusión tisular promedio.' },
    { key: 'curb65', name: 'Escala CURB-65', description: 'Evalúa la gravedad de la neumonía.' },
    { key: 'cha2ds2vasc', name: 'Score CHA₂DS₂-VASc', description: 'Evalúa riesgo de ictus en fibrilación auricular.' },
    { key: 'aniongap', name: 'Anion Gap (Brecha Aniónica)', description: 'Evalúa acidosis metabólica.' },
    { key: 'ranson', name: 'Criterios de Ranson', description: 'Evalúa la gravedad de la pancreatitis.' },
    { key: 'sofa', name: 'Puntuación SOFA', description: 'Evalúa la disfunción orgánica en sepsis.' },
    { key: 'ultrasound_ga', name: 'Edad Gestacional por Ultrasonido', description: 'Calcula la edad gestacional basada en mediciones de ultrasonido.' },
    { key: 'shock_index', name: 'Índice de Choque', description: 'Evalúa la inestabilidad hemodinámica.' },
    { key: 'plasma_osmolality', name: 'Osmolaridad Plasmática', description: 'Calcula la osmolaridad del plasma.' },
    { key: 'sf_ratio', name: 'Índice SatO₂/FiO₂ (S/F)', description: 'Estima la oxigenación en pacientes no intubados.' },
    { key: 'abg_interpreter', name: 'Interpretador de Gasometría Arterial', description: 'Analiza los componentes de una gasometría arterial.' },
    { key: 'parkland', name: 'Fórmula de Parkland', description: 'Calcula la reanimación con líquidos para quemaduras.' },
    { key: 'brooke', name: 'Fórmula de Brooke (Modificada)', description: 'Calcula la reanimación con líquidos para quemaduras, incluyendo coloides.' },
    { key: 'nihss', name: 'Escala NIH para Ictus (NIHSS)', description: 'Cuantifica el déficit neurológico en el ictus.' },
    { key: 'winters', name: 'Fórmula de Winters', description: 'Calcula la compensación respiratoria esperada en acidosis metabólica.' },
    { key: 'lmp_ga', name: 'Edad Gestacional por FUM', description: 'Calcula la edad gestacional y fecha probable de parto desde la FUM.' },
    { key: 'visual_analog_scale', name: 'Escala Visual Análoga (EVA) del Dolor', description: 'Cuantifica la intensidad del dolor percibido por el paciente.' },
    { key: 'phq2_depression', name: 'Cribado de Depresión (PHQ-2)', description: 'Detecta posible trastorno depresivo con dos preguntas rápidas.' },
    { key: 'cssrs_suicide', name: 'Cribado de Riesgo Suicida (C-SSRS)', description: 'Evalúa la ideación y el comportamiento suicida.' },
];

export async function getCalculatorSuggestions(pathology: string): Promise<CalculatorSuggestion[]> {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
    Actúa como un tutor médico experto. Basado en la patología "${pathology}",
    selecciona las 3 o 4 calculadoras médicas más relevantes y comúnmente usadas de la siguiente lista.
    Tu respuesta DEBE ser únicamente un objeto JSON válido que se ajuste al esquema proporcionado.
    No incluyas explicaciones adicionales, solo el JSON.
    
    Lista de calculadoras disponibles:
    ${JSON.stringify(availableCalculators, null, 2)}
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        suggestions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    key: { type: Type.STRING },
                                    name: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                },
                                required: ["key", "name", "description"]
                            }
                        }
                    },
                     required: ["suggestions"]
                }
            }
        });
        
        const jsonText = response.text.trim();
        const parsed = JSON.parse(jsonText);
        return parsed.suggestions || [];

    } catch (error) {
        console.error("Error fetching calculator suggestions from Gemini:", error);
        throw new Error("Failed to get suggestions from AI.");
    }
}

export async function getClinicalInterpretation(calculatorName: string, result: string, pathology: string, details?: Record<string, any>): Promise<{ interpretation: string, sources: GroundingChunk[] }> {
    const model = 'gemini-2.5-flash';
    
    let detailsString = '';
    if (details) {
        detailsString = `\nEl desglose de la puntuación o los valores introducidos son: ${JSON.stringify(details, null, 2)}.`;
    }

    const prompt = `
    Actúa como un médico especialista y educador. Para un paciente con sospecha de "${pathology}", se utilizó la herramienta "${calculatorName}" y se obtuvo un resultado de: ${result}.
    ${detailsString}
    
    Proporciona una interpretación clínica detallada de este resultado en el contexto de la patología. 
    Incluye:
    1. Significado clínico del resultado o de los valores gasométricos.
    2. Posibles implicaciones para el diagnóstico, pronóstico o manejo del paciente.
    3. Siguientes pasos recomendados o consideraciones.
    
    Tu respuesta debe estar basada en evidencia y guías clínicas actualizadas (utiliza la búsqueda para obtener información reciente).
    La respuesta es con fines educativos. Formatea la respuesta en Markdown.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }]
            }
        });
        
        const interpretation = response.text;
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        const sources: GroundingChunk[] = groundingMetadata?.groundingChunks?.filter((chunk): chunk is GroundingChunk => 'web' in chunk) || [];

        return { interpretation, sources };
    } catch (error) {
        console.error("Error fetching clinical interpretation from Gemini:", error);
        throw new Error("Failed to get interpretation from AI.");
    }
}