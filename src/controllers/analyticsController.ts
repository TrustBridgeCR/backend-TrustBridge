import { Request, Response } from "express";
import LoanService from "../services/loanService";
import paymentService from "../services/paymentService";
import reputationService from "../services/reputationService";
import recommendationService from "../services/recommendationService";

class AnalyticsController {
  async getUserLoans(req: Request, res: Response) {
    const { userId } = req.params;
    const data = await LoanService.getUserLoans(userId);
    res.json(data);
  }

  async getUserPayments(req: Request, res: Response) {
    const { user_id } = req.params;
    const data = await paymentService.getUserPayments(user_id);
    res.json(data);
  }
  async getUserReputation(req: Request, res: Response) {
    const { user_id } = req.params;
    const data = await reputationService.getUserReputation(user_id);
    res.json(data);
  }

  async getUserRecommendations(req: Request, res: Response) {
    const { user_id } = req.params;
    const data = await recommendationService.getUserRecommendations(user_id);
    res.json(data);
  }

}

export default new AnalyticsController();
