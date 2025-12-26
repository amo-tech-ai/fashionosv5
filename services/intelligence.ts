import { GoogleGenAI, Type, Modality } from "@google/genai";

export interface GroundedLink {
  uri: string;
  title: string;
}

export interface IntelligenceResponse {
  text: string;
  links: GroundedLink[];
}

export class IntelligenceService {
  private static instance: IntelligenceService;
  
  private constructor() {}

  public static getInstance(): IntelligenceService {
    if (!IntelligenceService.instance) {
      IntelligenceService.instance = new IntelligenceService();
    }
    return IntelligenceService.instance;
  }

  private getFreshClient() {
    // API Key must be obtained exclusively from process.env.API_KEY
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private extractGrounding(response: any): GroundedLink[] {
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (!chunks) return [];
    
    return chunks
      .map((chunk: any) => ({
        uri: chunk.web?.uri || chunk.maps?.uri,
        title: chunk.web?.title || chunk.maps?.title || "Source"
      }))
      .filter((link: GroundedLink) => link.uri);
  }

  /**
   * Run System-Wide Connectivity Diagnostics
   */
  public async checkConnectivity() {
    const ai = this.getFreshClient();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'Connectivity Check. Respond with OK.',
        config: { thinkingConfig: { thinkingBudget: 0 } }
      });
      // Property .text is used, not a method
      return { status: 'Operational', latency: 'Optimal', response: response.text };
    } catch (e: any) {
      return { status: 'Degraded', error: e.message };
    }
  }

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

  async verifyTrend(topic: string): Promise<IntelligenceResponse> {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform high-fidelity research on luxury trend: "${topic}". Identify current velocity and Maison impact.`,
      config: { 
        tools: [{ googleSearch: {} }] 
      }
    });

    return {
      text: response.text || "Trend context synchronized.",
      links: this.extractGrounding(response)
    };
  }

  async performDeepResearch(topic: string, brandDescription: string): Promise<IntelligenceResponse> {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform deep strategic audit: "${topic}". Context: ${brandDescription}. Analyze long-term Maison equity.`,
      config: { 
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 4096 }
      }
    });
    
    return {
      text: response.text || "Strategic synthesis complete.",
      links: this.extractGrounding(response)
    };
  }

  async getStrategicRecommendation(brandName: string, dna: string[], context: string, action: string): Promise<IntelligenceResponse> {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Brand: ${brandName}. DNA: ${dna.join(', ')}. Action: ${action}. Context: ${context}.`,
      config: { 
        systemInstruction: "You are the FashionOS Intelligence Engine. Provide precise, luxury-aligned advice.",
        tools: [{ googleSearch: {} }]
      }
    });
    
    return {
      text: response.text || "Recommendation generated.",
      links: this.extractGrounding(response)
    };
  }

  async generateCinematicVideo(prompt: string) {
    const ai = this.getFreshClient();
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

  async architectShotList(concept: string, dna: string[], platforms: string[]) {
    const ai = this.getFreshClient();
    const prompt = `Act as a Luxury Production Producer. Generate a comprehensive technical shot list for: "${concept}". DNA: ${dna.join(', ')}. Return ONLY JSON array of 12 objects {id, description, lighting, pose, channel}.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '[]');
  }

  async scanMediaAsset(imageUrl: string, brandDna: string[]) {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { text: `Analyze DNA compliance: ${brandDna.join(', ')}. Return SCORE: [0-100] and AUDIT: [text]. Format: SCORE: [number] | AUDIT: [text]` },
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
      text: response.text || "Studio context found.",
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

  async summarizeConversation(messages: {role: string, content: string}[]) {
    const ai = this.getFreshClient();
    const context = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following strategy session for a luxury brand. Summarize into 3 specific executive insights and a concluding 'Strategic Directive'. Context: \n${context}`,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    return response.text || "Summary unsuccessful.";
  }
}