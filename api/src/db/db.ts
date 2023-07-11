import mysql from 'mysql2/promise';
export let db: mysql.Connection;
export async function connectToMySQL(): Promise<void> {
     db = await mysql.createConnection({
      host: 'mysql', // MySQL service container name
      user: 'collective_db_user_dev',
      password: 'collective_db_password_dev',
      database: 'collective_db_dev',
    });
  
    try {
      await db.connect();
      console.log('Connected to MySQL database!');
    } catch (err) {
      console.error('Error connecting to MySQL database:', err);
    }
  }

  export async function initDb():Promise<void> {
    let query: string;
    query = `
        CREATE TABLE IF NOT EXISTS holders(
            id INT AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL, 
            PRIMARY KEY (id));`;
    await db.query(query);
    query = `
        CREATE TABLE IF NOT EXISTS shares(
            id INT AUTO_INCREMENT,
            holder_id INT NOT NULL,
            quantity INT DEFAULT 0, 
            PRIMARY KEY (id),
            UNIQUE KEY (holder_id),
            FOREIGN KEY (holder_id) REFERENCES holders(id));`;
    await db.query(query);
    query =`INSERT INTO holders (name) VALUES ("Israel");`
    await db.query(query);
    query = `INSERT INTO shares (holder_id, quantity) VALUES (1,100)`
    await db.query(query);
        
  }

