export interface AIAnalysisRequest {
  pagina: string;
  contenido?: string;
  tipo_usuario?: string;
  datos_formulario?: any;
}

export interface AIAnalysisResult {
  riesgo: 'alto' | 'medio' | 'bajo';
  recomendaciones: string[];
}

export class AIService {
  private static async callOpenAI(prompt: string): Promise<any> {
    try {
      const response = await window.spark.llm(prompt, 'gpt-4o-mini', true);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      return null;
    }
  }

  static async analyzeUserInteraction(request: AIAnalysisRequest): Promise<AIAnalysisResult> {
    const promptText = `Eres un sistema de inteligencia artificial para analizar interacciones de usuarios en Hogar Belén.

Analiza la siguiente interacción del usuario:
Página: ${request.pagina}
Contenido: ${request.contenido || 'N/A'}

RESPONDE SOLO CON UN JSON válido en el siguiente formato:
{
  "riesgo": "alto" | "medio" | "bajo",
  "recomendaciones": ["Recomendación 1", "Recomendación 2"]
}`;

    const result = await this.callOpenAI(promptText);

    if (!result) {
      return {
        riesgo: 'medio',
        recomendaciones: ['Error en análisis IA. Requiere revisión manual.']
      };
    }

    return result;
  }

  static async analyzeLead(lead: any): Promise<{
    nivel_interes: 'alto' | 'medio' | 'bajo';
    riesgo: 'alto' | 'medio' | 'bajo';
    observaciones_admin: string;
    recomendaciones: string[];
  }> {
    const promptText = `Eres un analista de leads para Hogar Belén, un centro de cuidado para adultos mayores.

Analiza el siguiente lead:

${JSON.stringify(lead, null, 2)}

CRITERIOS DE ANÁLISIS:
1. Nivel de interés basado en el contenido del mensaje
2. Información de contacto válida
3. Coherencia en la consulta
4. Urgencia implícita
5. Potencial de conversión

RESPONDE SOLO CON UN JSON válido:
{
  "nivel_interes": "alto" | "medio" | "bajo",
  "riesgo": "alto" | "medio" | "bajo",
  "observaciones_admin": "Observaciones para el administrador",
  "recomendaciones": ["Recomendación 1", "Recomendación 2"]
}`;

    const result = await this.callOpenAI(promptText);

    if (!result) {
      return {
        nivel_interes: 'medio',
        riesgo: 'medio',
        observaciones_admin: 'Error en análisis IA. Requiere revisión manual.',
        recomendaciones: ['Revisar manualmente']
      };
    }

    return result;
  }

  static async validateProfessionalProfile(profile: any): Promise<{
    es_valida: boolean;
    alertas: string[];
    recomendacion: 'aprobar' | 'revisar' | 'rechazar';
    nivel_confianza?: string;
  }> {
    const promptText = `Eres un validador de perfiles profesionales para Hogar Belén.

Analiza el siguiente perfil profesional:

${JSON.stringify(profile, null, 2)}

CRITERIOS DE VALIDACIÓN:
1. Email válido y profesional
2. Teléfono válido (formato colombiano: +57XXXXXXXXXX)
3. Experiencia mínima de 1 año
4. Especialización relevante al cuidado geriátrico
5. Certificaciones relevantes al cuidado geriátrico
6. Disponibilidad coherente
7. Edad apropiada (entre 18 y 70 años)
8. Referencias verificables

RESPONDE SOLO CON UN JSON válido:
{
  "es_valida": true/false,
  "alertas": ["Alerta 1", "Alerta 2"],
  "recomendacion": "aprobar" | "revisar" | "rechazar"
}`;

    const result = await this.callOpenAI(promptText);

    if (!result) {
      return {
        es_valida: false,
        alertas: ['Error en validación IA. Requiere revisión manual.'],
        recomendacion: 'revisar',
        nivel_confianza: 'medio'
      };
    }

    return {
      ...result,
      nivel_confianza: result.nivel_confianza || 'medio'
    };
  }

  static async categorizeQuery(query: string): Promise<{
    categoria: string;
    urgencia: 'alta' | 'media' | 'baja';
    recomendacion: string;
  }> {
    const promptText = `Eres un clasificador de consultas para Hogar Belén.

Analiza la siguiente consulta de usuario:

"${query}"

CATEGORÍAS POSIBLES:
- informacion_general
- precios_planes
- reserva_servicio
- soporte_tecnico
- consulta_medica
- queja_reclamo
- otro

RESPONDE SOLO CON UN JSON válido:
{
  "categoria": "nombre_categoria",
  "urgencia": "alta" | "media" | "baja",
  "recomendacion": "Acción recomendada para el administrador"
}`;

    const result = await this.callOpenAI(promptText);

    if (!result) {
      return {
        categoria: 'indeterminada',
        urgencia: 'media',
        recomendacion: 'revisar_manualmente'
      };
    }

    return result;
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const temporalDomains = ['tempmail.com', 'guerrillamail.com', '10minutemail.com'];
    const domain = email.split('@')[1];
    
    if (!emailRegex.test(email)) {
      return false;
    }
    
    return !temporalDomains.includes(domain);
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+57[0-9]{10}$/;
    return phoneRegex.test(phone);
  }

  static validateAge(age: number): boolean {
    return age >= 18 && age <= 70;
  }

  static validateExperience(years: number): boolean {
    return years >= 1;
  }

  static validateSalary(salary: number): boolean {
    const minSalary = 1300000;
    const maxSalary = 10000000;
    return salary >= minSalary && salary <= maxSalary;
  }

  static validateColombianPhone(phone: string): boolean {
    const phoneRegex = /^\+57\s?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  static detectUrgencyKeywords(text: string): boolean {
    const urgencyKeywords = [
      'urgente', 'emergencia', 'inmediato', 'ya', 'ahora',
      'rápido', 'pronto', 'cuanto antes', 'hoy', 'mañana'
    ];
    const lowerText = text.toLowerCase();
    return urgencyKeywords.some(keyword => lowerText.includes(keyword));
  }

  static async classifyLead(leadData: any): Promise<{
    categoria: string;
    prioridad: 'alta' | 'media' | 'baja';
    observaciones: string;
  }> {
    const promptText = `Eres un clasificador de leads para Hogar Belén.

Analiza el siguiente lead:

${JSON.stringify(leadData, null, 2)}

RESPONDE SOLO CON UN JSON válido:
{
  "categoria": "nombre_categoria",
  "prioridad": "alta" | "media" | "baja",
  "observaciones": "Observaciones sobre este lead"
}`;

    const result = await this.callOpenAI(promptText);

    if (!result) {
      return {
        categoria: 'general',
        prioridad: 'media',
        observaciones: 'Clasificación manual requerida'
      };
    }

    return result;
  }
}
