// API Service for Flask Backend Integration
// Configure BASE_URL to point to your Flask backend

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface PHQPattern {
  area: string;
  signal: 'High' | 'Moderate' | 'Low' | 'Not detected';
}

export interface AnalysisResponse {
  phq9_score: number;
  severity: 'Minimal' | 'Mild' | 'Moderate' | 'Moderately Severe' | 'Severe';
  confidence: number;
  interpretation: string;
  suggestions: string[];
  coping_strategies: string[];
  professional_guidance: string;
  confidence_note: string;
  phq_patterns: PHQPattern[];
}

export interface AnalysisRequest {
  text: string;
}

// Mock response for development/demo purposes
const getMockResponse = (text: string): AnalysisResponse => {
  const wordCount = text.split(/\s+/).length;
  const hasNegativeWords = /tired|sad|hopeless|anxious|worried|stressed|alone|empty/i.test(text);
  
  // Simulate varying severity based on content
  let score = Math.min(27, Math.floor(wordCount / 10) + (hasNegativeWords ? 8 : 3));
  let severity: AnalysisResponse['severity'] = 'Minimal';
  
  if (score >= 20) severity = 'Severe';
  else if (score >= 15) severity = 'Moderately Severe';
  else if (score >= 10) severity = 'Moderate';
  else if (score >= 5) severity = 'Mild';
  
  const confidence = 0.75 + Math.random() * 0.2;

  return {
    phq9_score: score,
    severity,
    confidence,
    interpretation: `The language in your text suggests ${severity.toLowerCase()} emotional patterns. The analysis identified themes of ${hasNegativeWords ? 'emotional strain and fatigue' : 'general reflection'}, which may indicate areas where additional support could be beneficial. Remember, this is a supportive tool, not a clinical assessment.`,
    suggestions: [
      "Consider establishing a gentle daily routine that includes moments of rest",
      "Reaching out to a trusted friend or family member can provide valuable support",
      "Journaling your thoughts may help process emotions more effectively",
      "Small acts of self-care, like a short walk, can make a meaningful difference"
    ],
    coping_strategies: [
      "Practice the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8",
      "Try a 5-minute mindfulness exercise focusing on your surroundings",
      "Write down three things you're grateful for each evening",
      "Engage in light physical activity for 15-20 minutes daily"
    ],
    professional_guidance: severity === 'Severe' || severity === 'Moderately Severe'
      ? "Based on the patterns identified, speaking with a mental health professional could provide valuable support and guidance tailored to your needs."
      : "While professional support is always available, the patterns suggest focusing on self-care strategies may be beneficial at this time.",
    confidence_note: confidence > 0.8 
      ? "This guidance is generated with high confidence based on consistent language indicators."
      : "This assessment has moderate confidence. Consider providing more context for refined insights.",
    phq_patterns: [
      { area: "Interest", signal: hasNegativeWords ? "High" : "Low" },
      { area: "Mood", signal: hasNegativeWords ? "High" : "Moderate" },
      { area: "Sleep", signal: "Moderate" },
      { area: "Energy", signal: hasNegativeWords ? "High" : "Low" },
      { area: "Self-worth", signal: "Moderate" },
      { area: "Concentration", signal: "Low" },
      { area: "Psychomotor", signal: "Low" },
      { area: "Self-harm", signal: "Not detected" }
    ]
  };
};

export const analyzeText = async (text: string): Promise<AnalysisResponse> => {
  // For development/demo, use mock response
  // In production, uncomment the fetch call below
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Return mock response for demo
  return getMockResponse(text);
  
  /* Production code - uncomment when connecting to Flask backend:
  
  const response = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Analysis failed. Please try again.');
  }

  return response.json();
  */
};

export const extractTextFromFile = async (file: File): Promise<string> => {
  // For .txt files, read directly
  if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
    return file.text();
  }
  
  // For PDF/DOCX, you would typically send to backend
  // For demo purposes, we'll just return a placeholder
  
  /* Production code:
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${BASE_URL}/extract`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to extract text from file.');
  }

  const data = await response.json();
  return data.text;
  */
  
  // Demo: simulate extraction
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `Extracted text from ${file.name}. This is sample content for demonstration purposes. Replace this with actual file extraction when connected to the Flask backend.`;
};
