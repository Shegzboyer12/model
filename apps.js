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

  const insertProductSQL = `
    INSERT INTO PRODUCT (Product_id, Product_name, Price, Category)
    VALUES
      (1, 'Smartphone', 599.99, 'Electronics'),
      (2, 'Laptop', 1299.99, 'Electronics'),
      (3, 'Headphones', 99.99, 'Electronics')
  `;

  const insertCustomerSQL = `
    INSERT INTO CUSTOMER (Customer_id, First_name, Last_name, Email)
    VALUES
      (1, 'John', 'Doe', 'john.doe@example.com'),
      (2, 'Jane', 'Smith', 'jane.smith@example.com')
  `;

  const insertOrdersSQL = `
    INSERT INTO ORDERS (Order_id, Order_date, Customer_id)
    VALUES
      (1, '2023-06-15', 1),
      (2, '2023-06-16', 2),
      (3, '2023-06-17', 1)
  `;

  connection.query(insertProductSQL, (err, results, fields) => {
    if (err) {
      console.error('Error inserting into PRODUCT:', err.message);
    } else {
      console.log('Inserted into PRODUCT table');
    }
  });

  connection.query(insertCustomerSQL, (err, results, fields) => {
    if (err) {
      console.error('Error inserting into CUSTOMER:', err.message);
    } else {
      console.log('Inserted into CUSTOMER table');
    }
  });

  connection.query(insertOrdersSQL, (err, results, fields) => {
    if (err) {
      console.error('Error inserting into ORDERS:', err.message);
    } else {
      console.log('Inserted into ORDERS table');
    }
  });

  connection.end();
});
