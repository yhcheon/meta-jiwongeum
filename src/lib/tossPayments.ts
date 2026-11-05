// Toss Payments 연동 - Pro 29k
export const PRICING = {
  free: { price: 0, grantsLimit: 3, docsLimit: 0 },
  pro: { price: 29000, grantsLimit: 9999, docsLimit: 5 },
  premium: { price: 99000, grantsLimit: 9999, docsLimit: 9999 }
}

export async function requestTossPayment(customerKey: string, orderId: string) {
  // 실제 연동: const tossPayments = TossPayments("test_ck_...")
  // await tossPayments.requestPayment("카드", { amount: 29000, orderId, orderName: "지원금 챙김이 Pro" })
  console.log("Toss payment request", { customerKey, orderId, amount: PRICING.pro.price })
  return { success: true, orderId }
}
