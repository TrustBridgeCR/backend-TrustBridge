import express from 'express';
import AuditLogController from '../controllers/auditController';

const router = express.Router();

router.get('/users/:userId/audit-logs', AuditLogController.getUserAuditLogs);

export default router;
