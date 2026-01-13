export interface AIAnalysisRequest {
  pagina: string;
  tipo_usuario?: string;
}

export interface AIAnalysisResult {
  recomendaciones: string[];
}

export class AIService {
  static async analyzePage(request: AIAnalysisRequest): Promise<AIAnalysisResult | null> {
    return {
      recomendaciones: ['Sistema IA no configurado']
    };
  }

  static async analyzeLead(lead: any): Promise<any> {
    return {
      nivel_interes: 'medio',
      riesgo: 'bajo',
      observaciones_admin: 'Análisis IA pendiente'
    };
  }

  static async analyzeProfessional(professional: any): Promise<any> {
    return {
      riesgo: 'bajo',
      clasificacion: 'verificado',
      recomendaciones: []
    };
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateColombianPhone(phone: string): boolean {
    const phoneRegex = /^(\+57)?3[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  static detectUrgencyKeywords(text: string): boolean {
    const urgentKeywords = ['urgente', 'emergencia', 'inmediato', 'ya', 'pronto', 'rápido'];
    const lowerText = text.toLowerCase();
    return urgentKeywords.some(keyword => lowerText.includes(keyword));
  }

  static async classifyLead(leadData: any): Promise<any> {
    return {
      classification: 'medium',
      score: 50,
      priority: 'medium'
    };
  }

  static async analyzeUserInteraction(data: any): Promise<void> {
    console.log('User interaction analyzed:', data);
  }

  static async validateProfessionalProfile(profile: any): Promise<any> {
    return {
      valid: true,
      suggestions: [],
      score: 85
    };
  }
}

