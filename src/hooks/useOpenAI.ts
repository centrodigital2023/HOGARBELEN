import { useState } from 'react';

const OPENAI_API_KEY = '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';

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

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Eres un asistente de análisis de comportamiento para una plataforma de cuidado del adulto mayor. Responde solo con JSON válido.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 500,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No response from OpenAI');
      }

      const analysis: AIAnalysisResponse = JSON.parse(content);
      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error en análisis IA:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const validateProfessionalProfile = async (profileData: Record<string, any>): Promise<AIAnalysisResponse | null> => {
    setLoading(true);
    setError(null);

    try {
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

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Eres un asistente de validación de perfiles profesionales. Responde solo con JSON válido.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.2,
          max_tokens: 500,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No response from OpenAI');
      }

      const analysis: AIAnalysisResponse = JSON.parse(content);
      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error en validación IA:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const classifyLead = async (leadData: Record<string, any>): Promise<AIAnalysisResponse | null> => {
    setLoading(true);
    setError(null);

    try {
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

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Eres un asistente de clasificación de leads. Responde solo con JSON válido.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 500,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No response from OpenAI');
      }

      const analysis: AIAnalysisResponse = JSON.parse(content);
      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error en clasificación de lead:', err);
      return null;
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
