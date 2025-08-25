import mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '12',
    connectionLimit: 5,
    database:'Dados'
});

export default pool
