import pool from '../config/database.js'
    let conn

export async function insertTH (objCell){
    try {
        conn = await pool.getConnection()
        await conn.query(`INSERT INTO Tabela_Horarios (inicio, fim, perdido, categoria, t_liq) VALUES (${objCell.ini},${objCell.fim},${objCell.per},${objCell.cat},'${objCell.tliq}')`)
    } finally {
        if (conn) conn.release()
    }
}

export async function getAllRows() {
    try {
        conn = await pool.getConnection()
        let allRows = await conn.query(`SELECT * FROM Tabela_Horarios`)
        return allRows
    } finally {
        if (conn) conn.release()
    }
}
