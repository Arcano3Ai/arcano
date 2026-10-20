/**
 * paymentConfig.ts
 * 
 * Configuración centralizada de pasarelas de pago para ARCANO México:
 * - Mercado Pago (Tarjetas, SPEI, OXXO, Mercado Crédito)
 * - Stripe (Tarjetas, Google Pay, Apple Pay)
 * - PayPal (Checkout internacional y nacional)
 * - Transferencia Directa SPEI (Sin comisiones intermediarias)
 */

export interface PaymentGatewayConfig {
  mercadoPago: {
    enabled: boolean;
    publicKey: string;
    hasAccessToken: boolean;
    statementDescriptor: string;
  };
  stripe: {
    enabled: boolean;
    publishableKey: string;
    hasSecretKey: boolean;
  };
  paypal: {
    enabled: boolean;
    clientId: string;
  };
  directSpei: {
    enabled: boolean;
    titular: string;
    beneficiary: string;
    banco: string;
    bank: string;
    clabe: string;
    concepto: string;
  };
  speiDirect: {
    enabled: boolean;
    titular: string;
    beneficiary: string;
    banco: string;
    bank: string;
    clabe: string;
    concepto: string;
  };
}

const directSpeiData = {
  enabled: true,
  titular: "Sergio Adrián Pérez Villarreal",
  beneficiary: "Sergio Adrián Pérez Villarreal",
  banco: "Mercado Pago W",
  bank: "Mercado Pago W",
  clabe: "722969017074087021",
  concepto: "ARCANO-{ORDEN}",
};

export const paymentConfig: PaymentGatewayConfig = {
  mercadoPago: {
    enabled: true,
    publicKey: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "TEST-e613045d-7524-4f81-9b16-419b48625902",
    hasAccessToken: Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN),
    statementDescriptor: "ARCANO*JOYAS",
  },
  stripe: {
    enabled: true,
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder_arcano",
    hasSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
  },
  paypal: {
    enabled: true,
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb", // 'sb' es el sandbox público de PayPal
  },
  directSpei: directSpeiData,
  speiDirect: directSpeiData,
};
