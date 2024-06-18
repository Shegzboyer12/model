const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'your_username', 
  password: 'your_password', 
  database: 'your_database'  
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to database as ID:', connection.threadId);
  

  const createProductTable = `
    CREATE TABLE PRODUCT (
      Product_id INT PRIMARY KEY,
      Product_name VARCHAR(50) NOT NULL,
      Price DECIMAL(8,2) NOT NULL,
      Category VARCHAR(20)
    )
  `;

  const createCustomerTable = `
    CREATE TABLE CUSTOMER (
      Customer_id INT PRIMARY KEY,
      First_name VARCHAR(50) NOT NULL,
      Last_name VARCHAR(50) NOT NULL,
      Email VARCHAR(100)
    )
  `;

  const createOrdersTable = `
    CREATE TABLE ORDERS (
      Order_id INT PRIMARY KEY,
      Order_date DATE DEFAULT CURRENT_TIMESTAMP,
      Customer_id INT,
      FOREIGN KEY (Customer_id) REFERENCES CUSTOMER(Customer_id)
    )
  `;

  connection.query(createProductTable, (err, results, fields) => {
    if (err) {
      console.error('Error creating PRODUCT table:', err.message);
    } else {
      console.log('PRODUCT table created successfully');
    }
  });

  connection.query(createCustomerTable, (err, results, fields) => {
    if (err) {
      console.error('Error creating CUSTOMER table:', err.message);
    } else {
      console.log('CUSTOMER table created successfully');
    }
  });

  connection.query(createOrdersTable, (err, results, fields) => {
    if (err) {
      console.error('Error creating ORDERS table:', err.message);
    } else {
      console.log('ORDERS table created successfully');
      

      const addOrderDateColumn = `
        ALTER TABLE ORDERS
        ADD OrderDate DATE DEFAULT CURRENT_TIMESTAMP
      `;


      connection.query(addOrderDateColumn, (err, results, fields) => {
        if (err) {
          console.error('Error adding OrderDate column:', err.message);
        } else {
          console.log('OrderDate column added to ORDERS table');
        }

        connection.end();
      });
    }
  });
});
