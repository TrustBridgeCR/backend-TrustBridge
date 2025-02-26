import prisma from "../config/prisma";
import LoanRepository from "../repositories/loanRepository";

class LoanService {
  async getUserLoans(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
    throw new Error("User not found");
    }

    const loans = await LoanRepository.getLoansByUserId(userId);
    if (loans.length === 0) {
    return { 
        message: "No loans found for this user.",
        active_loans: [], completed_loans: []    
    };
    }
    return {
      active_loans: loans.filter(loan => loan.status === "active"),
      completed_loans: loans.filter(loan => loan.status === "completed"),
    };
  }
}

export default new LoanService();
