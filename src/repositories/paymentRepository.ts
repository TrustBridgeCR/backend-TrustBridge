import prisma from "../config/prisma";

class PaymentRepository {
  async getPaymentsByUserId(userId: string) {
    return prisma.payment.findMany({
      where: { userId },
      orderBy: { paymentDate: "desc" },
    });
  }
}

export default new PaymentRepository();
