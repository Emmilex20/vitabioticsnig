export const DELIVERY_FEE_NAIRA = 5000;

export function calculateOrderTotal(subtotal: number) {
  return subtotal + DELIVERY_FEE_NAIRA;
}
