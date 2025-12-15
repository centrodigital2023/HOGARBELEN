export interface NotificationData {
  recipientEmail: string;
  recipientPhone?: string;
  recipientName: string;
  appointmentDate: string;
  appointmentTime: string;
  professionalName: string;
  appointmentType: string;
}

export type NotificationType = 'confirmed' | 'cancelled' | 'rescheduled' | 'reminder';

export class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async sendEmailNotification(
    data: NotificationData,
    type: NotificationType
  ): Promise<boolean> {
    try {
      const emailSubject = this.getEmailSubject(type);
      const emailBody = this.getEmailBody(data, type);

      console.log('📧 Enviando correo electrónico:');
      console.log('Para:', data.recipientEmail);
      console.log('Asunto:', emailSubject);
      console.log('Cuerpo:', emailBody);

      await this.simulateEmailSend();

      return true;
    } catch (error) {
      console.error('Error enviando correo:', error);
      return false;
    }
  }

  async sendSMSNotification(
    data: NotificationData,
    type: NotificationType
  ): Promise<boolean> {
    if (!data.recipientPhone) {
      console.warn('No se proporcionó número de teléfono');
      return false;
    }

    try {
      const smsMessage = this.getSMSMessage(data, type);

      console.log('📱 Enviando SMS:');
      console.log('Para:', data.recipientPhone);
      console.log('Mensaje:', smsMessage);

      await this.simulateSMSSend();

      return true;
    } catch (error) {
      console.error('Error enviando SMS:', error);
      return false;
    }
  }

  async sendBothNotifications(
    data: NotificationData,
    type: NotificationType
  ): Promise<{ email: boolean; sms: boolean }> {
    const [emailResult, smsResult] = await Promise.all([
      this.sendEmailNotification(data, type),
      this.sendSMSNotification(data, type),
    ]);

    return {
      email: emailResult,
      sms: smsResult,
    };
  }

  private getEmailSubject(type: NotificationType): string {
    switch (type) {
      case 'confirmed':
        return '✅ Cita Confirmada - Hogar Belén';
      case 'cancelled':
        return '❌ Cita Cancelada - Hogar Belén';
      case 'rescheduled':
        return '📅 Cita Reprogramada - Hogar Belén';
      case 'reminder':
        return '⏰ Recordatorio de Cita - Hogar Belén';
      default:
        return 'Notificación de Cita - Hogar Belén';
    }
  }

  private getEmailBody(data: NotificationData, type: NotificationType): string {
    const baseMessage = `
      Estimado/a ${data.recipientName},
      
      ${this.getTypeSpecificMessage(type)}
      
      Detalles de la cita:
      • Profesional: ${data.professionalName}
      • Tipo: ${data.appointmentType}
      • Fecha: ${new Date(data.appointmentDate).toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
      • Hora: ${data.appointmentTime}
      
      Si tiene alguna pregunta, no dude en contactarnos.
      
      Atentamente,
      Equipo Hogar Belén
      📞 +57 300 123 4567
      📧 info@hogarbelen.com
    `;

    return baseMessage.trim();
  }

  private getSMSMessage(data: NotificationData, type: NotificationType): string {
    const date = new Date(data.appointmentDate).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
    });

    switch (type) {
      case 'confirmed':
        return `Hogar Belén: ✅ Cita confirmada con ${data.professionalName} el ${date} a las ${data.appointmentTime}. ¡Le esperamos!`;
      case 'cancelled':
        return `Hogar Belén: ❌ Su cita del ${date} a las ${data.appointmentTime} ha sido cancelada. Contáctenos si tiene dudas.`;
      case 'rescheduled':
        return `Hogar Belén: 📅 Su cita ha sido reprogramada para el ${date} a las ${data.appointmentTime} con ${data.professionalName}.`;
      case 'reminder':
        return `Hogar Belén: ⏰ Recordatorio: Tiene cita mañana ${date} a las ${data.appointmentTime} con ${data.professionalName}.`;
      default:
        return `Hogar Belén: Actualización de su cita del ${date} a las ${data.appointmentTime}.`;
    }
  }

  private getTypeSpecificMessage(type: NotificationType): string {
    switch (type) {
      case 'confirmed':
        return 'Su cita ha sido confirmada exitosamente. ¡Le esperamos!';
      case 'cancelled':
        return 'Le informamos que su cita ha sido cancelada. Si esto fue un error o desea reprogramar, por favor contáctenos.';
      case 'rescheduled':
        return 'Su cita ha sido reprogramada a un nuevo horario.';
      case 'reminder':
        return 'Este es un recordatorio amistoso de su próxima cita.';
      default:
        return 'Actualización sobre su cita.';
    }
  }

  private async simulateEmailSend(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  private async simulateSMSSend(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  }
}

export const notificationService = NotificationService.getInstance();
