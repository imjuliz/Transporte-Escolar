import mysql from 'mysql2/promise'; // npm install mysql2

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transporteEscolar',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function getConnection() {
    return pool.getConnection();
}

//Função para ler todos os registros
async function readAll(table, where = null) {
    const connection = await getConnection();
    try {
        let sql = `SELECT * FROM ${table}`;
        if (where) {
            sql += ` WHERE ${where}`
        }
        const [rows] = await connection.execute(sql);
        return rows;
    } catch (err) {
        console.error('Erro ao ler registros: ', err);
        throw err;
    } finally {
        connection.release();
    }
}

//Função para ler um registro específico
async function read(table, where) {
    const connection = await getConnection();
    try {
        let sql = `SELECT * FROM ${table}`;
        if (where) {
            sql += ` WHERE ${where}`;
        }
        const [rows] = await connection.execute(sql);
        return rows[0] || null; // garante que so vai receber um registro
    } catch (err) {
        console.error('Erro ao ler registros: ', err);
        throw err;
    } finally {
        connection.release();
    }
}

// funcao para executar qualquer consulta SQL 
async function readQuery(query, values = []) {
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute(query, values);
        return rows;
    } catch (err) {
        console.error('Erro ao executar query: ', err);
        throw err;
    } finally {
        connection.release();
    }
}

//Função para inserir dados
async function create(table, data) {
    const connection = await getConnection();
    try {
        const columns = Object.keys(data).join(', ');
        //(nome, email, endereco)

        const placeholders = Array(Object.keys(data).length).fill('?').join(', ');
        //VALUES (?, ?, ?)

        const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        //INSERT INTO clientes (nome, email, endereco) VALUES (?, ?, ?)

        const values = Object.values(data);

        const [result] = await connection.execute(sql, values);

        return result.insertId;
    } catch (err) {
        console.error('Erro ao inserir registros: ', err);
        throw err;
    } finally {
        connection.release();
    }}
    
    async function create2(table, data) {
        const connection = await getConnection();
        try {
            const columns = Object.keys(data).join(', ');
            //(nome, email, endereco)
    
            const placeholders = Array(Object.keys(data).length).fill('?').join(', ');
            //VALUES (?, ?, ?)
    
            const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}, curdate(), curtime())`;
            //INSERT INTO clientes (nome, email, endereco) VALUES (?, ?, ?)
    
            const values = Object.values(data);
    
            const [result] = await connection.execute(sql, values);
    
            return result.insertId;
        } catch (err) {
            console.error('Erro ao inserir registros: ', err);
            throw err;
        } finally {
            connection.release();
        }}
        
//Função para atualizar um registro
async function update(table, data, where) {
    const connection = await getConnection();
    try {
        const set = Object.keys(data)
            .map(column => `${column} = ?`)
            .join(', ');

        const sql = `UPDATE ${table} SET ${set} WHERE ${where}`;
        const values = Object.values(data);

        const [result] = await connection.execute(sql, [...values]);
        return result.affectedRows;
    } catch (err) {
        console.error('Erro ao atualizar registros: ', err);
        throw err;
    } finally {
        connection.release();
    }
}
// Função para excluir um registro
async function deleteRecord(table, where) {
    const connection = await getConnection();
    try {
        const sql = `DELETE FROM ${table} WHERE ${where}`;
        const [result] = await connection.execute(sql);
        return result.affectedRows;
    } catch (err) {
        console.error('Erro ao excluir registros: ', err);
        throw err;
    } finally {
        connection.release();
    }
}

export { create,create2, readAll, read, readQuery, update, deleteRecord }