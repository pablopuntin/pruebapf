import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactFormDto } from './dto/contact-form.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({
    summary: 'Enviar mensaje de contacto',
    description:
      'Envía un mensaje de contacto desde el formulario web. Se enviará tanto al equipo de HR System como un email de confirmación al usuario.'
  })
  @ApiResponse({
    status: 200,
    description: 'Mensaje enviado exitosamente',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example:
            'Mensaje enviado exitosamente. Te responderemos en menos de 24 horas.'
        }
      }
    }
  })
  async sendContactMessage(@Body() contactData: ContactFormDto) {
    return await this.contactService.sendContactEmail(contactData);
  }

  @Get('health')
  @ApiOperation({
    summary: 'Verificar estado del servicio de email',
    description: 'Verifica que la configuración de SendGrid esté presente'
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del servicio',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        emailService: { type: 'boolean', example: true }
      }
    }
  })
  async checkEmailService() {
    const apiKey = this.contactService.getApiKey();
    return {
      status: 'ok',
      emailService: !!apiKey,
      timestamp: new Date().toISOString()
    };
  }
}
