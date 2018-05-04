DROP DATABASE IF EXISTS books_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(40) NOT NULL,
price INTEGER(11) NOT NULL,
stock INTEGER(11) NOT NULL, 
PRIMARY KEY (item_id)
);


INSERT INTO products(product_name,department_name,price,stock)
VALUES('Cannon 7D', 'electronics', 1500,3);

INSERT INTO products(product_name,department_name,price,stock)
VALUES('MacBook 15"', 'electronics', +1200, 6);

INSERT INTO products(product_name,department_name,price,stock)
VALUES('Beats Pill+ White', 'electronics', 129, 20);

INSERT INTO products(product_name,department_name,price,stock)
VALUES('DJI Mavic Air, Arctic White', 'electronics', 796, 2);

INSERT INTO products(product_name,department_name,price,stock)
VALUES('Oakley Kitchen Sink Backpack - 20"', 'sports & Outdoor', 150,8);

INSERT INTO products(product_name,department_name,price,stock)
VALUES('Grappling Hook', 'sports & Outdoor', 17, 24);

INSERT INTO products(product_name,department_name,price,stock)
VALUES('Camper Mens Andratx K100231 Sneaker', 'Clothing & Shoes', 140, 15);

INSERT INTO products(product_name,department_name,price,stock)
VALUES('Ray-Ban Sunglasses', 'Clothing & Shoes', 158, 9);

INSERT INTO products(product_name,department_name,price,stock)
VALUES('Columbia Mens ROC II Pant', 'Clothing & Shoes', 70, 12);

INSERT INTO products(product_name,department_name,price,stock)
VALUES('RVCA Mens Short Sleeve T-Shirt', 'Clothing & Shoes', 29, 34);
