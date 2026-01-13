export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'lead_notification' | 'professional_approval' | 'system_alert';
  sent_at: string;
}

export async function sendEmail(notification: EmailNotification): Promise<boolean> {
  console.log(`📧 Email sent to ${notification.to}:`, notification.subject);
  console.log(`Priority: ${notification.priority}`);
  console.log(`Type: ${notification.type}`);
  console.log(`Body:\n${notification.body}`);
  return true;
}

export async function sendLeadNotification(lead: any, adminEmails: string[]): Promise<void> {
  for (const email of adminEmails) {
    await sendEmail({
      to: email,
      subject: `Nuevo Lead: ${lead.data.name || 'Sin nombre'}`,
      body: `
        Nuevo Lead Recibido
        
        Nombre: ${lead.data.name || 'No proporcionado'}
        Email: ${lead.data.email || 'No proporcionado'}
        Teléfono: ${lead.data.phone || 'No proporcionado'}
        
        ${lead.data.message ? `Mensaje:\n${lead.data.message}` : ''}
        
        ${lead.ai_classification ? `
        Clasificación IA:
        - Intención: ${lead.ai_classification.intent}
        - Sentimiento: ${lead.ai_classification.sentiment}
        - Urgencia: ${lead.ai_classification.urgency}
        ` : ''}
        
        Por favor, contacte a este lead lo antes posible.
      `,
      priority: lead.priority === 'critical' ? 'critical' : 'high',
      type: 'lead_notification',
      sent_at: new Date().toISOString(),
    });
  }
}

export async function notifyHighPriorityLead(lead: any, adminEmails: string[]): Promise<void> {
  return sendLeadNotification(lead, adminEmails);
}
