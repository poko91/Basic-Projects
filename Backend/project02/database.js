import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}).promise()

export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users")
    return rows;
}

export async function getUser(user_Id) {
    const[rows] = await pool.query(
        `SELECT * FROM users WHERE user_Id = ?`,
        [user_Id]
    )
    return rows[0];
}

export async function createUser(email, password, studio_name, business_add) {
    const [result] = await pool.query(
        `INSERT INTO users (email, password, studio_name, business_add)
        VALUES(?,?,?,?)`,
        [email, password, studio_name, business_add]
    )
    const user_Id = result.insertId;
    return getUser(user_Id)
}



// const user = await createUser("test@example.com", "test", "Test Studio", "123 Main street");
// console.log(user);