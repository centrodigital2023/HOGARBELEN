import type { Lead, Professional } from '../types/admin';

export type EmailNotificationType = 'lead_notification' | 'professional_approved' | 'professional_rejected';

export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  sentAt?: string;

  return new Promi
 

  try {
    console.log('Para:', notificati
    console.log('Cuerpo:', no
    a
};

export async function sendEmailNotification(notification: EmailNotification): Promise<boolean> {
  try {
    console.log('📧 Enviando correo electrónico...');
    console.log('Para:', notification.to);
    console.log('Asunto:', notification.subject);
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
  const priorityEmoji = {
    critical: '🚨',
    high: '⚠️',
    medium: '📋',
    low: '📝',
  };

  return `${priorityEmoji[lead.priority]} Nuevo Lead ${lead.priority.toUpperCase()} - Hogar Belén`;
};

const getLeadEmailBody = (lead: Lead): string => {
  const createdAt = new Date(lead.created_at).toLocaleString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const updatedAt = new Date(lead.updated_at).toLocaleString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  lines.push(`Actualizado: ${
  lines.push(`Nombre: ${lead.data.name || 'No proporci
  lines.push(`Tel
  if (lead.data.message) {
    lines.push('M
  }
  if (lead.ai_classification) {
    lines.push('Clasificación IA:');
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

const getProfessionalApprovalEmailSubject = (professional: Professional): string => {
  return `✅ ¡Tu perfil ha sido aprobado! - Hogar Belén`;
};

const getProfessionalApprovalEmailBody = (professional: Professional): string => {
  const approvalDate = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const lines: string[] = [];
  lines.push(`¡Hola ${professional.name}!`);
  lines.push('');
  lines.push('¡Tenemos excelentes noticias! 🎉');
  lines.push('');
  lines.push('Tu perfil profesional ha sido aprobado y ahora está visible en nuestra plataforma Hogar Belén.');
  lines.push('');
  lines.push('');
  lines.push('');
  lines.push('Equipo Hogar Belén');
  lines.push('📧 hogarbelen2022@gmail.com');

};
export async func
    console.warn('El profesional no ti
  }
  const subject = getProfessionalApprovalEmailSubject(professional);

    to: professional.email,
    body,
    sentAt: new D
}
const getProfessionalRejectionEmailSubject = (professional: 
};
const getProfessionalRejectionEmailBody = (professional
  lines.push(`Hola ${professional.name},`);
  lines.push('Gra
  lines.push('Lamentablemente, después de revisar tu solicitud, no podemos aprobar tu perfil
  lines.push('**M
  lines.push('');
  lines.push('');
  lines.push('• Puedes enviar
  lines.push('');
  lines.push('');
  lines.push('Equipo Hogar Belén');
  lines.push('📧 hogarbelen2022@gmail.

};
ex

  }
  const subject = getProfess

    to: professio
   

}




























































