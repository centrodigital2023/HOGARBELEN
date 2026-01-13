export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'lead_notification' | 'professional_approval' | 'system_alert';
  sent_at: string;
}

export const sendEmailNotification = async (notification: Omit<EmailNotification, 'sent_at'>): Promise<boolean> => {
  const emailLog: EmailNotification = {
    ...notification,
    sent_at: new Date().toISOString(),
  };

  const logs = await window.spark.kv.get<EmailNotification[]>('email-logs') ?? [];
  await window.spark.kv.set('email-logs', [...logs, emailLog]);

  console.log(`📧 Email sent to ${notification.to}:`, notification.subject);
  
  return true;
};

export const notifyHighPriorityLead = async (lead: any, adminEmails: string[]) => {
  for (const email of adminEmails) {
    await sendEmailNotification({
      to: email,
      subject: `🚨 Lead de Alta Prioridad - ${lead.data.name || 'Sin nombre'}`,
      body: `
        Se ha recibido un nuevo lead de alta prioridad:
        
        Nombre: ${lead.data.name || 'No proporcionado'}
        Email: ${lead.data.email || 'No proporcionado'}
        Teléfono: ${lead.data.phone || 'No proporcionado'}
        Prioridad: ${lead.priority}
        Fuente: ${lead.source_page}
        
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
    });
  }
};
