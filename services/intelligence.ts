
import { GoogleGenAI, Type, Modality } from "@google/genai";

export class IntelligenceService {
  private static instance: IntelligenceService;
  
  private constructor() {}

  public static getInstance(): IntelligenceService {
    if (!IntelligenceService.instance) {
      IntelligenceService.instance = new IntelligenceService();
    }
    return IntelligenceService.instance;
  }

  /**
   * Always creates a new client instance right before API calls to ensure
   * the most up-to-date API key (e.g. from aistudio dialog) is used.
   */
  private getFreshClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Gemini Live Session Initialization
   */
  public async connectLive(callbacks: any) {
    const ai = this.getFreshClient();
    return ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks,
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
        },
        systemInstruction: 'You are the FashionOS Real-time Concierge. Provide sophisticated production advice.',
      }
    });
  }

  /**
   * Veo 3.1 Cinematic Video Generation - Strictly following API Key Selection Rules
   */
  async generateCinematicVideo(prompt: string) {
    if (typeof window.aistudio !== 'undefined') {
       const hasKey = await window.aistudio.hasSelectedApiKey();
       if (!hasKey) {
          await window.aistudio.openSelectKey();
          // Assume success as per race condition mitigation rule
       }
    }

    const ai = this.getFreshClient(); // Fresh client for Veo
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `High-end luxury fashion cinematic video: ${prompt}. 4k, architectural lighting, shallow depth of field.`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  /**
   * Scan Media Asset using Gemini Vision to calculate DNA compliance
   */
  async scanMediaAsset(imageUrl: string, brandDna: string[]) {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { text: `Analyze this fashion asset against these brand DNA pillars: ${brandDna.join(', ')}. 
            Calculate a compliance score (0-100) and provide a 1-sentence aesthetic audit.
            Format: SCORE: [number] | AUDIT: [text]` },
            { inlineData: { mimeType: 'image/jpeg', data: imageUrl.split(',')[1] || '' } }
          ]
        }
      ]
    });
    
    const text = response.text || '';
    const score = parseInt(text.match(/SCORE:\s*(\d+)/i)?.[1] || '85');
    const audit = text.match(/AUDIT:\s*(.*)/i)?.[1] || "Aesthetic synchronized.";
    return { score, audit };
  }

  async performDeepResearch(topic: string, brandDescription: string) {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Strategic audit: "${topic}". Context: ${brandDescription}.`,
      config: { 
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 4096 }
      }
    });
    return response.text;
  }

  async getStrategicRecommendation(brandName: string, dna: string[], context: string, action: string) {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Brand: ${brandName}. DNA: ${dna.join(', ')}. Action: ${action}.`,
      config: { systemInstruction: "You are the FashionOS Intelligence Engine." }
    });
    return response.text;
  }

  async verifyTrend(topic: string) {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Research trend: "${topic}".`,
      config: { tools: [{ googleSearch: {} }] }
    });
    return {
      text: response.text,
      links: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => chunk.web?.uri).filter(Boolean) || []
    };
  }

  async simulatePerformance(theme: string) {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Simulate reach for "${theme}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ig_reach: { type: Type.NUMBER },
            tiktok_reach: { type: Type.NUMBER },
            conversion_lift: { type: Type.STRING },
            primary_format: { type: Type.STRING }
          },
          required: ["ig_reach", "tiktok_reach", "conversion_lift", "primary_format"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  }

  async suggestNearbyStudios(location: string = "Paris, France") {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `List top studios in ${location}.`,
      config: { tools: [{ googleMaps: {} }] }
    });
    return {
      text: response.text,
      places: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => chunk.maps?.uri).filter(Boolean) || []
    };
  }

  async generateMoodboardPreview(prompt: string) {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: `Luxury moodboard: ${prompt}` }] },
      config: { imageConfig: { aspectRatio: "1:1", imageSize: "1K" } }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
    return null;
  }
}
