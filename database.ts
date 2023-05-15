import mysql2 from 'mysql2';

const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.error('Failed to connect to the database:', error);
  } else {
    console.log('Connected to the database');
  }
});

export function getDatabaseConnection() {
  return connection;
}

export function closeDatabaseConnection() {
  connection.end();
}
