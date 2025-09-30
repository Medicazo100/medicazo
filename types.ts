
export interface CalculatorSuggestion {
  key: string;
  name: string;
  description: string;
}

export interface Calculator extends CalculatorSuggestion {}

export interface GroundingChunk {
    web: {
        uri: string;
        title: string;
    };
}
