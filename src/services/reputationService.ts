import LoanService from "./loanService";
import PaymentService from "./paymentService";

class ReputationService {
  async getUserReputation(userId: string) {
    try {
        const loansData = await LoanService.getUserLoans(userId);
        if (!loansData.completed_loans || loansData.completed_loans.length === 0) {
          return { reputation_score: 0, trend: "stable", message: "No completed loans found." };
        }
        
        const paymentsData = await PaymentService.getUserPayments(userId);
        if (!paymentsData) {
          throw new Error("Payment data not found");
        }
        
        const { on_time_payments = 0, late_payments = 0 } = paymentsData;
        const totalPayments = on_time_payments + late_payments;
        
        const repaymentRatio = totalPayments > 0 ? on_time_payments / totalPayments : 0;
        
        let trend = "stable";
        if (repaymentRatio > 0.8) trend = "increasing";
        else if (repaymentRatio < 0.5) trend = "decreasing";
        
        return {
          reputation_score: Math.round(repaymentRatio * 100),
          trend,
        };
      } catch (error: any) {
        console.error(`Error fetching user reputation: ${error.message}`);
        throw new Error("Internal Server Error");
      }
  }
}

export default new ReputationService();
