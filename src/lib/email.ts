import type { Lead, Professional } from '../types/admin';

export type EmailNotificationType =
  | 'lead_notification'
  | 'professional_approved'
  | 'professional_rejected';

export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  type?: EmailNotificationType;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  sentAt?: string;
}

export async function sendEmailNotification(
  notification: EmailNotification
): Promise<boolean> {
  try {
    console.log('📧 Enviando correo simulado...');
    console.log('Para:', notification.to);
    console.log('Asunto:', notification.subject);
    console.log('Cuerpo:', notification.body);
    console.log('Tipo:', notification.type || 'general');
    console.log('Prioridad:', notification.priority || 'medium');

    // Simulación de envío
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log(`📧 Email enviado a ${notification.to}`);
    return true;
  } catch (error) {
    console.error('Error enviando correo:', error);
    return false;
  }
}

const buildLeadEmail = (lead: Lead) => {
  const subject = `${lead.priority.toUpperCase()} | Nuevo lead desde ${lead.source_page}`;
  const lines: string[] = [];

  lines.push(`Nuevo lead registrado (${lead.priority})`);
  lines.push('');
  lines.push(`Página: ${lead.source_page}`);
  lines.push(`URL: ${lead.source_url}`);
  lines.push('');
  lines.push(`Nombre: ${lead.data.name || 'No proporcionado'}`);
  lines.push(`Email: ${lead.data.email || 'No proporcionado'}`);
  lines.push(`Teléfono: ${lead.data.phone || 'No proporcionado'}`);

  if (lead.data.message) {
    lines.push('');
    lines.push('Mensaje:');
    lines.push(String(lead.data.message));
  }

  if (lead.ai_classification) {
    lines.push('');
    lines.push('Clasificación IA:');
    lines.push(`- Intención: ${lead.ai_classification.intent}`);
    lines.push(`- Urgencia: ${lead.ai_classification.urgency}`);
    lines.push(`- Sentimiento: ${lead.ai_classification.sentiment}`);
    lines.push(`- Score: ${lead.ai_classification.priority_score}`);
  }

  const body = lines.join('\n');
  return { subject, body };
};

export async function notifyHighPriorityLead(
  lead: Lead,
  adminEmails: string[]
): Promise<boolean> {
  if (!Array.isArray(adminEmails) || adminEmails.length === 0) {
    console.warn('No hay correos de administradores configurados.');
    return false;
  }

  const { subject, body } = buildLeadEmail(lead);

  const results = await Promise.all(
    adminEmails.map((to) =>
      sendEmailNotification({
        to,
        subject,
        body,
        priority: lead.priority === 'critical' ? 'critical' : 'high',
        type: 'lead_notification',
        sentAt: new Date().toISOString(),
      })
    )
  );

  return results.every(Boolean);
}

const buildProfessionalApprovalEmail = (professional: Professional) => {
  const subject = '✅ Tu perfil ha sido aprobado | Hogar Belén';
  const lines: string[] = [];

  lines.push(`Hola ${professional.name},`);
  lines.push('');
  lines.push('¡Buenas noticias! Tu perfil ha sido aprobado y ya es visible en nuestra plataforma.');
  lines.push('Podrás recibir solicitudes y consultas de familias y organizaciones.');
  lines.push('');
  lines.push('Recomendaciones:');
  lines.push('- Mantén tu disponibilidad y datos actualizados.');
  lines.push('- Responde oportunamente a los contactos.');
  lines.push('- Completa documentos y certificaciones para mayor confianza.');
  lines.push('');
  lines.push('Equipo Hogar Belén');
  lines.push('📧 soporte@hogarbelen.org');

  return { subject, body: lines.join('\n') };
};

const buildProfessionalRejectionEmail = (
  professional: Professional,
  reason?: string
) => {
  const subject = '⚠️ Actualización sobre tu perfil | Hogar Belén';
  const lines: string[] = [];

  lines.push(`Hola ${professional.name},`);
  lines.push('');
  lines.push('Gracias por postularte. Tras revisar tu solicitud, necesitamos más información antes de aprobar tu perfil.');
  lines.push(reason ? `Motivo: ${reason}` : 'Motivo: Información insuficiente o documentos incompletos.');
  lines.push('');
  lines.push('Próximos pasos:');
  lines.push('- Adjunta documentación faltante (cédula, hoja de vida, certificados).');
  lines.push('- Asegúrate de que los datos de contacto y experiencia estén completos.');
  lines.push('- Si tienes dudas, responde este correo y te ayudaremos.');
  lines.push('');
  lines.push('Equipo Hogar Belén');
  lines.push('📧 soporte@hogarbelen.org');

  return { subject, body: lines.join('\n') };
};

export async function notifyProfessionalApproval(
  professional: Professional
): Promise<boolean> {
  if (!professional.email) {
    console.warn('El profesional no tiene correo configurado.');
    return false;
  }

  const { subject, body } = buildProfessionalApprovalEmail(professional);

  return sendEmailNotification({
    to: professional.email,
    subject,
    body,
    type: 'professional_approved',
    sentAt: new Date().toISOString(),
  });
}

export async function notifyProfessionalRejection(
  professional: Professional,
  reason?: string
): Promise<boolean> {
  if (!professional.email) {
    console.warn('El profesional no tiene correo configurado.');
    return false;
  }

  const { subject, body } = buildProfessionalRejectionEmail(professional, reason);

  return sendEmailNotification({
    to: professional.email,
    subject,
    body,
    type: 'professional_rejected',
    priority: 'medium',
    sentAt: new Date().toISOString(),
  });
}
