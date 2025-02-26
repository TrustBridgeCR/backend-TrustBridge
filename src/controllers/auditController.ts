import { Request, Response } from 'express';
import AuditLogService from '../services/auditService';

class AuditLogController {
  async getUserAuditLogs(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const data = await AuditLogService.getAuditLogs(userId, Number(page), Number(limit));

      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving audit logs', error: error.message });
    }
  }
}

export default new AuditLogController();
