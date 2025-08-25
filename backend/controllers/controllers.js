import pool from '../config/database.js'

export async function insertTH (objCell){
    let conn
    
    try {
    conn = await pool.getConnection()
    await conn.query(`INSERT INTO Tabela_Horarios (inicio, fim, perdido, categoria, t_liq) VALUES (${objCell.ini},${objCell.fim},${objCell.per},${objCell.cat},'${objCell.tliq}')`)
    } finally {
    if (conn) conn.release()
    }
    /*
    await conn.query(`INSERT INTO Tabela_Horarios (inicio, fim, perdido, categoria, t_liq) VALUES ('now()','now()','now()','-','now()');`)
    */
}
