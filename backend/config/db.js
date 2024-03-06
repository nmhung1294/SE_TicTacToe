import pkg from "pg";
const { Client, Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DB_URI);

const pool = new Pool({
    connectionString: process.env.DB_URI,
    max: 5
});


export default pool;
