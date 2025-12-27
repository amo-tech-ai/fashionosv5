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
    return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  private safeParseJson(text: string | undefined): any {
    if (!text) return null;
    try {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      console.error("Neural Parse Failure:", e, text);
      return null;
    }
  }

  private extractGrounding(response: any): GroundedLink[] {
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (!chunks) return [];
    
    return chunks
      .map((chunk: any) => ({
        uri: chunk.web?.uri || chunk.maps?.uri,
        title: chunk.web?.title || chunk.maps?.title || "Maison Source"
      }))
      .filter((link: GroundedLink) => link.uri);
  }

  public async checkConnectivity() {
    const ai = this.getFreshClient();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'Pulse Check. Respond with: Operational.',
        config: { thinkingConfig: { thinkingBudget: 0 } }
      });
      return { status: 'Operational', latency: 'Optimal', response: response.text };
    } catch (e: any) {
      return { status: 'Degraded', error: e.message || 'Handshake failed.' };
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
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction: 'You are the FashionOS Real-time Concierge. Provide sophisticated production advice with brevity.',
      }
    });
  }

  async verifyTrend(topic: string): Promise<IntelligenceResponse> {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Research current luxury trend velocity for: "${topic}". Focus on SS25 impact.`,
      config: { 
        tools: [{ googleSearch: {} }] 
      }
    });

    return {
      text: response.text || "Trend context synchronized.",
      links: this.extractGrounding(response)
    };
  }

  async getStrategicRecommendation(brandName: string, dna: string[], context: string, action: string): Promise<IntelligenceResponse> {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Maison: ${brandName}. Pillars: ${dna.join(', ')}. Action: ${action}. Context: ${context}.`,
      config: { 
        systemInstruction: "You are the FashionOS Strategy Engine. Provide precise, luxury-aligned advice.",
        tools: [{ googleSearch: {} }]
      }
    });
    
    return {
      text: response.text || "Insight generated.",
      links: this.extractGrounding(response)
    };
  }

  async generateCinematicVideo(prompt: string) {
    const ai = this.getFreshClient();
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic high-end fashion film: ${prompt}. Architectural lighting, 4k, desaturated.`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 8000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  async architectShotList(concept: string, dna: string[], platforms: string[]) {
    const ai = this.getFreshClient();
    const prompt = `Generate a technical fashion shot list for: "${concept}". DNA: ${dna.join(', ')}. Platforms: ${platforms.join(', ')}. Return ONLY a JSON array of objects {id, description, lighting, pose, channel}.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return this.safeParseJson(response.text) || [];
  }

  async scanMediaAsset(imageUrl: string, brandDna: string[]) {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { text: `Analyze aesthetic DNA compliance for pillars: ${brandDna.join(', ')}. Return SCORE: [0-100] and AUDIT: [text]. Format: SCORE: [number] | AUDIT: [text]` },
            { inlineData: { mimeType: 'image/jpeg', data: imageUrl.split(',')[1] || '' } }
          ]
        }
      ]
    });
    const text = response.text || '';
    const score = parseInt(text.match(/SCORE:\s*(\d+)/i)?.[1] || '85');
    const audit = text.match(/AUDIT:\s*(.*)/i)?.[1] || "Aesthetic synchronization complete.";
    return { score, audit };
  }

  async simulatePerformance(theme: string) {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Simulate omnichannel reach for campaign concept: "${theme}".`,
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
    return this.safeParseJson(response.text) || { ig_reach: 0, tiktok_reach: 0, conversion_lift: '0%', primary_format: 'None' };
  }

  async suggestNearbyStudios(location: string): Promise<{ text: string, places: string[] }> {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: `List professional photography and production studios near ${location} for luxury brands.`,
      config: { tools: [{ googleMaps: {} }] }
    });
    const links = this.extractGrounding(response);
    return {
      text: response.text || "Nearby production studios identified.",
      places: links.map(l => l.uri)
    };
  }

  async performDeepResearch(topic: string, brandContext: string): Promise<IntelligenceResponse> {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform deep strategic research on: "${topic}". Brand Context: ${brandContext}. Focus on SS25 trajectory and market whitespace.`,
      config: { 
        thinkingConfig: { thinkingBudget: 4096 },
        tools: [{ googleSearch: {} }]
      }
    });
    
    return {
      text: response.text || "Strategic research synchronized.",
      links: this.extractGrounding(response)
    };
  }

  async generateMoodboardPreview(prompt: string) {
    const ai = this.getFreshClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: `High-fidelity luxury moodboard: ${prompt}` }] },
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
      contents: `Summarize this strategy session into 3 insights and 1 'Strategic Directive'. Context: \n${context}`,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    return response.text || "Summarization failed.";
  }
}