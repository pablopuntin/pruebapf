// stripe.service.ts
import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentsService } from './payments.service';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);

  constructor(private readonly paymentsService: PaymentsService) {}

  private readonly eventHandlers: Record<string, (event: Stripe.Event) => Promise<void>> = {
    'checkout.session.completed': (event) => this.handleCheckoutCompleted(event),
    'invoice.payment_failed': (event) => this.handlePaymentFailed(event),
    'customer.subscription.deleted': (event) => this.handleSubscriptionDeleted(event),
  };

  async dispatchEvent(event: Stripe.Event) {
    const handler = this.eventHandlers[event.type];
    if (handler) {
      await handler(event);
    } else {
      this.logger.warn(`Unhandled event type: ${event.type}`);
    }
  }

  private async handleCheckoutCompleted(event: Stripe.Event) {
    const session = event.data.object as Stripe.Checkout.Session;
    await this.paymentsService.markEventProcessed(event.id);
    this.logger.log(`✅ Checkout completed for session: ${session.id}`);
    await this.paymentsService.activateSubscription(session.customer as string);
  }

  private async handlePaymentFailed(event: Stripe.Event) {
    const invoice = event.data.object as Stripe.Invoice;
    this.logger.warn(`⚠️ Payment failed for invoice ${invoice.id}`);
    await this.paymentsService.markSubscriptionPastDue(invoice.customer as string);
  }

  private async handleSubscriptionDeleted(event: Stripe.Event) {
    const subscription = event.data.object as Stripe.Subscription;
    this.logger.log(`❌ Subscription canceled: ${subscription.id}`);
    await this.paymentsService.cancelSubscription(subscription.customer as string);
  }
}
