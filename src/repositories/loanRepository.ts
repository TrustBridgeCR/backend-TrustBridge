import prisma from "../config/prisma";

class LoanRepository {
  async getLoansByUserId(userId: string) {
    return prisma.loan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}

export default new LoanRepository();
