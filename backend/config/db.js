import pkg from 'pg'
const { Client, Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  port: 5433,
  user: "thanhdaonguyen",
  max: 10,
  database: "postgres",
});

export default pool;
