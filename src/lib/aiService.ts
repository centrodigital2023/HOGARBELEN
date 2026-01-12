export interface AIAnalysisRequest {
  pagina: string;
  contenido?: string;
  datos_formulario?: 

  tipo_usuario: 'familia'
 

}
export class AIService {
    try {
      return JSON.parse(response);
      console.error('Error calling O
    }

 

export class AIService {
  private static async callOpenAI(prompt: string): Promise<any> {
    try {
      const response = await window.spark.llm(prompt, 'gpt-4o', true);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      return null;
    }
  }

  static async analyzeUserInteraction(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const promptText = `
Eres un sistema de inteligencia artificial para Hogar Belén, una plataforma de cuidado del adulto mayor en Colombia.

Analiza el siguiente contexto y devuelve SOLO un JSON con la estructura exacta especificada.

{
  "nivel_interes": "alto",
  "riesgo": "bajo",
  "observaciones_admin": "Usuario busca cu

    

        nivel_inter
        riesgo: 'medio',
        observaciones_admin: 'Error en análisis IA. Requiere revis
    }
    return result;

    nivel_confianza: 'alto' | 'medio' | 'bajo';

    const promptText = `


${JSON.stringify(profile, 
CRITERIOS DE VALIDACI
2. Teléfono válido 
4. Ciudad reconocida en Colombia
6. Descripción profesional coherente (mínimo 100 caracteres)
8. 

  "nivel_confianza": "alto" | "medio" | "bajo",
  "r

    
      return {
        alertas: ['Error en val
      };

  }
  static async classifyLead(leadData: any): Promise<{
    urge
    o




1. tipo_usuario: "familia", "profesional", "empleador"
3. prioridad: "alta", "media", "baja"

{
  "urg
  "observaciones": "Busc


      return {

       
    }


    es_valida: boolean;
    alertas: string[];
  }> {
Eres un validador de ofertas de 
Solo se permiten ofertas relacionadas con:
- Enfermería geriátrica
- Acompañamiento terapéutico


RESPONDE SOLO CON UN JSON:
{
  "nivel_confianza": "alto" | "medio" | "bajo",
  "alertas": ["alerta 1", "alerta 2"],
  "recomendacion": "aprobar" | "revisar" | "rechazar"
}`;

    const result = await this.callOpenAI(promptText);
    
    if (!result) {
      return {
        nivel_confianza: 'medio',
        alertas: ['Error en validación automática'],
        recomendacion: 'revisar'
      };
    }

    return result;
  }

  static async classifyLead(leadData: any): Promise<{
    tipo_usuario: string;
    urgencia: string;
    prioridad: string;
    observaciones: string;
  }> {
    const promptText = `
Eres un clasificador de leads para Hogar Belén.

Analiza la siguiente consulta de un usuario:

${JSON.stringify(leadData, null, 2)}

Clasifica según:
1. tipo_usuario: "familia", "profesional", "empleador"
2. urgencia: "alta", "media", "baja"
3. prioridad: "alta", "media", "baja"
4. observaciones: Resumen breve de la necesidad del usuario

RESPONDE SOLO CON UN JSON:
{
  "tipo_usuario": "familia",
  "urgencia": "alta",
  "prioridad": "alta",
  "observaciones": "Busca cuidador inmediato"
}`;

    const result = await this.callOpenAI(promptText);
    
    if (!result) {
      return {
        tipo_usuario: 'indeterminado',
        urgencia: 'media',
        prioridad: 'media',
        observaciones: 'Requiere revisión manual'
      };
    }

    return result;
  }

  static async validateJobOffer(offerData: any): Promise<{
    es_valida: boolean;
    categoria: string;
    alertas: string[];
    recomendacion: string;
  }> {
    const promptText = `
Eres un validador de ofertas de trabajo para Hogar Belén.

Solo se permiten ofertas relacionadas con:
- Cuidado del adulto mayor
- Enfermería geriátrica
- Servicios de salud
- Acompañamiento terapéutico
- Profesionales de gerontología

Analiza esta oferta:

${JSON.stringify(offerData, null, 2)}

Valida que:
1. Sea del sector permitido
2. No contenga spam
3. Información completa y coherente
4. Salario razonable (si se especifica)

RESPONDE SOLO CON UN JSON:
{
  "es_valida": true/false,
  "categoria": "cuidado_adulto_mayor",
  "alertas": [],
  "recomendacion": "aprobar" | "rechazar"
}`;

    const result = await this.callOpenAI(promptText);
    
    if (!result) {
      return {
        es_valida: false,
        categoria: 'indeterminada',
        alertas: ['Error en validación'],
        recomendacion: 'revisar_manualmente'
      };
    }

    return result;
  }

  static detectUrgencyKeywords(text: string): boolean {
    const urgencyKeywords = [
      'urgente', 'ya', 'inmediato', 'ahora', 'emergencia',
      'pronto', 'rapido', 'hoy', 'cuanto antes', 'necesito'
    ];
    
    const lowerText = text.toLowerCase();
    return urgencyKeywords.some(keyword => lowerText.includes(keyword));
  }

  static validateColombianPhone(phone: string): boolean {
    const phoneRegex = /^\+57\d{10}$/;
    return phoneRegex.test(phone);
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const temporalDomains = ['tempmail', 'guerrillamail', '10minutemail', 'throwaway'];
    
    if (!emailRegex.test(email)) return false;
    
    return !temporalDomains.some(domain => email.toLowerCase().includes(domain));
  }

  static validateSalaryRange(salary: number): boolean {
    return salary >= 10000 && salary <= 200000;
  }
}

${JSON.stringify(offerData, null, 2)}

Valida que:
1. Sea del sector permitido
2. No contenga spam
3. Información completa y coherente
4. Salario razonable (si se especifica)

RESPONDE SOLO CON UN JSON:
{
  "es_valida": true/false,
  "categoria": "cuidado_adulto_mayor",
  "alertas": [],
  "recomendacion": "aprobar" | "rechazar"
}`;

    const result = await this.callOpenAI(promptText);
    
    if (!result) {
      return {
        es_valida: false,
        categoria: 'indeterminada',
        alertas: ['Error en validación'],
        recomendacion: 'revisar_manualmente'
      };
    }

    return result;
  }

  static detectUrgencyKeywords(text: string): boolean {
    const urgencyKeywords = [
      'urgente', 'ya', 'inmediato', 'ahora', 'emergencia',
      'pronto', 'rapido', 'hoy', 'cuanto antes', 'necesito'
    ];
    
    const lowerText = text.toLowerCase();
    return urgencyKeywords.some(keyword => lowerText.includes(keyword));
  }

  static validateColombianPhone(phone: string): boolean {
    const phoneRegex = /^\+57\d{10}$/;
    return phoneRegex.test(phone);
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const temporalDomains = ['tempmail', 'guerrillamail', '10minutemail', 'throwaway'];
    
    if (!emailRegex.test(email)) return false;
    
    return !temporalDomains.some(domain => email.toLowerCase().includes(domain));
  }

  static validateSalaryRange(salary: number): boolean {
    return salary >= 10000 && salary <= 200000;
  }
}
