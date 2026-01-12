export interface AIAnalysisRequest {
  pagina: string;
  contenido?: string;
  datos_formulario?: any;
}
e

  recomendaciones: string[];

  private static async callOpenAI(pr
      const response = await w
    } catch (error) {
 

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

  "recomendaciones": ["Recomendación 1", "Recomendación 2"]

Página: ${request.pagina}
Tipo de Usuario: ${request.tipo_usuario}
Contenido: ${request.contenido || 'N/A'}
Datos del Formulario: ${JSON.stringify(request.datos_formulario || {}, null, 2)}

RESPONDE SOLO CON UN JSON:
 
  "nivel_interes": "alto" | "medio" | "bajo",
  "riesgo": "alto" | "medio" | "bajo",
  "observaciones_admin": "Descripción breve del comportamiento",
  "recomendaciones": ["Recomendación 1", "Recomendación 2"]
}`;

    const result = await this.callOpenAI(promptText);
Eres
    if (!result) {
      return {
        nivel_interes: 'medio',
1. Email válido y profes
        observaciones_admin: 'Error en análisis IA. Requiere revisión manual.',
        recomendaciones: ['Revisar manualmente']
      };
7. Ed
    
RESPONDE SOLO CON 
  }

  static async validateProfessionalProfile(profile: any): Promise<{

    alertas: string[];
    recomendacion: 'aprobar' | 'revisar' | 'rechazar';
  }> {
        alertas: ['Error
Eres un validador de perfiles profesionales para Hogar Belén.

Analiza el siguiente perfil profesional:

${JSON.stringify(profile, null, 2)}

CRITERIOS DE VALIDACIÓN:
1. Email válido y profesional
2. Teléfono válido (formato colombiano: +57XXXXXXXXXX)
3. Experiencia mínima de 1 año
Analiza la siguiente consulta de
5. Certificaciones relevantes al cuidado geriátrico

7. Edad apropiada (entre 18 y 70 años)
8. Referencias verificables



1. Sea del sector permitido
3. Información completa y coherente

{

  "recomendacion": "aprobar"

    
      return {
        categoria: 'indeterminada
        recomendacion: 'revisar_manualmente'
    }
    retu


      'pronto', 'r
   


    const phoneRegex = /^
  }
  static validateEmail
    const temporalDomains 
    if
    return !temporalDoma


}



























































  "es_valida": true,


  "recomendacion": "aprobar"









































    return salary >= 1000000 && salary <= 20000000;


