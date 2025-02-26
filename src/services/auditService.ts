import AuditLogRepository from '../repositories/auditRepository';
import prisma from '../config/prisma';

class AuditLogService {
  async getAuditLogs(userId: string, page: number = 1, limit: number = 10) {

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const auditLogs = await AuditLogRepository.getAuditLogs(page, limit, userId);
    if (!auditLogs.length) {
      return { message: "No audit logs found for this user." };
    }

    return {
      audit_logs: auditLogs,
      page,
      limit,
    };
  }
}

export default new AuditLogService();
