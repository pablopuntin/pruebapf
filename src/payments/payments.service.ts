// payments.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEvent } from './entities/payment-event.entity';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(PaymentEvent)
    private readonly eventRepo: Repository<PaymentEvent>,
  ) {}

  async markEventProcessed(eventId: string) {
    const existing = await this.eventRepo.findOne({ where: { eventId } });
    if (existing) {
      this.logger.warn(`⚠️ Event ${eventId} already processed.`);
      return;
    }

    const record = this.eventRepo.create({ eventId, processed: true });
    await this.eventRepo.save(record);
  }

  async activateSubscription(customerId: string) {
    this.logger.log(`✅ Activating subscription for customer ${customerId}`);
    // TODO: update user/subscription in DB
  }

  async markSubscriptionPastDue(customerId: string) {
    this.logger.log(`⚠️ Marking subscription as past_due for ${customerId}`);
    // TODO: update subscription in DB
  }

  async cancelSubscription(customerId: string) {
    this.logger.log(`❌ Canceling subscription for ${customerId}`);
    // TODO: update subscription in DB
  }
}
