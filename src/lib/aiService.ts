export interface AIAnalysisRequest {
  pagina: string;
  contenido?: string;
}
export interface AIAnalys
 


  private static async callOpenAI(prompt: s
      const response = await window.
    } catch (error) {
      return null;
 

Eres un sistema de intel
Analiza la siguiente interacción del usuario:
Página: $
Contenido: ${request.contenido || 'N/A'}

{
  "riesgo": "alto" | "medio" | "bajo",
  "recomendaciones



        riesgo: 'medio',
        recomendaciones:
    }



    recomendacion: 'aprob
  }> {
Eres un validador de perfiles profesiona
Analiza el siguiente perfil profesional:

CRITERIOS DE VALIDACIÓN:
2
4. Especialización relevante al cuidado geriá
6. Disponibilidad coherente
8. Referencias verificables
RESPONDE SOLO CON UN JSON válido:
  "



      return {
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
    const promptText = `
Eres un validador de perfiles profesionales para Hogar Belén.

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
    const promptText = `
Eres un clasificador de consultas para Hogar Belén.

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

  }
}
