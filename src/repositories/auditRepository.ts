import prisma from '../config/prisma';

class AuditLogRepository {
  async getAuditLogs(page: number = 1, limit: number = 10, userId?: string) {
    const skip = (page - 1) * limit;

    const whereClause = userId ? { userId } : {};

    return prisma.auditLog.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        timestamp: 'desc',
      },
    });
  }
}

export default new AuditLogRepository();
