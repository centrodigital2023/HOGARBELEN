export interface AIAnalysisRequest {
  pagina: string;
  tipo_usuario?: stri
}

  recomendaciones: string[];

  private static async callO
 

      return null;
  }
  static 

Página: ${request.pagina}

{
  "recomendaciones



        recomendaciones: ['Error en análisis IA. Requiere revisión manual.']
    }


    nivel_interes: 'alto'
    observaciones_admin: string;




1. Nivel de interés basado en el contenido del mensaje
3. 

RESPONDE SOLO CON UN JSON válido:

  "observaciones_a
}`;
    const result = await
    if (!result) {
        
     

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
        recomendacion: 'revisar'
      };
    }

    return result;
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
  static valida
    re

    return age >= 18 && age <= 70

    return years >= 1;

    const minSalary = 1300000;
   

    const phoneRegex = /^\+57\s?[0-9]{10}$/;

  static detectUrg
      'urgente
    ];
    return urgencyKeywords

    cate
    o

Analiza el siguien
${J

  "categoria": "nombre_categoria",
  "observaciones": "Observaciones sobre este lead"


    
        prioridad: 'media',
      };

  }

















    const minSalary = 1300000;
    const maxSalary = 10000000;
    return salary >= minSalary && salary <= maxSalary;


