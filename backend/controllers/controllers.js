import pool from '../config/database.js'

export async function insertTH (objCell){
    let conn = await pool.getConnection()
    
    await conn.query(`INSERT INTO Tabela_Horarios (inicio, fim, perdido, categoria, t_liq) VALUES (${objCell.ini},${objCell.fim},${objCell.per},${objCell.cat},'${objCell.tliq}')`)
    
   
    /*
    await conn.query(`INSERT INTO Tabela_Horarios (inicio, fim, perdido, categoria, t_liq) VALUES ('now()','now()','now()','-','now()');`)
    */
}
