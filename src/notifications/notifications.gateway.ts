import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
@WebSocketGateway({
  cors: {
    origin: [
      'https://front-one-umber.vercel.app',
      'https://front-git-main-hr-systems-projects.vercel.app',
      'http://localhost:3000'
    ],
    credentials: true
  }
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);
  private userSockets = new Map<string, string>(); // userId -> socketId

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);

    // Remove user from map when disconnected
    for (const [userId, socketId] of this.userSockets.entries()) {
      if (socketId === client.id) {
        this.userSockets.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket
  ) {
    const { userId } = data;
    this.userSockets.set(userId, client.id);
    this.logger.log(`User ${userId} joined notifications`);

    client.emit('joined', { message: 'Successfully joined notifications' });
  }

  @SubscribeMessage('leave')
  handleLeave(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket
  ) {
    const { userId } = data;
    this.userSockets.delete(userId);
    this.logger.log(`User ${userId} left notifications`);

    client.emit('left', { message: 'Successfully left notifications' });
  }

  // Método para enviar notificación a un usuario específico
  async sendNotificationToUser(userId: string, notification: any) {
    const socketId = this.userSockets.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('new_notification', notification);
      this.logger.log(`Notification sent to user ${userId}`);
    } else {
      this.logger.warn(`User ${userId} is not connected`);
    }
  }
}
