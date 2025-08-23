import mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '12',
    connectionLimit: 5,
    database:'Dados'
});

export default pool