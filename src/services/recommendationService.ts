import reputationService from "./reputationService";

class RecommendationService {
    async getUserRecommendations(userId: string) {
      try {
        const reputation = await reputationService.getUserReputation(userId);
        if (!reputation) {
          throw new Error("User reputation data not found");
        }
        
        const recommendations = [];
        if (reputation.reputation_score < 50) {
          recommendations.push("Improve repayment history");
        } else {
          recommendations.push("Increase loan amount");
        }
        
        return { recommendations };
      } catch (error:any) {
        console.error(`Error fetching recommendations: ${error.message}`);
        throw new Error("Internal Server Error");
      }
    }
  }
  
  export default new RecommendationService();
  