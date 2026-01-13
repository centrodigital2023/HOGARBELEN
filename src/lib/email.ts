import type { Lead } from '../types/admin';

export type EmailNotificationType = 'lead_notification' | 'generic';

export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  type?: EmailNotificationType;
  priority?: Lead['priority'];
  sentAt?: string;
}

const simulateEmailSend = async (): Promise<void> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 250));
};

export async function sendEmailNotification(notification: EmailNotification): Promise<boolean> {
  try {
    console.log('📧 Enviando correo electrónico:');
    console.log('Para:', notification.to);
    console.log('Asunto:', notification.subject);
    console.log('Tipo:', notification.type ?? 'generic');
    console.log('Prioridad:', notification.priority ?? 'n/a');
    console.log('Cuerpo:', notification.body);

    await simulateEmailSend();

    console.log(`📧 Email enviado a ${notification.to}`);
    return true;
  } catch (error) {
    console.error('Error enviando correo:', error);
    return false;
  }
}

const getLeadEmailSubject = (lead: Lead): string => {
  const priorityLabel = lead.priority.toUpperCase();
  const name = lead.data.name?.trim() || 'Sin nombre';
  return `🚨 Nuevo lead ${priorityLabel} - ${name}`;
};

const getLeadEmailBody = (lead: Lead): string => {
  const createdAt = new Date(lead.created_at).toLocaleString('es-CO');
  const updatedAt = new Date(lead.updated_at).toLocaleString('es-CO');

  const lines: string[] = [];
  lines.push('Se ha detectado un lead de alta prioridad.');
  lines.push('');
  lines.push(`ID: ${lead.id}`);
  lines.push(`Prioridad: ${lead.priority}`);
  lines.push(`Estado: ${lead.status}`);
  lines.push(`Tipo: ${lead.type}`);
  lines.push(`Página origen: ${lead.source_page}`);
  lines.push(`URL origen: ${lead.source_url}`);
  lines.push(`Creado: ${createdAt}`);
  lines.push(`Actualizado: ${updatedAt}`);
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
    lines.push(`- Sentimiento: ${lead.ai_classification.sentiment}`);
    lines.push(`- Urgencia: ${lead.ai_classification.urgency}`);
    lines.push(`- Score: ${lead.ai_classification.priority_score}`);
  }

  lines.push('');
  lines.push('Por favor, contacte a este lead lo antes posible.');

  return lines.join('\n');
};

export async function notifyHighPriorityLead(lead: Lead, adminEmails: string[]): Promise<boolean> {
  if (!Array.isArray(adminEmails) || adminEmails.length === 0) {
    console.warn('No hay correos de administradores configurados para notificaciones.');
    return false;
  }

  const subject = getLeadEmailSubject(lead);
  const body = getLeadEmailBody(lead);

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
