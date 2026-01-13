import type { Lead, Professional } from '../types/admin';

export interface EmailNotification {

  type?: EmailNotificationType;
  sentAt?: st

  await new Pro

  try {
    console.log('P
}   console.log('Asunto:', notification.subject);

    console.log('Cuerpo:', notification.body);

    await simulateEmailSend();

    console.log(`📧 Email enviado a ${notification.to}`);
    return true;
  } catch (error) {
    console.error('Error enviando correo:', error);
    return false;
  }
}
    console.log('Cuerpo:', notification.body);

    await simulateEmailSend();

    console.log(`📧 Email enviado a ${notification.to}`);
    return true;
  } catch (error) {
    console.error('Error enviando correo:', error);
    return false;
  }
}

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
  lines.push('**Detalles de tu perfil:**');
  lines.push(`• Nombre: ${professional.name}`);
  lines.push(`• Especialidad: ${professional.title}`);
  lines.push(`• Categoría: ${professional.category}`);
  lines.push(`• Experiencia: ${professional.years_experience} años`);
  lines.push(`• Fecha de aprobación: ${approvalDate}`);
  lines.push('');
  lines.push('**¿Qué sigue ahora?**');
  lines.push('');
  lines.push('1. Ya puedes recibir solicitudes de citas de familias');
  lines.push('2. Gestiona tu disponibilidad desde tu panel de control');
  lines.push('3. Responde a las consultas de familias interesadas');
  lines.push('4. Mantén tu perfil actualizado con tus logros y experiencia');
  lines.push('');
  lines.push('**Consejos para destacar:**');
  lines.push('• Completa toda la información de tu perfil');
  lines.push('• Responde rápidamente a las solicitudes');
  lines.push('• Mantén actualizada tu disponibilidad');
  lines.push('• Proporciona un servicio excepcional');
  lines.push('');
  lines.push('Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.');
  lines.push('');
  lines.push('¡Bienvenido al equipo de profesionales de Hogar Belén!');
  lines.push('');
  lines.push('Atentamente,');
  lines.push('Equipo Hogar Belén');
  lines.push('📞 +57 321 570 8655');
  lines.push('📧 hogarbelen2022@gmail.com');
  lines.push('🌐 www.hogarbelen.org');

  return lines.join('\n');
};

export async function notifyProfessionalApproval(professional: Professional): Promise<boolean> {
  if (!professional.email) {
    console.warn('El profesional no tiene correo electrónico configurado.');
    return false;
  }

  const subject = getProfessionalApprovalEmailSubject(professional);
  const body = getProfessionalApprovalEmailBody(professional);

  return await sendEmailNotification({
    to: professional.email,
    subject,
    body,
    type: 'professional_approved',
    sentAt: new Date().toISOString(),
  });
}

const getProfessionalRejectionEmailSubject = (professional: Professional): string => {
  return `Actualización sobre tu registro - Hogar Belén`;
};

const getProfessionalRejectionEmailBody = (professional: Professional, reason: string): string => {
  const lines: string[] = [];
  lines.push(`Hola ${professional.name},`);
  lines.push('');
  lines.push('Gracias por tu interés en formar parte del equipo de profesionales de Hogar Belén.');
  lines.push('');
  lines.push('Lamentablemente, después de revisar tu solicitud, no podemos aprobar tu perfil en este momento.');
  lines.push('');
  lines.push('**Motivo:**');
  lines.push(reason);
  lines.push('');
  lines.push('**¿Qué puedes hacer?**');
  lines.push('');
  lines.push('• Si consideras que hay información incorrecta, puedes contactarnos para aclarar cualquier detalle');
  lines.push('• Puedes enviar una nueva solicitud cuando cumplas con todos los requisitos');
  lines.push('• Estamos disponibles para responder cualquier pregunta que tengas sobre el proceso');
  lines.push('');
  lines.push('Apreciamos tu comprensión y te deseamos mucho éxito en tu carrera profesional.');
  lines.push('');
  lines.push('Atentamente,');
  lines.push('Equipo Hogar Belén');
  lines.push('📞 +57 321 570 8655');
  lines.push('📧 hogarbelen2022@gmail.com');
  lines.push('🌐 www.hogarbelen.org');

  return lines.join('\n');
};

export async function notifyProfessionalRejection(professional: Professional, reason: string): Promise<boolean> {
  if (!professional.email) {
    console.warn('El profesional no tiene correo electrónico configurado.');
    return false;
  }

  const subject = getProfessionalRejectionEmailSubject(professional);
  const body = getProfessionalRejectionEmailBody(professional, reason);

  return await sendEmailNotification({
    to: professional.email,
    subject,
    body,
    type: 'professional_rejected',
    sentAt: new Date().toISOString(),
  });
}
