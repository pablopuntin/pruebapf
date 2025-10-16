// payments.controller.ts
import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import type { Request, Response } from 'express';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('payments')
export class PaymentsController {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
   apiVersion: '2025-09-30.clover',

  });
  private endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  constructor(private readonly stripeService: StripeService) {}

  @Post('stripe/webhook')
async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
  let event: Stripe.Event;

  try {
    // 1. Guarda la cabecera en una constante para manejarla mejor.
    const sig = req.headers['stripe-signature'];

    // 2. ✅ Comprueba si la firma existe. Si no, lanza un error.
    if (!sig) {
      throw new Error('Falta la cabecera de la firma de Stripe (stripe-signature).');
    }

    // 3. Ahora que sabes que 'sig' existe, úsala. ¡El error desaparece!
   event = this.stripe.webhooks.constructEvent(
  (req as any).rawBody, // 👈 usa el body crudo
  sig,
  this.endpointSecret,
);
  } catch (err) {
    console.error('❌ Error verificando la firma de Stripe:', err.message);
    // Este catch ahora también atrapará el error de la firma faltante
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ... el resto de tu código sigue igual
  try {
    await this.stripeService.dispatchEvent(event);
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error(`❌ Error manejando el evento ${event.type}:`, err);
    return res.status(500).send('Internal Server Error');
  }
}

  // ✅ NUEVO ENDPOINT PARA CREAR SESIÓN DE PAGO
  @Post('create-checkout-session')
  @ApiBody({ schema: { example: { userId: 'user_abc123' } } })
  async createCheckoutSession(@Body() body: any, @Res() res: Response) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price: 'price_1SIgp0BDUKGY3Xnpe6GGYqtd', // ⚠️ Reemplazá con tu ID de precio real
            quantity: 1,
          },
        ],
        // success_url: 'https://front-git-main-hr-systems-projects.vercel.app/success',
        // cancel_url: 'https://front-git-main-hr-systems-projects.vercel.app/cancel',
        success_url: 'https://www.google.com',
cancel_url: 'https://www.wikipedia.org',

        metadata: {
          userId: body.userId || 'test-user',
        },
      });

      return res.status(200).json({ url: session.url });
    } catch (err) {
      console.error('❌ Error creating session:', err);
      return res.status(500).json({ error: 'Failed to create session' });
    }
  }
}
