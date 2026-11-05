// src/lib/tossPayments.ts - M9 Real Toss Payments
// Toss Payments v2 API
export const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
export const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY || 'test_sk_zXLkKEypNArWmo50nX3lmeme5QKd'

export const PLANS = {
  free: { name: 'Free', price: 0, grantsLimit: 3, wordLimit: 1 },
  pro: { name: 'Pro', price: 29000, grantsLimit: 1000, wordLimit: 100, id: 'pro_29000' },
  premium: { name: 'Premium', price: 99000, grantsLimit: 10000, wordLimit: 1000, id: 'premium_99000' },
}

export async function confirmPayment(paymentKey: string, orderId: string, amount: number) {
  const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(TOSS_SECRET_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  })
  return res.json()
}

export function getPlanByPrice(price: number) {
  if (price === 29000) return PLANS.pro
  if (price === 99000) return PLANS.premium
  return PLANS.free
}
