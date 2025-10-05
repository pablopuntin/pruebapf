import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';
import { ContactFormDto } from './dto/contact-form.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly fromEmail: string;

  constructor(private configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY')!);
this.fromEmail = this.configService.get<string>('SENDGRID_FROM')!;

  }

  async sendContactEmail(
    contactData: ContactFormDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await sgMail.send(this.createAdminEmail(contactData));
      await sgMail.send(this.createUserEmail(contactData));

      this.logger.log(
        `Email de contacto enviado desde: ${contactData.correoElectronico}`,
      );

      return {
        success: true,
        message:
          'Mensaje enviado exitosamente. Te responderemos en menos de 24 horas.',
      };
    } catch (error) {
      this.logger.error('Error al enviar email de contacto:', error);
      return {
        success: false,
        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
      };
    }
  }

  // Email para el equipo de HR
  private createAdminEmail(data: ContactFormDto) {
    return {
      to: 'hrsystemproyecto@gmail.com',
      from: this.fromEmail,
      subject: `Contacto HR System: ${data.asunto}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${data.nombreCompleto}</p>
        <p><strong>Email:</strong> ${data.correoElectronico}</p>
        ${data.telefono ? `<p><strong>Teléfono:</strong> ${data.telefono}</p>` : ''}
        ${data.empresa ? `<p><strong>Empresa:</strong> ${data.empresa}</p>` : ''}
        <p><strong>Asunto:</strong> ${data.asunto}</p>
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${data.mensaje}</p>
      `
    };
  }

  // Email de confirmación para el usuario
  private createUserEmail(data: ContactFormDto) {
    return {
      to: data.correoElectronico,
      from: this.fromEmail,
      subject: 'Gracias por contactarnos - HR System',
      html: `
        <h2>¡Gracias por contactarnos!</h2>
        <p>Hola ${data.nombreCompleto},</p>
        <p>Hemos recibido tu mensaje sobre: <strong>${data.asunto}</strong></p>
        <p>Te responderemos en menos de 24 horas.</p>
        <hr>
        <p><strong>Equipo HR System</strong><br>
        Email: hrsystemproyecto@gmail.com</p>
      `
    };
  }

  // Método para health check (opcional)
  getApiKey(): string | null {
    return this.configService.get<string>('SENDGRID_API_KEY') || null;
  }
}
