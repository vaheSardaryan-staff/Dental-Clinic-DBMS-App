const router = require('express').Router();
const { runQuery } = require('../helpers/queryRunner');

router.get('/triggers', async (req, res, next) => {
  try {
    const queries = [];
    const triggers = await runQuery(
      `SELECT t.name AS trigger_name, OBJECT_NAME(t.parent_id) AS table_name,
       te.type_desc AS trigger_type, m.definition AS trigger_sql
       FROM sys.triggers t
       JOIN sys.trigger_events te ON t.object_id = te.object_id
       JOIN sys.sql_modules m ON t.object_id = m.object_id
       ORDER BY t.name`,
      {},
      { feature: 'TRIGGER', description: 'Query sys.triggers + sys.sql_modules to list all triggers and their definitions' }
    );
    queries.push(triggers.meta);

    const auditLog = await runQuery(
      'SELECT TOP 10 * FROM patient_audit_log ORDER BY id DESC',
      {},
      { feature: 'TRIGGER', description: 'Recent entries in patient_audit_log (populated by trg_LogPatientDeletion)' }
    );
    queries.push(auditLog.meta);

    res.render('showcase/triggers', {
      title: 'Triggers Showcase', reqPath: '/showcase/triggers', queries,
      triggers: triggers.data, auditLog: auditLog.data
    });
  } catch (err) { next(err); }
});

router.get('/indexes', async (req, res, next) => {
  try {
    const queries = [];
    const indexes = await runQuery(
      `SELECT i.name AS index_name, t.name AS table_name,
       COL_NAME(ic.object_id, ic.column_id) AS column_name,
       i.type_desc, i.is_unique, i.is_primary_key
       FROM sys.indexes i
       JOIN sys.index_columns ic ON i.object_id = ic.object_id AND i.index_id = ic.index_id
       JOIN sys.tables t ON i.object_id = t.object_id
       WHERE i.name IS NOT NULL AND i.name LIKE 'IX_%'
       ORDER BY t.name, i.name`,
      {},
      { feature: 'INDEX', description: 'Query sys.indexes + sys.index_columns to list all custom indexes' }
    );
    queries.push(indexes.meta);

    const usage = await runQuery(
      `SELECT OBJECT_NAME(s.object_id) AS table_name, i.name AS index_name,
       s.user_seeks, s.user_scans, s.user_lookups, s.user_updates
       FROM sys.dm_db_index_usage_stats s
       JOIN sys.indexes i ON s.object_id = i.object_id AND s.index_id = i.index_id
       WHERE s.database_id = DB_ID() AND i.name IS NOT NULL AND i.name LIKE 'IX_%'
       ORDER BY s.user_seeks DESC`,
      {},
      { feature: 'INDEX', description: 'Index usage statistics from sys.dm_db_index_usage_stats - shows how often each index is used' }
    );
    queries.push(usage.meta);

    res.render('showcase/indexes', {
      title: 'Indexes Showcase', reqPath: '/showcase/indexes', queries,
      indexes: indexes.data, usage: usage.data
    });
  } catch (err) { next(err); }
});

router.get('/dcl', async (req, res, next) => {
  try {
    const queries = [];
    const users = await runQuery(
      `SELECT dp.name, dp.type_desc,
       (SELECT STRING_AGG(r.name, ', ') FROM sys.database_role_members drm
        JOIN sys.database_principals r ON drm.role_principal_id = r.principal_id
        WHERE drm.member_principal_id = dp.principal_id) AS roles
       FROM sys.database_principals dp
       WHERE dp.name IN ('db_admin', 'dentist_user', 'receptionist_user')`,
      {},
      { feature: 'DCL', description: 'Query sys.database_principals to list database users and their roles' }
    );
    queries.push(users.meta);

    const permissions = await runQuery(
      `SELECT dp.name AS grantee, pr.state_desc, pr.permission_name,
       pr.class_desc, OBJECT_NAME(pr.major_id) AS object_name
       FROM sys.database_permissions pr
       JOIN sys.database_principals dp ON pr.grantee_principal_id = dp.principal_id
       WHERE dp.name IN ('db_admin', 'dentist_user', 'receptionist_user')
       ORDER BY dp.name, pr.state_desc, OBJECT_NAME(pr.major_id)`,
      {},
      { feature: 'DCL', description: 'Query sys.database_permissions to show GRANT/DENY/REVOKE per user' }
    );
    queries.push(permissions.meta);

    res.render('showcase/dcl', {
      title: 'Access Control (DCL)', reqPath: '/showcase/dcl', queries,
      dbUsers: users.data, permissions: permissions.data
    });
  } catch (err) { next(err); }
});

module.exports = router;
