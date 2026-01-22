
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAcademicInsights = async (studentData: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this academic data. Provide 3 strategic insights regarding performance and attendance prediction. Data: ${JSON.stringify(studentData)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            impact: { type: Type.STRING },
            action: { type: Type.STRING }
          },
          required: ["title", "description", "impact", "action"]
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

export const analyzeFeedback = async (feedbacks: string[]) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze these student survey comments. Group them into 4 categories (Teaching, Material, Infrastructure, Support). For each, provide a sentiment score (0-100), 3 key phrases, a concise AI summary, and a trend status. Feedbacks: ${feedbacks.join(' | ')}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            sentiment: { type: Type.NUMBER },
            comments: { type: Type.ARRAY, items: { type: Type.STRING } },
            keyPhrases: { type: Type.ARRAY, items: { type: Type.STRING } },
            aiSummary: { type: Type.STRING },
            trend: { type: Type.STRING, description: "Improving, Declining, or Stable" }
          },
          required: ["category", "sentiment", "comments", "keyPhrases", "aiSummary", "trend"]
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

export const getResourceOptimization = async (context: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on student attendance patterns and class sizes, suggest 3 resource optimizations (e.g., room changes, digital material shifts). Context: ${JSON.stringify(context)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            currentStatus: { type: Type.STRING },
            suggestion: { type: Type.STRING },
            expectedBenefit: { type: Type.STRING }
          },
          required: ["title", "currentStatus", "suggestion", "expectedBenefit"]
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

export const getAIAssistantResponse = async (query: string, context: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an Academic Management AI Expert. Answer this query based on institutional data. Context: ${JSON.stringify(context)}. Query: ${query}`,
  });
  return response.text || "";
};
