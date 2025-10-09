import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Auth0DbGuard } from '../auth/guards/auth0db.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody
} from '@nestjs/swagger';
import { NotificationType } from './entities/notification.entity';
import type { Request } from 'express';

@ApiTags('Notificaciones')
@Controller('notifications')
@UseGuards(Auth0DbGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener notificaciones del usuario' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Límite de notificaciones por página'
  })
  @ApiResponse({
    status: 200,
    description: 'Notificaciones obtenidas exitosamente',
    schema: {
      type: 'object',
      properties: {
        notifications: { type: 'array' },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' },
        totalPages: { type: 'number' }
      }
    }
  })
  async getNotifications(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req: Request
  ) {
    const userId = req.oidc?.user?.sub;
    return this.notificationsService.findAll(userId, page, limit);
  }

  @Post('mark-read/:id')
  @ApiOperation({ summary: 'Marcar notificación como leída' })
  @ApiParam({ name: 'id', description: 'ID de la notificación' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      },
      required: ['userId']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Notificación marcada como leída'
  })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  async markAsRead(
    @Param('id') notificationId: string,
    @Body('userId') userId: string
  ) {
    return this.notificationsService.markAsRead(notificationId, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar notificación' })
  @ApiParam({ name: 'id', description: 'ID de la notificación' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      },
      required: ['userId']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Notificación eliminada exitosamente'
  })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  async deleteNotification(
    @Param('id') notificationId: string,
    @Body('userId') userId: string
  ) {
    return this.notificationsService.remove(userId, notificationId);
  }

  @Post('mark-all-read')
  @ApiOperation({ summary: 'Marcar todas las notificaciones como leídas' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      },
      required: ['userId']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Todas las notificaciones marcadas como leídas'
  })
  async markAllAsRead(@Body('userId') userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Delete('delete-all')
  @ApiOperation({ summary: 'Eliminar todas las notificaciones' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      },
      required: ['userId']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Todas las notificaciones eliminadas'
  })
  async deleteAllNotifications(@Body('userId') userId: string) {
    return this.notificationsService.deleteAll(userId);
  }

  @Get('config')
  @ApiOperation({ summary: 'Obtener configuración de notificaciones' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      },
      required: ['userId']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Configuración obtenida exitosamente'
  })
  async getNotificationConfig(@Body('userId') userId: string) {
    return this.notificationsService.getNotificationConfig(userId);
  }

  @Put('config')
  @ApiOperation({ summary: 'Actualizar configuración de notificaciones' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000'
        },
        email_notifications: { type: 'boolean', example: true },
        immediate_notifications: { type: 'boolean', example: true },
        employee_added: { type: 'boolean', example: true },
        payroll_processed: { type: 'boolean', example: true },
        productivity_report: { type: 'boolean', example: true },
        category_update: { type: 'boolean', example: true },
        evaluation_reminder: { type: 'boolean', example: true },
        holiday_reminder: { type: 'boolean', example: true },
        subscription_expiry: { type: 'boolean', example: true },
        birthday_reminder: { type: 'boolean', example: true },
        country: { type: 'string', example: 'AR' }
      },
      required: ['userId']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Configuración actualizada exitosamente'
  })
  async updateNotificationConfig(@Body() configData: any) {
    const { userId, ...config } = configData;
    return this.notificationsService.updateNotificationConfig(userId, config);
  }

  @Post('schedule-reminder')
  @ApiOperation({ summary: 'Agendar un recordatorio personalizado' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Reunión importante' },
        message: {
          type: 'string',
          example: 'No olvides la reunión de equipo a las 3 PM'
        },
        scheduledDate: {
          type: 'string',
          format: 'date-time',
          example: '2024-01-15T15:00:00.000Z'
        },
        type: { type: 'string', example: 'custom_notification' }
      },
      required: ['title', 'message', 'scheduledDate']
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Recordatorio agendado exitosamente.'
  })
  async scheduleReminder(
    @Req() req: Request,
    @Body()
    body: {
      title: string;
      message: string;
      scheduledDate: string;
      type?: string;
    }
  ) {
    const userId = req.oidc?.user?.sub;
    const scheduledDate = new Date(body.scheduledDate);

    return this.notificationsService.scheduleReminder(
      userId,
      body.title,
      body.message,
      scheduledDate,
      (body.type as any) || 'custom_notification'
    );
  }
}
