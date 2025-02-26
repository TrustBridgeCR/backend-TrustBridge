import prisma from "../config/prisma";
import PaymentRepository from "../repositories/paymentRepository";

class PaymentService {
  async getUserPayments(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
    throw new Error("User not found");
    }

    const payments = await PaymentRepository.getPaymentsByUserId(userId);
    if (!payments.length) {
        return { message: "No payment history found for this user." };
        }
        const onTimePayments = payments.filter(payment => payment.status === "on_time").length;
        const latePayments = payments.filter(payment => payment.status === "late").length;

    return {
      payment_history: payments,
      on_time_payments: onTimePayments,
      late_payments: latePayments,
    };
  }
}

export default new PaymentService();
