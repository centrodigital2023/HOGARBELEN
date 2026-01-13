export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'lead_notification' | 'professional_approval' | 'system_alert';
  sent_at: string;
}

  console.log(`📧 Email sent to ${notification.to}:`, notification.subject);
  return true;

  for (const email of adminEmails) {
    

        
        Email: ${lead.data.email || 'No proporcionado'}

        
  
        Clasif
  

        Por favor, contacte a este lead lo antes posible.
      priority: lead.priority === 'c
    });
};



        






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
