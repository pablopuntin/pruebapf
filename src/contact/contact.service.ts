import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactFormDto } from './dto/contact-form.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.createTransporter();
  }

  private createTransporter() {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<boolean>('SMTP_SECURE', false),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS')
      }
    });
  }

  async sendContactEmail(
    contactData: ContactFormDto
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.transporter.sendMail(this.createAdminEmail(contactData));
      await this.transporter.sendMail(this.createUserEmail(contactData));

      this.logger.log(
        `Email de contacto enviado desde: ${contactData.correoElectronico}`
      );

      return {
        success: true,
        message:
          'Mensaje enviado exitosamente. Te responderemos en menos de 24 horas.'
      };
    } catch (error) {
      this.logger.error('Error al enviar email de contacto:', error);

      return {
        success: false,
        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.'
      };
    }
  }

  private createAdminEmail(data: ContactFormDto) {
    const {
      nombreCompleto,
      correoElectronico,
      telefono,
      empresa,
      asunto,
      mensaje
    } = data;

    return {
      from: this.configService.get<string>('SMTP_USER'),
      to: 'hrsystemproyecto@gmail.com',
      subject: `Contacto HR System: ${asunto}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombreCompleto}</p>
        <p><strong>Email:</strong> ${correoElectronico}</p>
        ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ''}
        ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ''}
        <p><strong>Asunto:</strong> ${asunto}</p>
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `
    };
  }

  private createUserEmail(data: ContactFormDto) {
    const { nombreCompleto, correoElectronico, asunto } = data;

    return {
      from: this.configService.get<string>('SMTP_USER'),
      to: correoElectronico,
      subject: 'Gracias por contactarnos - HR System',
      html: `
        <h2>¡Gracias por contactarnos!</h2>
        <p>Hola ${nombreCompleto},</p>
        <p>Hemos recibido tu mensaje sobre: <strong>${asunto}</strong></p>
        <p>Te responderemos en menos de 24 horas.</p>
        <hr>
        <p><strong>Equipo HR System</strong><br>
        Email: hrsystemproyecto@gmail.com</p>
      `
    };
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('Conexión SMTP verificada exitosamente');
      return true;
    } catch (error) {
      this.logger.error('Error al verificar conexión SMTP:', error);
      return false;
    }
  }
}
