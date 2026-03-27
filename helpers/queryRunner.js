const { getPool, sql } = require('../config/db');

async function runQuery(sqlText, params = {}, meta = {}) {
  const pool = await getPool();
  const request = pool.request();

  for (const [key, val] of Object.entries(params)) {
    request.input(key, val);
  }

  const start = Date.now();
  let result;
  let error = null;

  try {
    result = await request.query(sqlText);
  } catch (err) {
    error = err;
    const duration = Date.now() - start;
    return {
      data: [],
      rowsAffected: [],
      error: err.message,
      meta: {
        sql: sqlText,
        params,
        duration_ms: duration,
        rowCount: 0,
        feature: meta.feature || 'QUERY',
        description: meta.description || '',
        error: err.message,
      },
    };
  }

  const duration = Date.now() - start;
  return {
    data: result.recordset || [],
    recordsets: result.recordsets || [],
    rowsAffected: result.rowsAffected || [],
    meta: {
      sql: sqlText,
      params,
      duration_ms: duration,
      rowCount: result.recordset ? result.recordset.length : 0,
      feature: meta.feature || 'QUERY',
      description: meta.description || '',
    },
  };
}

async function runProcedure(procedureName, params = {}, meta = {}) {
  const pool = await getPool();
  const request = pool.request();

  const paramEntries = Object.entries(params);
  for (const [key, val] of paramEntries) {
    request.input(key, val);
  }

  const paramStr = paramEntries
    .map(([k, v]) => `@${k} = ${typeof v === 'string' ? `'${v}'` : v}`)
    .join(', ');

  const start = Date.now();
  let result;

  try {
    result = await request.execute(procedureName);
  } catch (err) {
    const duration = Date.now() - start;
    return {
      data: [],
      recordsets: [],
      rowsAffected: [],
      error: err.message,
      meta: {
        sql: `EXEC ${procedureName} ${paramStr}`,
        params,
        duration_ms: Date.now() - start,
        rowCount: 0,
        feature: meta.feature || 'STORED PROCEDURE',
        description: meta.description || `Executing stored procedure ${procedureName}`,
        error: err.message,
      },
    };
  }

  const duration = Date.now() - start;
  return {
    data: result.recordset || [],
    recordsets: result.recordsets || [],
    rowsAffected: result.rowsAffected || [],
    meta: {
      sql: `EXEC ${procedureName} ${paramStr}`,
      params,
      duration_ms: duration,
      rowCount: result.recordset ? result.recordset.length : 0,
      totalSets: result.recordsets ? result.recordsets.length : 0,
      feature: meta.feature || 'STORED PROCEDURE',
      description: meta.description || `Executing stored procedure ${procedureName}`,
    },
  };
}

module.exports = { runQuery, runProcedure };
