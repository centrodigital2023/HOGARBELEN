import { 
  Professional, 
  JobOffer, 
  Lead, 
  AIAlert, 
  DashboardMetrics 
} from '@/types/admin';
import { logAudit } from './audit';

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  try {
    const professionals = await window.spark.kv.get<Record<string, Professional>>('professionals') ?? {};
    const offers = await window.spark.kv.get<Record<string, JobOffer>>('job-offers') ?? {};
    const leads = await window.spark.kv.get<Record<string, Lead>>('leads') ?? {};
    const alerts = await window.spark.kv.get<AIAlert[]>('ai-alerts') ?? [];

    const professionalsArray = Object.values(professionals);
    const offersArray = Object.values(offers);
    const leadsArray = Object.values(leads);

    const now = Date.now();
    const thisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();

    return {
      professionals: {
        total: professionalsArray.length,
        pending: professionalsArray.filter(p => p.status === 'pending').length,
        approved: professionalsArray.filter(p => p.status === 'approved').length,
        rejected: professionalsArray.filter(p => p.status === 'rejected').length,
        verified: professionalsArray.filter(p => p.verified).length,
      },
      offers: {
        total: offersArray.length,
        active: offersArray.filter(o => o.active).length,
        pending: offersArray.filter(o => o.status === 'pending').length,
        expired: offersArray.filter(o => o.expires_at && new Date(o.expires_at).getTime() < now).length,
      },
      leads: {
        total: leadsArray.length,
        thisMonth: leadsArray.filter(l => new Date(l.created_at).getTime() >= thisMonth).length,
        byPriority: {
          low: leadsArray.filter(l => l.priority === 'low').length,
          medium: leadsArray.filter(l => l.priority === 'medium').length,
          high: leadsArray.filter(l => l.priority === 'high').length,
          critical: leadsArray.filter(l => l.priority === 'critical').length,
        },
        byStatus: {
          new: leadsArray.filter(l => l.status === 'new').length,
          contacted: leadsArray.filter(l => l.status === 'contacted').length,
          qualified: leadsArray.filter(l => l.status === 'qualified').length,
          converted: leadsArray.filter(l => l.status === 'converted').length,
          lost: leadsArray.filter(l => l.status === 'lost').length,
        },
      },
      alerts: {
        total: alerts.length,
        unresolved: alerts.filter(a => !a.resolved).length,
        bySeverity: {
          low: alerts.filter(a => a.severity === 'low').length,
          medium: alerts.filter(a => a.severity === 'medium').length,
          high: alerts.filter(a => a.severity === 'high').length,
          critical: alerts.filter(a => a.severity === 'critical').length,
        },
      },
    };
  } catch (error) {
    console.error('Error getting dashboard metrics:', error);
    throw error;
  }
};

export const approveProfessional = async (
  professionalId: string,
  adminUserId: string,
  adminEmail: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const professionals = await window.spark.kv.get<Record<string, Professional>>('professionals') ?? {};
    const professional = professionals[professionalId];

    if (!professional) {
      return { success: false, error: 'Profesional no encontrado' };
    }

    professional.status = 'approved';
    professional.verified = true;
    professional.approval_date = new Date().toISOString();
    professional.approved_by = adminUserId;
    professional.updated_at = new Date().toISOString();

    await window.spark.kv.set('professionals', professionals);

    await logAudit({
      user_id: adminUserId,
      user_email: adminEmail,
      action: 'approve_professional',
      resource_type: 'professional',
      resource_id: professionalId,
      details: {
        professional_name: professional.name,
        professional_email: professional.email,
      },
      ip_address: 'client-ip',
      user_agent: navigator.userAgent,
    });

    return { success: true };
  } catch (error) {
    console.error('Error approving professional:', error);
    return { success: false, error: 'Error al aprobar profesional' };
  }
};

export const rejectProfessional = async (
  professionalId: string,
  reason: string,
  adminUserId: string,
  adminEmail: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const professionals = await window.spark.kv.get<Record<string, Professional>>('professionals') ?? {};
    const professional = professionals[professionalId];

    if (!professional) {
      return { success: false, error: 'Profesional no encontrado' };
    }

    professional.status = 'rejected';
    professional.rejection_reason = reason;
    professional.updated_at = new Date().toISOString();

    await window.spark.kv.set('professionals', professionals);

    await logAudit({
      user_id: adminUserId,
      user_email: adminEmail,
      action: 'reject_professional',
      resource_type: 'professional',
      resource_id: professionalId,
      details: {
        professional_name: professional.name,
        professional_email: professional.email,
        reason,
      },
      ip_address: 'client-ip',
      user_agent: navigator.userAgent,
    });

    return { success: true };
  } catch (error) {
    console.error('Error rejecting professional:', error);
    return { success: false, error: 'Error al rechazar profesional' };
  }
};

export const approveOffer = async (
  offerId: string,
  adminUserId: string,
  adminEmail: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const offers = await window.spark.kv.get<Record<string, JobOffer>>('job-offers') ?? {};
    const offer = offers[offerId];

    if (!offer) {
      return { success: false, error: 'Oferta no encontrada' };
    }

    offer.status = 'approved';
    offer.active = true;
    offer.updated_at = new Date().toISOString();

    await window.spark.kv.set('job-offers', offers);

    await logAudit({
      user_id: adminUserId,
      user_email: adminEmail,
      action: 'approve_offer',
      resource_type: 'offer',
      resource_id: offerId,
      details: {
        offer_title: offer.title,
      },
      ip_address: 'client-ip',
      user_agent: navigator.userAgent,
    });

    return { success: true };
  } catch (error) {
    console.error('Error approving offer:', error);
    return { success: false, error: 'Error al aprobar oferta' };
  }
};

export const pauseOffer = async (
  offerId: string,
  adminUserId: string,
  adminEmail: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const offers = await window.spark.kv.get<Record<string, JobOffer>>('job-offers') ?? {};
    const offer = offers[offerId];

    if (!offer) {
      return { success: false, error: 'Oferta no encontrada' };
    }

    offer.active = false;
    offer.updated_at = new Date().toISOString();

    await window.spark.kv.set('job-offers', offers);

    await logAudit({
      user_id: adminUserId,
      user_email: adminEmail,
      action: 'pause_offer',
      resource_type: 'offer',
      resource_id: offerId,
      details: {
        offer_title: offer.title,
      },
      ip_address: 'client-ip',
      user_agent: navigator.userAgent,
    });

    return { success: true };
  } catch (error) {
    console.error('Error pausing offer:', error);
    return { success: false, error: 'Error al pausar oferta' };
  }
};

export const updateLeadStatus = async (
  leadId: string,
  status: Lead['status'],
  notes: string,
  adminUserId: string,
  adminEmail: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const leads = await window.spark.kv.get<Record<string, Lead>>('leads') ?? {};
    const lead = leads[leadId];

    if (!lead) {
      return { success: false, error: 'Lead no encontrado' };
    }

    lead.status = status;
    lead.notes = notes;
    lead.assigned_to = adminUserId;
    lead.updated_at = new Date().toISOString();

    await window.spark.kv.set('leads', leads);

    await logAudit({
      user_id: adminUserId,
      user_email: adminEmail,
      action: 'update_lead_status',
      resource_type: 'lead',
      resource_id: leadId,
      details: {
        new_status: status,
        notes,
      },
      ip_address: 'client-ip',
      user_agent: navigator.userAgent,
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating lead:', error);
    return { success: false, error: 'Error al actualizar lead' };
  }
};

export const resolveAlert = async (
  alertId: string,
  adminUserId: string,
  adminEmail: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const alerts = await window.spark.kv.get<AIAlert[]>('ai-alerts') ?? [];
    const alert = alerts.find(a => a.id === alertId);

    if (!alert) {
      return { success: false, error: 'Alerta no encontrada' };
    }

    alert.resolved = true;
    alert.resolved_by = adminUserId;
    alert.resolved_at = new Date().toISOString();

    await window.spark.kv.set('ai-alerts', alerts);

    await logAudit({
      user_id: adminUserId,
      user_email: adminEmail,
      action: 'resolve_alert',
      resource_type: 'alert',
      resource_id: alertId,
      details: {
        alert_type: alert.type,
        alert_message: alert.message,
      },
      ip_address: 'client-ip',
      user_agent: navigator.userAgent,
    });

    return { success: true };
  } catch (error) {
    console.error('Error resolving alert:', error);
    return { success: false, error: 'Error al resolver alerta' };
  }
};

export const classifyWithAI = async (
  type: 'professional' | 'offer' | 'lead',
  data: any
): Promise<{ score: number; label: string; concerns: string[] }> => {
  try {
    // Validar Spark SDK
    if (!window.spark?.llm) {
      console.warn('Spark SDK no disponible, retornando análisis por defecto');
      return {
        score: 50,
        label: 'revisar',
        concerns: ['Análisis IA no disponible - revisar manualmente']
      };
    }

    let prompt = '';

    if (type === 'professional') {
      prompt = (window.spark.llmPrompt as any)`Analiza este perfil profesional y clasifícalo:
      
Nombre: ${data.name}
Título: ${data.title}
Descripción: ${data.description}
Años de experiencia: ${data.years_experience}
Email: ${data.email}
Teléfono: ${data.phone}

Evalúa:
1. Credibilidad (información coherente y profesional)
2. Riesgos (información sospechosa o inconsistente)
3. Nivel de confianza: alto, medio o bajo

Responde en formato JSON con:
{
  "score": <número 0-100>,
  "label": "alto" | "medio" | "bajo",
  "concerns": ["lista", "de", "preocupaciones"]
}`;
    } else if (type === 'offer') {
      prompt = (window.spark.llmPrompt as any)`Analiza esta oferta de trabajo:

Título: ${data.title}
Descripción: ${data.description}
Tipo: ${data.service_type}
Ubicación: ${data.location}

Evalúa:
1. Lenguaje apropiado y profesional
2. Cumplimiento legal (no discriminación, términos claros)
3. Posibles señales de alerta

Responde en formato JSON con:
{
  "score": <número 0-100>,
  "label": "aprobado" | "revisar" | "rechazar",
  "concerns": ["lista", "de", "preocupaciones"]
}`;
    } else {
      prompt = (window.spark.llmPrompt as any)`Analiza este lead y determina su prioridad:

Tipo: ${data.type}
Fuente: ${data.source_page}
Datos: ${JSON.stringify(data.data)}

Evalúa:
1. Urgencia e intención de compra
2. Calidad del lead
3. Prioridad de seguimiento

Responde en formato JSON con:
{
  "score": <número 0-100>,
  "label": "critical" | "high" | "medium" | "low",
  "concerns": ["lista", "de", "notas"]
}`;
    }

    const response = await window.spark.llm(prompt, 'gpt-4o-mini', true);
    
    // Validar respuesta antes de parsear
    if (!response || typeof response !== 'string') {
      throw new Error('Respuesta inválida del LLM');
    }
    
    const result = JSON.parse(response);

    return {
      score: result.score || 50,
      label: result.label || 'medium',
      concerns: result.concerns || [],
    };
  } catch (error) {
    console.error('Error en análisis IA:', error);
    return {
      score: 50,
      label: 'revisar',
      concerns: ['Error en análisis automático - requiere revisión manual']
    };
  }
};

export const generateAIResponse = async (context: string, action: string): Promise<string> => {
  try {
    const prompt = (window.spark.llmPrompt as any)`Genera un mensaje profesional y empático para ${action}.

Contexto: ${context}

El mensaje debe ser:
- Profesional y respetuoso
- Claro y conciso
- En español
- Máximo 200 palabras

Genera solo el texto del mensaje, sin formato adicional.`;

    const response = await window.spark.llm(prompt, 'gpt-4o-mini', false);
    return response.trim();
  } catch (error) {
    console.error('Error generating AI response:', error);
    return '';
  }
};

export const trackEvent = async (event: {
  page: string;
  action: string;
  user_data?: any;
  context?: any;
}): Promise<void> => {
  try {
    const events = await window.spark.kv.get<any[]>('tracked-events') ?? [];
    
    const newEvent = {
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...event,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
    };

    await window.spark.kv.set('tracked-events', [...events, newEvent]);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
