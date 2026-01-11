export interface AIAnalysisRequest {
  pagina: string;
  tipo_evento: string;
  contenido?: string;
  accion_usuario?: string;
  datos_formulario?: any;
}

export interface AIAnalysisResponse {
  tipo_usuario: 'familia' | 'profesional' | 'empleador' | 'indeterminado';
  nivel_interes: 'alto' | 'medio' | 'bajo';
  urgencia: 'alta' | 'media' | 'baja';
  riesgo: 'alto' | 'medio' | 'bajo';
  recomendacion_accion: string;
  observaciones_admin: string;
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

CONTEXTO:
- Página visitada: ${request.pagina}
- Tipo de evento: ${request.tipo_evento}
- Contenido: ${request.contenido || 'N/A'}
- Acción del usuario: ${request.accion_usuario || 'N/A'}
- Datos del formulario: ${JSON.stringify(request.datos_formulario || {})}

ANÁLISIS REQUERIDO:
1. tipo_usuario: Clasifica como "familia", "profesional", "empleador" o "indeterminado"
2. nivel_interes: "alto", "medio" o "bajo" según el comportamiento
3. urgencia: "alta", "media" o "baja" basado en palabras clave como "urgente", "ya", "inmediato"
4. riesgo: "alto", "medio" o "bajo" (detecta spam, información inconsistente, datos sospechosos)
5. recomendacion_accion: Una acción específica para el administrador (ej: "contactar_urgente", "revisar_perfil", "aprobar", "rechazar")
6. observaciones_admin: Un resumen breve de 1-2 líneas para el administrador

RESPONDE SOLO CON UN JSON en este formato exacto:
{
  "tipo_usuario": "familia",
  "nivel_interes": "alto",
  "urgencia": "alta",
  "riesgo": "bajo",
  "recomendacion_accion": "contactar_urgente",
  "observaciones_admin": "Usuario busca cuidador inmediato para familiar."
}`;

    const result = await this.callOpenAI(promptText);
    
    if (!result) {
      return {
        tipo_usuario: 'indeterminado',
        nivel_interes: 'medio',
        urgencia: 'media',
        riesgo: 'medio',
        recomendacion_accion: 'revisar_manualmente',
        observaciones_admin: 'Error en análisis IA. Requiere revisión manual.'
      };
    }

    return result;
  }

  static async validateProfessionalProfile(profile: any): Promise<{
    nivel_confianza: 'alto' | 'medio' | 'bajo';
    alertas: string[];
    recomendacion: 'aprobar' | 'revisar' | 'rechazar';
  }> {
    const promptText = `
Eres un sistema de validación de perfiles profesionales para Hogar Belén.

Analiza el siguiente perfil de profesional de salud y detecta inconsistencias, información sospechosa o datos incompletos.

PERFIL:
${JSON.stringify(profile, null, 2)}

CRITERIOS DE VALIDACIÓN:
1. Nombre completo (no apodos ni nombres poco creíbles)
2. Teléfono válido Colombia (+57 y 10 dígitos)
3. Email no temporal
4. Ciudad reconocida en Colombia
5. Categoría coherente con título profesional
6. Descripción profesional coherente (mínimo 100 caracteres)
7. Años de experiencia razonable (0-50)
8. Tarifa por hora razonable (10000-200000 COP)

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
