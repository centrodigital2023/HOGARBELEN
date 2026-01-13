import { useState } from 'react';

interface AIAnalysisRequest {
  pagina: string;
  tipo_evento: 'view_content' | 'form_submit' | 'button_click' | 'scroll';
  contenido?: string;
  accion_usuario?: string;
  datos_formulario?: Record<string, any>;
}

interface AIAnalysisResponse {
  tipo_usuario: 'familia' | 'profesional' | 'empleador' | 'informativo';
  nivel_interes: 'alto' | 'medio' | 'bajo';
  urgencia: 'alta' | 'media' | 'baja';
  riesgo: 'alto' | 'medio' | 'bajo';
  recomendacion_accion: string;
  observaciones_admin: string;
}

export const useOpenAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeUserBehavior = async (request: AIAnalysisRequest): Promise<AIAnalysisResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      // Verificar si Spark LLM está disponible
      if (!window.spark || !window.spark.llm) {
        console.warn('Spark LLM no disponible, retornando valores por defecto');
        return {
          tipo_usuario: 'informativo',
          nivel_interes: 'medio',
          urgencia: 'baja',
          riesgo: 'bajo',
          recomendacion_accion: 'Monitorear',
          observaciones_admin: 'Análisis automático no disponible'
        };
      }

      const prompt = `Eres un sistema de inteligencia artificial para una plataforma de cuidado del adulto mayor en Colombia llamada Hogar Belén.

Analiza el contexto de la página, el comportamiento del usuario y los datos enviados.

Contexto:
- Página visitada: ${request.pagina}
- Tipo de evento: ${request.tipo_evento}
- Acción del usuario: ${request.accion_usuario || 'navegación general'}
${request.contenido ? `- Contenido visible: ${request.contenido}` : ''}
${request.datos_formulario ? `- Datos del formulario: ${JSON.stringify(request.datos_formulario)}` : ''}

Devuelve SOLO un JSON válido con la siguiente estructura (sin texto adicional):
{
  "tipo_usuario": "familia" | "profesional" | "empleador" | "informativo",
  "nivel_interes": "alto" | "medio" | "bajo",
  "urgencia": "alta" | "media" | "baja",
  "riesgo": "alto" | "medio" | "bajo",
  "recomendacion_accion": "descripción de la acción recomendada",
  "observaciones_admin": "observaciones para el administrador"
}`;

      const result = await window.spark.llm(prompt, 'gpt-4o-mini', true);
      
      // Parsear el resultado
      const analysis: AIAnalysisResponse = JSON.parse(result);
      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error en análisis IA:', err);
      
      // Retornar valores por defecto en caso de error
      return {
        tipo_usuario: 'informativo',
        nivel_interes: 'medio',
        urgencia: 'baja',
        riesgo: 'bajo',
        recomendacion_accion: 'Monitorear',
        observaciones_admin: `Error en análisis: ${errorMessage}`
      };
    } finally {
      setLoading(false);
    }
  };

  const validateProfessionalProfile = async (profileData: Record<string, any>): Promise<AIAnalysisResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      // Verificar si Spark LLM está disponible
      if (!window.spark || !window.spark.llm) {
        console.warn('Spark LLM no disponible');
        return {
          tipo_usuario: 'profesional',
          nivel_interes: 'medio',
          urgencia: 'media',
          riesgo: 'bajo',
          recomendacion_accion: 'revisar_manual',
          observaciones_admin: 'Validación automática no disponible - revisar manualmente'
        };
      }

      const prompt = `Eres un sistema de validación de perfiles profesionales para Hogar Belén, una plataforma de cuidado del adulto mayor.

Analiza el siguiente perfil profesional y determina su nivel de confianza:

${JSON.stringify(profileData, null, 2)}

Devuelve SOLO un JSON válido con la siguiente estructura:
{
  "tipo_usuario": "profesional",
  "nivel_interes": "alto" | "medio" | "bajo",
  "urgencia": "alta" | "media" | "baja",
  "riesgo": "alto" | "medio" | "bajo",
  "recomendacion_accion": "aprobar" | "rechazar" | "revisar_manual",
  "observaciones_admin": "observaciones detalladas sobre el perfil"
}`;

      const result = await window.spark.llm(prompt, 'gpt-4o-mini', true);
      const analysis: AIAnalysisResponse = JSON.parse(result);
      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error en validación IA:', err);
      
      return {
        tipo_usuario: 'profesional',
        nivel_interes: 'medio',
        urgencia: 'media',
        riesgo: 'bajo',
        recomendacion_accion: 'revisar_manual',
        observaciones_admin: `Error en validación: ${errorMessage}`
      };
    } finally {
      setLoading(false);
    }
  };

  const classifyLead = async (leadData: Record<string, any>): Promise<AIAnalysisResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      // Verificar si Spark LLM está disponible
      if (!window.spark || !window.spark.llm) {
        console.warn('Spark LLM no disponible');
        return {
          tipo_usuario: 'informativo',
          nivel_interes: 'medio',
          urgencia: 'media',
          riesgo: 'bajo',
          recomendacion_accion: 'seguimiento',
          observaciones_admin: 'Clasificación automática no disponible'
        };
      }

      const prompt = `Eres un sistema de clasificación de leads para Hogar Belén.

Analiza el siguiente lead y clasifícalo:

${JSON.stringify(leadData, null, 2)}

Devuelve SOLO un JSON válido con la siguiente estructura:
{
  "tipo_usuario": "familia" | "profesional" | "empleador",
  "nivel_interes": "alto" | "medio" | "bajo",
  "urgencia": "alta" | "media" | "baja",
  "riesgo": "alto" | "medio" | "bajo",
  "recomendacion_accion": "contactar_urgente" | "contactar_normal" | "seguimiento",
  "observaciones_admin": "observaciones sobre el lead"
}`;

      const result = await window.spark.llm(prompt, 'gpt-4o-mini', true);
      const analysis: AIAnalysisResponse = JSON.parse(result);
      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error en clasificación de lead:', err);
      
      return {
        tipo_usuario: 'informativo',
        nivel_interes: 'medio',
        urgencia: 'media',
        riesgo: 'bajo',
        recomendacion_accion: 'seguimiento',
        observaciones_admin: `Error en clasificación: ${errorMessage}`
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeUserBehavior,
    validateProfessionalProfile,
    classifyLead,
    loading,
    error,
  };
};
